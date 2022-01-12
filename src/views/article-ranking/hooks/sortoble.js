// 拖拽
import SorTable from 'sortablejs'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n/index.js'
import { updateArticleRanking } from '@/api/article.js'
// 获取dom
export const tableRef = ref(null)
// 初始化插件
export const initSortable = (tableData, cb) => {
  // 拖拽行为触发的dom区域
  const els = tableRef.value.$el.querySelectorAll(
    '.el-table__body-wrapper > table > tbody'
  )
  SorTable.create(els[0], {
    ghostClass: 'ghost',
    animation: 1000,
    async onEnd(event) {
      // 拖拽结束后触发,然后发送请求
      const { oldIndex, newIndex } = event
      const initRanking = tableData.value[oldIndex].ranking
      const finalRanking = tableData.value[newIndex].ranking
      await updateArticleRanking({
        initRanking,
        finalRanking
      })
      ElMessage.success(i18n.global.t('article.sortSuccess'))
      // 拖住完需要重新请求接口
      tableData.value = []
      cb && cb()
    }
  })
}
