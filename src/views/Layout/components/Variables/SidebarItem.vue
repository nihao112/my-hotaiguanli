<script setup>
import MenuItem from './MenuItem.vue'
import { defineProps } from 'vue'
const props = defineProps({
  route: {
    type: Object,
    required: true
  }
})
console.log(props.route, '!23')

</script>
<template>
  <!-- 有二级路由 -->
  <el-submenu :index="route.path"
              v-if="route.children.length>0">
    <template #title>
      <menu-item :title="route.meta.title"
                 :icon="route.meta.icon"
                 :children="true" />
    </template>
    <!-- 循环子菜单 -->
    <sidebar-item v-for="item in route.children"
                  :key="item.path"
                  :route="item">
    </sidebar-item>
  </el-submenu>
  <!-- 只有一级菜单 -->
  <el-menu-item v-else
                :index="route.path">
    <menu-item :title="route.meta.title"
               :icon="route.meta.icon"
               :children="false" />
    <template #title>{{route.meta.title}}</template>
  </el-menu-item>

</template>
<style lang="scss" scope>
</style>
