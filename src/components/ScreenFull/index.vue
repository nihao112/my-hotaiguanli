<script setup>
import { ref } from 'vue'
import screenfull from 'screenfull'
const isScreenFull = ref(false)
const ToggleScreenFull = () => {
  isScreenFull.value = !isScreenFull.value
  // 使用screenfull插件完成全屏切换
  screenfull.toggle()
}
</script>

<template>
  <div class="right-menu_1">
    <el-tooltip class="tooltip"
                effect="dark"
                :content="$t('navBar.ScreenFull')"
                placement="bottom">
      <svg-icon className="fullscreen"
                :icon="isScreenFull?'exit-fullscreen':'fullscreen'"
                @click="ToggleScreenFull"></svg-icon>
    </el-tooltip>
  </div>

</template>

<style lang='scss' scoped>
.fullscreen {
  cursor: pointer;
  font-size: 32px;
  color: rgb(59, 60, 61);
}
</style>
