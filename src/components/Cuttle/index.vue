<template>
  <div class="svgBack"
       @click="DianJiQieHuan">
    <svg-icon :icon="zheicon"
              className="svgicons"></svg-icon>
  </div>

</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
console.log(store.getters.zheDieTuBiao)
const zheicon = computed(() => {
  return store.getters.zheDieTuBiao ? 'hamburger-opened' : 'hamburger-closed'
})
const DianJiQieHuan = () => {
  store.commit('app/ZheDie')
}
</script>

<style lang='scss' scoped>
.svgBack {
  width: 55px;
  height: 55px;
  text-align: center;
  line-height: 70px;
  transition: background 0.6s;
  cursor: pointer;
  &:hover {
    background-color: rgb(222, 224, 224);
  }
}
:deep(.svgicons) {
  width: 1.8em !important;
  height: 1.8em !important;
}
</style>
