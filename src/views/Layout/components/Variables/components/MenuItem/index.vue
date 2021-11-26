
<script setup>
import { defineProps } from 'vue'
import { grTitle } from '@/utils/i18n.js'
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
  <span v-if="children">{{grTitle(title)}}</span>
</template>
<style lang="scss" scoped>
.iconst {
  width: 1.4em !important;
  height: 1.4em !important;
  padding: 0px 18px 0px 0px;
}
</style>
