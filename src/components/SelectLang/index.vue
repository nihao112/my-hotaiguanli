<script setup>
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore()
const i18n = useI18n()
const changeLanguage = (lang) => {
  // 修改vuex中的language
  store.commit('app/setLanguage', lang)
  // 设置给本地的i18n插件
  i18n.locale.value = lang // 更改I18n/index.js中的locale的变量值
  ElMessage.success(i18n.t('toast.switchLangSuccess'))
}
// 在模板中要是获取i18n.locale中的数据需要加上$i18n.locale
</script>

<template>
  <el-dropdown trigger="click"
               @command="changeLanguage">
    <div>
      <el-tooltip class="item"
                  effect="dark"
                  :content="$t('navBar.lang')"
                  placement="bottom">
        <svg-icon icon="language"
                  className="selectI18n" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh"
                          :disabled="store.getters.language==='zh'?true:false">中文</el-dropdown-item>
        <el-dropdown-item command="en"
                          :disabled="store.getters.language==='en'?true:false">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang='scss' scoped>
:deep(.selectI18n) {
  cursor: pointer;
  font-size: 35px;
  border-radius: 6px;
  transition: all 1.8s;
  &:hover {
    background-color: black;
  }
}
</style>
