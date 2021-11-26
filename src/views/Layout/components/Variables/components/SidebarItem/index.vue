<script setup>
import MenuItem from '../MenuItem'
import { defineProps } from 'vue'
import SidebarItem from './index'
import { grTitle } from '@/utils/i18n.js'

defineProps({
  route: {
    type: Object,
    required: true
  }
})

</script>
<template>
  <!-- 有二级路由 -->
  <el-sub-menu :index="route.path"
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
  </el-sub-menu>
  <!-- 只有一级菜单 -->
  <el-menu-item v-else
                :index="route.path">
    <menu-item :title="route.meta.title"
               :icon="route.meta.icon"
               :children="false" />
    <template #title>{{grTitle(route.meta.title)}}</template>
  </el-menu-item>
</template>
<style lang="scss" scope>
</style>
