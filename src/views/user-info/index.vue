<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <!-- 打印 -->
      <el-button v-print="printObj"
                 type="primary">
        {{$t("userInfo.print")}}
      </el-button>
    </el-card>
    <!-- 用户详情 -->
    <el-card>
      <div id="user-print-box"
           class="user-info-box">
        <user-info :userData="userData" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'
import { userDetailById } from '@/api/user-manage.js'
import userInfo from '@/components/userInfo'
import { useI18n } from 'vue-i18n/index'
const i18n = useI18n()
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const userData = ref({})
const getUserDetail = async () => {
  const data = await userDetailById(props.id)
  userData.value = data
}
getUserDetail()
// 配置打印的参数
const printObj = {
  id: 'user-print-box', // 指定打印的区域
  popTitle: i18n.t('userInfo.title')// 标题
}
// 监听参数变化，重新调用接口
watch(() => {
  return props.id
}, () => {
  getUserDetail()
})
</script>

<style lang="scss" scoped>
.user-info-container {
  .print-box {
    text-align: right;
    margin-bottom: 20px;
  }
}
:deep(.user-info-box) {
  width: 1024px;
  margin: 0px auto;
}
</style>
