<script setup>
import selectColor from './components/selectColor/index.vue'
import { ref } from 'vue'
const showDialogVariable = ref(false)
const showSelectColor = () => {
  showDialogVariable.value = true
}
const closeDialog = () => {
  showDialogVariable.value = false
}
</script>

<template>
  <div>
    <!--解决组件引入根组件问题 绑定根组件-->
    <el-dropdown v-bind="$attrs"
                 trigger="click"
                 @command="showSelectColor">
      <!-- 图标 -->
      <div>
        <el-tooltip class="item"
                    effect="dark"
                    :content="$t('theme.themeChange')"
                    placement="bottom">
          <svg-icon icon="change-theme"
                    className="themes"></svg-icon>
        </el-tooltip>
      </div>
      <!-- 下拉选项 -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{$t("theme.themeColorChange")}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 弹出框  -->
    <select-color :showDialogVariable="showDialogVariable"
                  @closeDialog="closeDialog" />
  </div>
</template>

<style lang='scss' scoped>
.themes {
  color: white;
  font-size: 34px;
  cursor: pointer;
}
</style>
