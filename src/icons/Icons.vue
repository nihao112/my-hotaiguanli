<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    require: true
  },
  className: {
    type: String
  }
})
const classIcon = computed(() => {
  if (props.className) {
    return 'class-Icon ' + props.className
  } else {
    return 'class-Icon'
  }
})
const iconName = computed(() => {
  return `#icon-${props.icon}`
})

</script>
<template>
  <svg :class="classIcon"
       aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<style lang="scss" scoped>
.class-Icon {
  width: 1em;
  height: 1em;
  display: inline-block;
  overflow: hidden;
  fill: currentColor;
  // border: 1px solid red;
}
</style>
