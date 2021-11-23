
<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    require: true
  },
  icon: {
    type: String,
    require: true
  },
  children: {
    type: Boolean
  }
})
</script>
<template>
  <!-- el-icon -->
  <i class="el-icon-user"
     v-if="icon.includes('el-icon')"></i>
  <!-- svg组件 -->
  <svg-icon :icon="icon"
            className="iconst"
            v-else />
  <span v-if="children">{{title}}</span>
</template>
<style lang="scss" scoped>
.iconst {
  width: 1.4em !important;
  height: 1.4em !important;
  // color: white;
  padding: 0px 17px 0px 1px !important;
}
</style>
