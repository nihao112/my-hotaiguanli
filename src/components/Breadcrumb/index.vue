<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { grTitle } from '@/utils/i18n.js'
// 获取当前路由
const route = useRoute()
const router = useRouter()
const breadcru = ref([])
console.log(router)
watch(route, () => {
  // 监听路由变化
  breadcru.value = route.matched.filter(item => {
    return item.meta && item.meta.title
  })
}, { immediate: true })

// 点击跳转
const onLineclick = (item) => {
  router.push({
    path: item.path
  })
}
</script>

<template>
  <div class="miabaoxie">
    <el-breadcrumb separator="/">
      <transition-group name="list">
        <el-breadcrumb-item v-for="(item,index) in breadcru"
                            :key="item.path">
          <!-- 如果是最后一项不可以点击 -->
          <span v-if="index===breadcru.length-1">{{grTitle(item.meta.title)}}</span>
          <!-- 不是最后一项可以点击 -->
          <a class="request"
             @click.prevent="onLineclick(item)"
             v-else>{{grTitle(item.meta.title)}}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<style lang='scss' scoped>
.miabaoxie {
  height: 50px;
  padding-top: 15px;
}
.request {
  color: rgb(116, 116, 117);
  font-size: 16px;
  font-weight: 900;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s linear;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
