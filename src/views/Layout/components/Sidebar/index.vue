<template>
  <div class="navbar">
    <!-- 左侧 -->
    <div class="navbar_1">
      <cuttle class="cuttle_container" />
      <breadcrumb />
    </div>
    <!-- 右侧 -->
    <div class="right-menu">
      <el-dropdown class="avatar-containe">
        <!-- 头像 -->
        <div class="avatar-wrapper">
          <el-avatar shape="circle"
                     :size="50"
                     :src="avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-drop-down">
            <el-dropdown-item>首页</el-dropdown-item>
            <el-dropdown-item disabled>课程主页</el-dropdown-item>
            <el-dropdown-item divided
                              @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import avatar from '@/assets/OIP-C.jpg'
import { useStore } from 'vuex'
import Cuttle from '@/components/Cuttle/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
const store = useStore()
// 主动退出
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  .right-menu {
    padding-right: 16px;
    .avatar-containe {
      cursor: pointer;
      .avatar-wrapper {
        position: relative;
        :deep(.el-avatar) {
          --el-avatar-background-color: none;
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
  .navbar_1 {
    flex: 1;
    .cuttle_container {
      line-height: 50px;
      height: 100%;
      float: left;
      line-height: 65px;
      cursor: pointer;
      transition: background 0.9s;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
