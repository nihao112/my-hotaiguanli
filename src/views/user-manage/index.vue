
<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import dateFilter from '@/filters/datefilters.js'
import { watchLang } from '@/utils/i18n.js'
import { USER_RELATION } from '@/commom/commom.js'
import ExportExcel from '@/components/ExportExcel'
import RoleAssignment from '@/components/RoleAssignment'
import ThemeTable from '@/components/ThemeTable'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getUser, deleteUser, getAllUser } from '@/api/user-manage.js'
import { useStore } from 'vuex'
const i18n = useI18n()
const tableData = ref([])
const router = useRouter()
const dialogShow = ref(false)
const exportType = ref(1)
const exportDate = ref([])
const filename = ref(i18n.t('excel.defaultName'))
const loading = ref(true)
const store = useStore()
// 分页
const size = ref(5)
const page = ref(1)
const total = ref(0)
// 点击excel导入
const onImportExcel = () => {
  router.push({ path: '/user/import' })
}
// 点击excel导出
const exportExcel = () => {
  dialogShow.value = true
  changeExportType(1)
}
// 监听关闭模态框
const clone = () => {
  dialogShow.value = false
  exportType.value = 1
}

// 改变页大小
const sizeChange = (currentSize) => {
  size.value = currentSize
  getMangeUser()
}

// 改变当前页码
const currentChange = (currentPage) => {
  page.value = currentPage
  getMangeUser()
}
// 删除
const Updelete = (row) => {
  ElMessageBox.confirm(
    `${i18n.t('excel.dialogTitle1')}： ${row.username} ${i18n.t('excel.dialogTitle2')}`,
    i18n.t('excel.remove'),
    {
      confirmButtonText: i18n.t('excel.remove'),
      cancelButtonText: i18n.t('excel.close'),
      type: 'warning'
    }
  )
    .then(async () => {
      await deleteUser(row._id)
      // await router.go(0)
      ElMessage({
        type: 'success',
        message: i18n.t('excel.removeSuccess')
      })
      getMangeUser()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.t('excel.closeremove')
      })
    })
}
// 跳转详情
const showUserDetail = (row) => {
  router.push({ path: '/user/info/' + row._id })
}
// 获取初始化用户信息
const getMangeUser = async () => {
  const data = await getUser({
    page: page.value,
    size: size.value
  })
  setTimeout(() => {
    loading.value = false
  }, 800)
  tableData.value = exportDate.value = data.list
  total.value = data.total
}
getMangeUser()
watch(() => {
  return page.value
}, () => {
  setTimeout(() => {
    loading.value = true
  }, 100)
})
// 用户导出下载
const changeExportType = async (val) => {
  if (val === 1) {
    //  下载当前页
    filename.value = `${i18n.t('excel.defaultName')}(${page.value})`
  } else {
    filename.value = i18n.t('excel.defaultName')
    // 如果等于2下载全部数据
    const { list } = await getAllUser()
    exportDate.value = list
  }
}
// 监听语言变化
watchLang((lang) => {
  filename.value = i18n.t('excel.defaultName')
}, () => {
  getMangeUser()
})

