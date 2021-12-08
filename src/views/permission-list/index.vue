<template>
  <div>
    <el-card>
      <el-button type="primary"
                 @click="zhankai(defaultEx?true:fasle)">{{defaultEx?$t('permission.unfold'):$t('permission.folding')}}</el-button>
    </el-card>
    <el-card>
      <el-table :data="permissionsData"
                style="width: 100%; margin-bottom: 20px"
                border
                row-key="id"
                :default-expand-all='fasle'
                :tree-props="{ children: 'children' }"
                :header-cell-style="{
        background: store.getters.cssVar.menuBg,
        color:store.getters.cssVar.menuActiveText,
        fontWeight:900
      }"
                ref="defaultExpand">
        <el-table-column prop="permissionName"
                         :label="$t('permission.name')"
                         width="200"></el-table-column>
        <el-table-column prop="permissionMark"
                         :label="$t('permission.mark')"
                         width="200"></el-table-column>
        <el-table-column prop="permissionDesc"
                         :label="$t('permission.desc')"></el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script setup>
import { ref, computed } from 'vue'
import { getAllpermissions } from '@/api/permission.js'
import { useStore } from 'vuex'
const store = useStore()
const permissionsData = ref([])
const defaultExpand = ref(null)
const defaultEx = ref(true)
const initPermission = async () => {
  const data = await getAllpermissions()
  permissionsData.value = data
}
initPermission()
// 修改二级菜单背景
const childrenBgColor = computed(() => {
  return store.getters.cssVar['light-6']
})
// 修改hover状态下的背景
const childrenBgColorhHover = computed(() => {
  return store.getters.cssVar['light-3']
})
// 切换展开和合并状态
const zhankai = (val) => {
  defaultEx.value = !defaultEx.value
  permissionsData.value.forEach(item => {
    defaultExpand.value.toggleRowExpansion(item, val)
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-table__row--level-1 td) {
  background-color: v-bind(childrenBgColor);
  cursor: pointer;
}
:deep(.el-table__body tr:hover > td) {
  background-color: v-bind(childrenBgColorhHover) !important;
  cursor: pointer;
  animation-name: pulse;
  animation-duration: 1.583s;
  animation-fill-mode: both;
}
:deep(.el-table tr) {
  background-color: v-bind(childrenBgColor);
  cursor: pointer;
  color: white;
}
.s {
  display: none;
}

@keyframes pulse {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
  50% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }
  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>
