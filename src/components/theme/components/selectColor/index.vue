<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { predefineColors } from '@/commom/commom.js'
import { useStore } from 'vuex'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme.js'
defineProps({
  showDialogVariable: {
    type: Boolean,
    required: true
  }
})
const store = useStore()
// 取色器选中颜色 取色器选中的颜色 刷线不能掉其他地方需要使用主题色vuex localstorage
const color = ref(store.getters.Theme_color)
const emits = defineEmits(['closeDialog'])
// 触发一个自定义事件closeDialog关闭模态框
const handleClose = () => {
  emits('closeDialog')
}
// 确定按钮
const confirm = async () => {
  // 1.保存主题色
  store.commit('theme/setMycolor', color.value)
  // 2.替换element和 本地样式 让主题色生效
  /*
    <1.获取所有的elemend的样式注意不同版本的样式不一样
    <2.将样式中的情景颜色替换成
    color最为基本色来生成一些列和他相近的情景色
    <3.将替换完的样式插入到header中,利用css的优先级让插入的样式生效
  */
  // <2-1.生成的最终生成的颜色
  const newStyle = await generateNewStyle(color.value)
  // <2-2.将替换完的样式插入到header中,利用css的优先级让插入的样式生效
  writeStyleToHearTag(newStyle)

  // 3. 关闭dialog
  emits('closeDialog')
}
</script>

<template>
  <el-dialog :model-value="showDialogVariable"
             :title="$t('theme.themeChange')"
             width="30%"
             @close="handleClose">
    <!-- 取色器 -->
    <div class="content">
      <p class="title">{{$t("theme.themeChange")}}</p>
      <el-color-picker v-model="color"
                       :predefine="predefineColors" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{$t("universal.cancel")}}</el-button>
        <el-button type="primary"
                   @click="confirm">{{$t("universal.confirm")}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang='scss' scoped>
.content {
  text-align: center;
  .title {
    padding: 13px;
    font-size: 19px;
  }
}
</style>
