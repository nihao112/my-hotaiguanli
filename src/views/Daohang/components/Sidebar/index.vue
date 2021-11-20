<script setup>
import squareUrl from '@/assets/logo.png'
import { useStore } from 'vuex'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>
<template>
  <div class="tuichu">
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        <el-avatar shape="square"
                   :size="50"
                   :src="squareUrl"></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>

          <el-dropdown-item divided
                            @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style lang="scss" scoped>
.tuichu {
  border-bottom: 1px solid rgb(194, 197, 196);
  display: flex;
  justify-content: right;
  padding: 0px 10px;
}
::v-deep .el-dropdown-link {
  cursor: pointer;
}
::v-deep .el-avatar--square {
  background: white;
}
</style>
