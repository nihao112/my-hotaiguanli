<template>
  <div>
    <el-card class="defaultEx">
      <el-button type="primary"
                 @click="zhankai(defaultEx?true:fasle)">{{defaultEx?$t('permission.unfold'):$t('permission.folding')}}</el-button>
    </el-card>
    <theme-table :cb="[]">
      <template #default="{ headerStyle }">
        <el-table :data="permissionsData"
                  style="width: 100%; margin-bottom: 20px"
                  border
                  row-key="id"
                  :default-expand-all='fasle'
                  :tree-props="{ children: 'children'}"
                  :header-cell-style="headerStyle"
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
      </template>
    </theme-table>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { getAllpermissions } from '@/api/permission.js'
import { watchLang } from '@/utils/i18n.js'
import ThemeTable from '@/components/ThemeTable'
const permissionsData = ref([])
const defaultExpand = ref(null)
const defaultEx = ref(true)
const initPermission = async () => {
  const data = await getAllpermissions()
  permissionsData.value = data
}
initPermission()

// 切换展开和合并状态
const zhankai = (val) => {
  defaultEx.value = !defaultEx.value
  permissionsData.value.forEach(item => {
    defaultExpand.value.toggleRowExpansion(item, val)
  })
}
// // 修改二级菜单背景
// const childrenBgColor = computed(() => {
//   return store.getters.cssVar['light-6']
// })
// // 修改hover状态下的背景
// const childrenBgColorhHover = computed(() => {
//   return store.getters.cssVar['light-3']
// })
// 数据请求中英文
//  如果语言切换，重新调用接口
watchLang(initPermission)
</script>

<style lang="scss" scoped>
.defaultEx {
  text-align: right;
  margin-bottom: 15px;
}

:deep(.el-table__body tr:hover > td) {
  animation-name: pulse;
  animation-duration: 1.583s;
  animation-fill-mode: both;
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
