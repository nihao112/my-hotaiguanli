<script setup>
import { ref, watch, onActivated, onMounted } from 'vue'
import { getAllarticle, removeArticle } from '@/api/article'
import { watchLang } from '@/utils/i18n.js'
import ThemeTable from '@/components/ThemeTable'
import { useI18n } from 'vue-i18n/index'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useStore } from 'vuex'
// 动态展示
import { selectDynameicLabel, dynamicData, tableLabels } from './hooks/dynamic'
// 拖拽
import { tableRef, initSortable } from './hooks/sortoble'
onMounted(() => {
  initSortable(tableData, getAllarticle_)
})

const i18n = useI18n()
// 分页
const page = ref(1)
const size = ref(5)
const total = ref(0)
// 改变当前页
const pageChange = (page_) => {
  page.value = page_
  getAllarticle_()
}
// 改变页大小
const sizeChange = (size_) => {
  size.value = size_
  getAllarticle_()
}
// 文章列表全部数据
const tableData = ref([])
const getAllarticle_ = async () => {
  const data = await getAllarticle({ page: page.value, size: size.value })
  tableData.value = data.list
  total.value = data.total
}
getAllarticle_()
// 文章查看事件
const router = useRouter()
const showArticle = async (row) => {
  router.push({ path: `/article/${row._id}` })
}
// 文章删除事件
const removeArticle_ = async (row) => {
  ElMessageBox.confirm(
    `${i18n.t('article.dialogTitle1')}： ${row.title} ${i18n.t('article.dialogTitle2')}`,
    i18n.t('excel.remove'),
    {
      confirmButtonText: i18n.t('excel.remove'),
      cancelButtonText: i18n.t('excel.close'),
      type: 'warning'
    }
  )
    .then(async () => {
      await removeArticle(row._id)
      ElMessage({
        type: 'success',
        message: i18n.t('article.removeSuccess')
      })

      getAllarticle_()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.t('excel.closeremove')
      })
    })
}
const load = ref()
const store = useStore()
watch(() => {
  return store.getters.load
}, () => {
  load.value = store.getters.load
})
// 解决keep-ailve缓存问题
onActivated(getAllarticle_)
// 语言切换
watchLang(getAllarticle_)

</script>
<template>
  <div>
    <el-card class="card">
      <div class="dynamic-box">
        <span class="title">{{$t("article.dynamicTitle")}}</span>
        <el-checkbox-group v-model="selectDynameicLabel"
                           :min="2">
          <el-checkbox v-for="(item,index) in dynamicData"
                       border
                       :key="index"
                       :label="item.label" />
        </el-checkbox-group>
      </div>

    </el-card>
    <theme-table :cb="[]">
      <template #default="{ headerStyle }">
        <el-table :header-cell-style="headerStyle"
                  :data="tableData"
                  border
                  v-loading="load"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :element-loading-text="i18n.t('excel.load')"
                  style="width: 100%"
                  ref="tableRef">
          <el-table-column v-for="(item,index) in tableLabels"
                           :key="index"
                           :prop="item.prop"
                           :show-overflow-tooltip="true"
                           :label="item.label"
                           align="center">
            <template #default="{row}"
                      v-if="item.prop==='publicDate'">
              {{$filters.relativeTime(row.publicDate)}}
            </template>
            <template #default="{row}"
                      v-else-if="item.prop==='action'">
              <el-button size="mini"
                         type="success"
                         @click="showArticle(row)">{{$t("article.show")}}</el-button>
              <el-button size="mini"
                         type="primary"
                         @click="removeArticle_(row)">{{$t("article.remove")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination"
                       @size-change="sizeChange"
                       @current-change="pageChange"
                       :currentpath="page"
                       :page-size="size"
                       :page-sizes="[5,10,20,50]"
                       layout="total,sizes,prev,pager,jumper,next"
                       :total="total">
        </el-pagination>
      </template>
    </theme-table>
  </div>
</template>

<style lang="scss" scoped>
:deep(.card) {
  margin-bottom: 15px;
  .dynamic-box {
    display: flex;
    align-items: center;
    white-space: nowrap;
    .title {
      font-size: 18px;
      margin-right: 30px;
      font-weight: 700;
    }
  }
}
.pagination {
  text-align: center;
  margin-top: 13px;
}
:deep(.el-table__body .el-table__cell) {
  padding: 24.2px 0px;
}
:deep(.el-table__body tr:hover > td) {
  cursor: move;
}
// :deep(.el-table__body-wrapper) {
// overflow: hidden;
// min-height: 58vh;
// overflow-y: scroll;
// &::-webkit-scrollbar {
//   width: 8px;
// }

// &::-webkit-scrollbar-thumb {
//   border-radius: 40px;
//   background: v-bind(screenBackground);
// }

// &::-webkit-scrollbar-track {
//   border-radius: 0;
//   background-color: rgba(0, 0, 0, 0.1);
// }
// }
</style>
