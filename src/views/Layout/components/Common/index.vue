<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isNoTags } from '@/utils/tag.js'
import { getTitle, watchLang } from '@/utils/i18n.js'
// 监听当前路由变化 增加tag到指定位置
const route = useRoute()
const store = useStore()
// 获取title
const getTitles = (to) => {
  if (!to.meta || !to.meta.title) {
    // 不存在title
    const tmp = to.path.splite('/')
    return tmp[tmp.length - 1]
  } else {
    // 如果存在title 以path作为最后一项为title
    return getTitle(to.meta.title)
  }
}
watch(route, (to, from) => {
  if (isNoTags(to.path)) return true
  //  合法的增加一个tag到vuex
  const { path, fullPath, meta, name, params, query } = to
  store.commit('app/daohang', {
    path,
    fullPath,
    meta,
    name,
    params,
    query,
    title: getTitles(to)
  })
}, { immediate: true })
// 国际化切换
watchLang(() => {
  // 重新更新vuex中的title的值
  const temArr = []
  store.getters.daohang.forEach((route, index) => {
    temArr.push({ ...route, title: getTitles(route) })
  })
  store.commit('app/changeTitle', temArr)
})

</script>
<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="move"
                  mode="out-in">
        <keep-alive :include="tagsList">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  overflow-y: scroll;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.5s ease-out;
}

.move-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.move-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
