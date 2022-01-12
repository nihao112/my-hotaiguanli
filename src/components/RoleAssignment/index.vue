<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { updateRole, UserManage } from '@/api/user-manage.js'
import { getAllRole } from '@/api/role.js'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  // 接收dialog状态
  isShowDialog: {
    type: Boolean,
    required: true
  },
  rowId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['close', 'update'])
// 点击取消关闭
const close = () => {
  emits('close')
}
// 获取全部角色列表
const store = useStore()
const AllRoles = ref(store.state.roleAndPermission.roles)
const AllRole = async () => {
  AllRoles.value = await getAllRole()
}
if (Array.isArray(AllRoles.value) && AllRoles.value.length <= 0) {
  // 如果本地存储不存在角色，就从接口中获取
  AllRole()
}
// 获取当前用户匹配指定的角色
const checkboxGroup = ref([])
const getPermissionByRoleId_ = async () => {
  const res = await UserManage(props.rowId)
  checkboxGroup.value = res.role.map((item) => item.title)
}
getPermissionByRoleId_()
// 为员工分配角色
const i18n = useI18n()
const updateRole_ = async () => {
  const roles = checkboxGroup.value.map(title => AllRoles.value.find(ite => ite.title === title))
  const data = {
    userId: props.rowId,
    roles
  }
  await updateRole(data)
}

// 点击确定分配角色
const confirm = async () => {
  await updateRole_()
  emits('update')
  emits('close')
  ElMessage.success(i18n.t('role.updateRoleSuccess'))
}

</script>

<template>
  <div>
    <el-dialog :model-value="isShowDialog"
               :title="$t('excel.roleDialogTitle')"
               width="30%"
               @close="close">
      <div class="checkboxs">
        <el-checkbox-group v-model="checkboxGroup"
                           size="small">
          <el-checkbox v-for="item in AllRoles"
                       :key="item.id"
                       :label="item.title"
                       border>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{ $t('universal.cancel') }}</el-button>
          <el-button @click="confirm"
                     type="primary">{{
            $t('universal.confirm')
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.demo-with-border {
  margin-top: 24px;
}
:deep(.el-checkbox-group) {
  text-align: center;
  .el-checkbox:nth-child(1) {
    margin-left: 10px;
  }
  .el-checkbox {
    width: 100px;
    margin: 5px 0px;
  }
}
</style>