// 按照需求转化数据格式
const dataFormate = (data) => {
  return data.map((item) => {
    return Object.keys(USER_RELATION).map(key => {
      //  处理用户角色
      if (USER_RELATION[key] === 'role') {
        const roles = item[USER_RELATION[key]]
        if (roles.length > 0) {
          return JSON.stringify(roles.map(role => role.title))
        } else {
          return '[]'
        }
      } else if (USER_RELATION[key] === 'openTime') {
        // 处理时间
        return dateFilter(item[USER_RELATION[key]])
      } else {
        return item[USER_RELATION[key]]
      }
    })
  })
}
// 员工分配角色事件
const isShowDialog = ref(false)
const rowId = ref([])
const UpAllUser = (row) => {
  rowId.value = row._id
  isShowDialog.value = true
}
// 设置滚动条颜色
const screenBackground = computed(() => {
  return store.getters.cssVar['light-1']
})
</script>
<template>
  <div class="user-manage">
    <el-card class="box-card box-carde">
      <!-- excel按钮 -->
      <el-button type="primary"
                 @click="onImportExcel"
                 v-showPermission="'importUser'">{{$t("excel.importExcel")}}</el-button>
      <el-button type="success"
                 @click="exportExcel">{{$t("excel.exportExcel")}}</el-button>
    </el-card>
    <!-- table表格 -->
    <theme-table :cb="[]">
      <template #default="{ headerStyle }">
        <el-table :header-cell-style="headerStyle"
                  :data="tableData"
                  border
                  v-loading="loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  :element-loading-text="i18n.t('excel.load')"
                  style="width: 100%">
          <el-table-column align="center"
                           label="#"
                           type="index">
          </el-table-column>
          <el-table-column align="center"
                           prop="username"
                           :label="i18n.t('excel.name')">
          </el-table-column>
          <el-table-column align="center"
                           prop="mobile"
                           :label="i18n.t('excel.mobile')">
          </el-table-column>
          <el-table-column :label="i18n.t('excel.avatar')"
                           align="center">
            <template v-slot="{row}">
              <el-image :src="row.avatar"
                        class="acatar"
                        :preview-src-list="[row.avatar]"></el-image>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           :label="i18n.t('excel.role')">
            <template #default="{row}">
              <div v-if="row.role && row.role.length>0">
                <el-tag v-for="tag in row.role"
                        :key="tag.id"
                        size="mini">{{tag.title}}</el-tag>
              </div>
              <div v-else>
                <el-tag size="mini">{{$t('excel.defaultRole')}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="openTime"
                           :label="i18n.t('excel.openTime')">
            <template #default="{row}">
              {{$filters.dateFilter(row.openTime)}}
            </template>
          </el-table-column>
          <el-table-column align="center"
                           width="300px"
                           :label="i18n.t('excel.action')">
            <template #default="{row}">
              <el-button @click="showUserDetail(row)"
                         type="success"
                         size="mini">{{$t("excel.show")}}</el-button>
              <el-button v-showPermission="'distributeRole'"
                         @click="UpAllUser(row)"
                         type="warning"
                         size="mini">{{$t("excel.showRole")}}</el-button>
              <el-button v-showPermission="'removeUser'"
                         @click="Updelete(row)"
                         type="primary"
                         size="mini">{{$t("excel.remove")}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination class="pagination"
                       @size-change="sizeChange"
                       @current-change="currentChange"
                       :currentpath="page"
                       :page-sizes="[5,10,20,50]"
                       :page-size="size"
                       layout="total,sizes,prev,pager,jumper,next"
                       :total="total">
        </el-pagination>
      </template>
    </theme-table>
    <!-- excel导出模态显示 -->
    <Export-excel :dialogShow="dialogShow"
                  :data="dataFormate(exportDate)"
                  :header="Object.keys(USER_RELATION)"
                  :filename="filename"
                  :message="$t('excel.message')"
                  :errs="$t('excel.errs')"
                  @cloneDialog="clone">
      <el-select @change="changeExportType"
                 v-model="exportType"
                 placeholder="Select"
                 style="margin-top:20px;width:100%;">
        <el-option :key="1"
                   :label="$t('excel.DangQian')"
                   :value="1">
        </el-option>
        <el-option :key="2"
                   :label="$t('excel.clears')"
                   :value="2">
        </el-option>
      </el-select>
    </Export-excel>
    <!-- 员工分配模态框 -->
    <RoleAssignment v-if="isShowDialog"
                    @close="isShowDialog=false"
                    @update="getMangeUser"
                    :isShowDialog="isShowDialog"
                    :rowId="rowId" />
  </div>
</template>
<style lang="scss" scoped>
.box-carde {
  text-align: right;
  margin-bottom: 15px;
}
.pagination {
  text-align: center;
}
.acatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
:deep(.el-table th.el-table__cell > .cell) {
  font-weight: 900;
  font-size: 18px;
}
:deep(.el-table__body-wrapper) {
  overflow: hidden;
  height: 53.5vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 40px;
    background: v-bind(screenBackground);
  }

  &::-webkit-scrollbar-track {
    border-radius: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
