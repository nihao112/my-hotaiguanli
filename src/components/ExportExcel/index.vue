<script setup>
import { defineProps, defineEmits } from 'vue'
import { exportJsonToExcel } from '@/utils/Export2Excel.js'
import { ElMessage } from 'element-plus'
const props = defineProps({
  dialogShow: {
    type: Boolean,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  header: {
    type: Array,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: '$t("excel.message")'
  },
  errs: {
    type: String,
    default: '$t("excel.errs")'
  }
})
const emits = defineEmits(['cloneDialog'])
const clone = () => {
  emits('cloneDialog')
}

// 导出方法
const exportexcel = () => {
  //  1.导出的文件名，不选的话应该有默认值
  //  2.导出全部数据或着导出当前页数文件
  // 3.利用工具将服务器返回的用户数据转化成excel数据--》行程excel文件
  // 4.解析excel文件并且下载该文件
  exportJsonToExcel({
    header: props.header,
    data: props.data,
    filename: props.filename.value,
    merges: true,
    autoWidth: true,
    bookType: 'xlsx'
  }).then(res => {
    // 6.提示消息
    ElMessage.success(props.message)
  }).catch(err => {
    console.log(err)
    ElMessage.error(props.message)
  })
  // 5.关闭dialog
  clone()
}

</script>

<template>
  <div>
    <el-dialog :title="$t('excel.title')"
               :model-value="dialogShow"
               @close="clone"
               width="30%">
      <el-input :model-value="filename"
                :placeholder="$t('excel.placeholder')"></el-input>
      <!-- 选择下载页码 -->
      <slot></slot>
      <template #footer>
        <el-button @click="clone">{{$t("excel.close")}}</el-button>
        <el-button type="primary"
                   @click="exportexcel">{{$t("excel.confirm")}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang='scss' scoped>
</style>
