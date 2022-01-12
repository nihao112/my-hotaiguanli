<script setup>
import { computed, ref, defineProps } from 'vue'
import { useStore } from 'vuex'
import { watchLang } from '@/utils/i18n.js'
const store = useStore()

const backgr = computed(() => {
  return store.getters.cssVar.menuBg
})
const colo = computed(() => {
  return store.getters.cssVar.menuActiveText
})
// 表头样式
const headerStyle = ref({
  background: backgr,
  color: colo,
  fontWeight: 900
})

// 修改二级菜单背景
// const childrenBgColor = computed(() => {
//   return store.getters.cssVar['light-7']
// })
// 修改hover状态下的背景
const childrenBgColorhHover = computed(() => {
  return store.getters.cssVar['light-1']
})
const props = defineProps({
  cb: {
    type: Array,
    validator: (cb) => {
      // cb必须是一个数组
      if (Array.isArray(cb)) {
        // 数组中的每一个单元必须是一个函数
        return cb.every((item) => typeof item === 'function')
      } else {
        throw new Error('中英切换错误')
        // return false
      }
    }
  }
})
// 语言切换重新调用表格数据初始化
// 数据请求中英文
//  如果语言切换，重新调用接口
watchLang(...props.cb)

// 表格拖住改变颜色
const sortoble = computed(() => {
  return store.getters.cssVar['light-4']
})
</script>

<template>
  <div>
    <el-card>
      <slot :headerStyle="headerStyle"></slot>
    </el-card>
  </div>
</template>

<style lang='scss' scoped>
:deep(.el-table__row--level-1 td) {
  cursor: pointer;
}
:deep(.el-table__body tr) {
  color: black !important;
}
:deep(.el-table__body tr:hover > td) {
  background-color: v-bind(childrenBgColorhHover) !important;
  cursor: pointer;
  color: white;
}
:deep(.el-table tr) {
  background-color: v-bind(childrenBgColor);
  cursor: pointer;
  color: white;
}
:deep(.ghost) {
  background-color: v-bind(sortoble) !important;
  color: white !important;
}
</style>
