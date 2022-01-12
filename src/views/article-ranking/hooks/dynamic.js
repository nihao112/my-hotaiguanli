import { ref, watch } from 'vue'
import { watchLang } from '@/utils/i18n.js'
// 所有的列数据
import getdynamicData from './dynamicData'
// 把所有的列数据暴露
export const dynamicData = ref(getdynamicData())
// 默认勾选所有的列
export const selectDynameicLabel = ref([])
// 初始化checkbox-group
const initSelectDynameicLabel = () => {
  selectDynameicLabel.value = dynamicData.value.map(item => item.label)
}
initSelectDynameicLabel()
// 监听切换语言变化
watchLang(() => {
  dynamicData.value = getdynamicData()
  initSelectDynameicLabel()
})
// 表格的列数据
export const tableLabels = ref([])
// 监听选择的列
watch(selectDynameicLabel, (val, old) => {
  // 执行表格的列数据渲染
  tableLabels.value = dynamicData.value.filter(item => val.includes(item.label))
}, { immediate: true })
