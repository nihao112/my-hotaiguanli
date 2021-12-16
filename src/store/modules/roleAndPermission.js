import { getAllpermissions } from '@/api/permission.js'
import { getAllRole, getPermissionByRoleId } from '@/api/role.js'
import { getItem, setItem } from '@/utils/storage.js'
import { ROLE, PERMISSIONS, PERMISSIONS_ } from '@/commom/commom.js'
const state = {
  roles: getItem(ROLE) || [],
  permissions: getItem(PERMISSIONS) || [],
  permissions_: getItem(PERMISSIONS_) || []
}
// 将权限的id转化为title
const permissionIdTitle = (idArr, perArr) => {
  const res = []
  idArr.forEach((id) => {
    perArr.forEach((per) => {
      if (per.id === id) {
        res.push({
          id: id,
          title: per.permissionName
        })
      }
      if (per.children.length > 0) {
        per.children.forEach((cPer) => {
          if (cPer.id === id) {
            res.push({
              id: id,
              title: cPer.permissionName
            })
          }
        })
      }
    })
  })
  return res
}
const mutations = {
  initRoles: (state, roles) => {
    state.roles = roles
    setItem(ROLE, roles)
  },
  initpermissions: (state, permissions) => {
    state.permissions = permissions
    setItem(PERMISSIONS, permissions)
    const temArr = []
    permissions.forEach(item => {
      temArr.push({ id: item.id, title: item.permissionName })
      if (item.children && item.children.length > 0) {
        item.children.forEach(childrenItem => {
          temArr.push({ id: childrenItem.id, title: childrenItem.permissionName })
        })
      }
    })
    state.permissions_ = temArr
    setItem(PERMISSIONS_, temArr)
  },
  updatePermissonToRole: (state, { roleId, permissionArray }) => {
    state.roles.forEach((role) => {
      if (role.id === roleId) {
        role.permissions = permissionIdTitle(permissionArray, state.permissions)
      }
    })
    setItem(ROLE, state.roles)
  }
}
const actions = {
  // 初始化角色
  initRoles: async ({ commit, state }) => {
    let roleList = state.roles
    if (Array.isArray(roleList) && roleList.length <= 0) {
      roleList = await getAllRole()
      commit('initRoles', roleList)
    }
    // 请求每一个角色对应的权限
    roleList.forEach(async (role) => {
      const res = await getPermissionByRoleId(role.id)
      commit('updatePermissonToRole', {
        roleId: role.id,
        permissionArray: res
      })
    })
  },
  // 初始化权限
  initpermissions: async ({ commit, state }) => {
    let permissionList = state.permissions
    if (Array.isArray(permissionList) && permissionList.length <= 0) {
      permissionList = await getAllpermissions()
    }
    commit('initpermissions', permissionList)
  },
  // 清空权限和角色相关数据
  clearRoleAndPermission: ({ commit }) => {
    commit('initRoles', [])
    commit('initpermissions', [])
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
