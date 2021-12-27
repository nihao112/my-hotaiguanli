<template>
  <div>
    <theme-table :cb="cbs">
      <template #default="{ headerStyle }">
        <el-table :data="tableDate"
                  border
                  style="width: 100%"
                  ref="table"
                  row-key="id"
                  :header-cell-style="headerStyle">
          <!-- 展开行显示角色下面的权限 -->
          <el-table-column type="expand"
                           label=" > "
                           v-showPermission="'distributePermission'">
            <template #default="{ row }">
              <div class="role-tag">
                <el-tag v-for="item in getAllpermissions_"
                        :key="item.id"
                        :class="isActive(item, row)"
                        @click="noClick(item, row)"
                        size="mini">{{ item.title }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('role.index')"
                           type="index"
                           width="200"></el-table-column>
          <el-table-column :show-overflow-tooltip="true"
                           prop="title"
                           :label="$t('role.name')"
                           width="200"></el-table-column>
          <el-table-column :show-overflow-tooltip="true"
                           prop="describe"
                           :label="$t('role.desc')"></el-table-column>
          <el-table-column :label="$t('role.action')"
                           v-showPermission="'distributePermission'">
            <template #default="{ row }">
              <el-badge v-if="row.permissions && row.permissions.length >= 0"
                        :value="row.permissions.length"
                        class="item"
                        type="primary">
                <el-button type="primary"
                           size="mini"
                           @click="showeditpermission(row)">{{ $t('role.assignPermissions') }}</el-button>
              </el-badge>
            </template>
          </el-table-column>

        </el-table>
      </template>
    </theme-table>
    <!-- 权限模态框 -->
    <edit-pemissicn v-if="isShowDialog"
                    :selectRoleId="selectRoleId"
                    :isShowDialog="isShowDialog"
                    @close="isShowDialog = false"
                    @confir="confir"
                    :ElMess="ElMess" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import EditPemissicn from './components/EditPemissicn.vue'
import ThemeTable from '@/components/ThemeTable'
import { getPermissionByRoleId, updatePermissionByRoleId } from '@/api/role.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n/index'
// 初始化列表
const tableDate = ref([])
const store = useStore()
const getAllRoles = () => {
  // 获取所有的角色
  store.dispatch('roleAndPermission/initRoles')
  // 获取所有的权限列表
  store.dispatch('roleAndPermission/initpermissions')
}
getAllRoles()

const isShowDialog = ref(false)
const selectRoleId = ref('')
const selectRow = ref({})
const showeditpermission = (row) => {
  isShowDialog.value = true
  selectRoleId.value = row.id
  selectRow.value = row
}
// 获取所有的列表权限数据
const getAllpermissions_ = ref([])
// 监听语言变化改变tab中英文
watch(
  () => store.state.roleAndPermission.permissions_,
  () => {
    getAllpermissions_.value = store.state.roleAndPermission.permissions_
  },
  { immediate: true }
)

// 监听数据变化改变中英文切换
watch(
  () => store.getters.roles,
  () => {
    tableDate.value = store.getters.roles
  },
  { immediate: true }
)
// 修改权限
// 定义该权限是否选中
const index = (item, row) => {
  return row.permissions.findIndex((per) => item.id === per.id)
}

// 语言切换
const cbs = [
  () => {
    store.dispatch('roleAndPermission/clearRoleAndPermission')
  },
  getAllRoles

]
const isActive = (item, row) => {
  if (index(item, row) >= 0) {
    return 'no-active'
  } else {
    return 'yes-active'
  }
}
const i18n = useI18n()
// 点击tab选中或未选中
const noClick = async (item, row) => {
  let res
  res = await getPermissionByRoleId(row.id)
  if (index(item, row) >= 0) {
    res.splice(index(item, row), 1)
  } else {
    res.push(item.id)
    res = Array.from(new Set(res))
  }
  await updatePermissionByRoleId({ roleId: row.id, permissions: res })
  store.commit('roleAndPermission/updatePermissonToRole', {
    roleId: row.id,
    permissionArray: res
  })
  ElMess()
}
const ElMess = () => {
  ElMessage.success(i18n.t('role.updateRoleSuccess'))
}

// 改变tag有权限标签颜色
const activeBack = computed(() => {
  return store.getters.cssVar['light-1']
})
// 关闭弹框让下拉不折叠
const table = ref(null)
const confir = () => {
  table.value.toggleRowExpansion(selectRow.value, true)
}
</script>

<style lang="scss" scoped>
.role-tag {
  text-align: center;
  width: 100%;
  span {
    margin-left: 10px;
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
:deep(.el-tag--mini) {
  line-height: 16px;
}
.no-active {
  background-color: v-bind(activeBack);
  color: #fff;
  &::after {
    content: '√';
    font-size: 17px;
    font-weight: 900;
    margin: 10px 3px 10px 9px;
  }
}
.yes-active {
  &::after {
    content: 'x';
    font-size: 17px;
    font-weight: 400;
    margin: 10px 3px 10px 9px;
  }
}
</style>
