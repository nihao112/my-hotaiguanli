<template>
  <div>
    <uploadExcel :beforeUpload="beforeUpload"
                 :onSuccess="uploadExcelSuccess" />
  </div>
</template>

<script setup>
import uploadExcel from '@/components/uploadExcel/index.vue'
import { addUserByExcel } from '@/api/user-manage.js'
import { USER_RELATION } from '@/commom/commom.js'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils/xlsx.js'
import { useI18n } from 'vue-i18n'
const I18n = useI18n()
const route = useRouter()
const uploadExcelSuccess = async ({ headers, bodys }) => {
  // console.log(headers, '表头')
  // console.log(bodys, '表体')
  const data = generateExcelData(bodys)
  // excel表格插入
  await addUserByExcel(data)
  ElMessage.success(`${bodys.length}：${I18n.t('uploadExcel.upShuJu')}`)

  route.push({ path: '/user/manage' })
}
const beforeUpload = () => {
  return { type: 'excel', doUpload: true }
}
// 格式化excel
const generateExcelData = (arr) => {
  const arr_ = []
  arr.forEach((item) => {
    const obj = {}
    Object.keys(USER_RELATION).forEach((key) => {
      if (USER_RELATION[key] === 'openTime') {
        obj[USER_RELATION[key]] = formatDate(item[key])
      } else {
        obj[USER_RELATION[key]] = item[key]
      }
    })
    arr_.push(obj)
  })
  return arr_
}

</script>

<style lang="scss" scoped></style>
