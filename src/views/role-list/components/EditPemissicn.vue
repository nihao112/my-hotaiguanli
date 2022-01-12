<script setup>
import { getAllpermissions } from '@/api/permission.js'
import { getPermissionByRoleId, updatePermissionByRoleId } from '@/api/role.js'
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  isShowDialog: {
    type: Boolean,
    required: true
  },
  selectRoleId: {
    type: String,
    required: true
  },
  ElMess: {
    type: Function,
    required: true
  }
})
const emits = defineEmits(['close', 'confir'])
const close = () => {
  emits('close')
}
const store = useStore()
// 确定事件
const confirm = async () => {
  const checkedArr = tree.value.getCheckedKeys()
  // 权限角色修改
  await updatePermissionByRoleId({ roleId: props.selectRoleId, permissions: checkedArr })
  // 更新vuex中该角色权限
  store.commit('roleAndPermission/updatePermissonToRole', { roleId: props.selectRoleId, permissionArray: checkedArr })
  // 调用父组件弹框
  props.ElMess()
  // 关闭弹框让他不折叠
  emits('confir')
  // 关闭diolog
  emits('close')
}

// 展示树形控件
const definprops = ref({
  label: 'permissionName',
  children: 'children'
})
// 请求所有权限列表数据
const PermissionList = ref([])
const getAllpermission = async () => {
  const res = await getAllpermissions()
  PermissionList.value = res
}
getAllpermission()
// 请求所有角色默认列表
const tree = ref('')
const getPermissionByRoleId_ = async () => {
  const res = await getPermissionByRoleId(props.selectRoleId)
  tree.value.setCheckedKeys(res)
}
getPermissionByRoleId_()

</script>

<template>
  <div>
    <el-dialog :model-value="isShowDialog"
               :title="$t('role.assignPermissions')"
               width="30%"
               @close="close">
      <el-tree ref="tree"
               :props="definprops"
               :data="PermissionList"
               node-key="id"
               :show-checkbox="true"
               :check-strictly="true" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">{{$t("universal.cancel")}}</el-button>
          <el-button type="primary"
                     @click="confirm">{{$t("universal.confirm")}}</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<style lang='scss' scoped>
</style>
