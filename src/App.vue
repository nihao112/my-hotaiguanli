<template>
  <el-config-provider :locale="store.getters.language==='zh'?zhCn:en">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useStore } from 'vuex'
import { generateNewStyle, writeStyleToHearTag } from '@/utils/theme.js'
const store = useStore()
generateNewStyle(store.getters.Theme_color).then(res => {
  writeStyleToHearTag(res)
})
</script>

<style lang="scss">
</style>
