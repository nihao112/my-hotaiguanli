<template>
  <div class="navbar">
    <!-- 左侧 -->
    <div class="navbar_1">
      <cuttle class="cuttle_container" />
      <breadcrumb />
    </div>
    <!-- 右侧 -->
    <div class="right-menu">
      <!-- 主题切换 -->
      <theme />
      <!-- 国际化按钮 -->
      <select-lang />
      <el-dropdown class="avatar-containe">
        <!-- 头像 -->
        <div class="avatar-wrapper">
          <el-avatar shape="circle"
                     :size="50"
                     :src="avatar"></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-drop-down">
            <el-dropdown-item>{{$t("navBar.home")}}</el-dropdown-item>
            <el-dropdown-item>{{$t("navBar.course")}}</el-dropdown-item>
            <el-dropdown-item divided
                              @click="logout">{{$t("navBar.logout")}}</el-dropdown-item>
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
import SelectLang from '@/components/SelectLang/index.vue'
import theme from '@/components/theme/index.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const store = useStore()
// 主动退出
const i18n = useI18n()
const logout = () => {
  ElMessageBox.confirm(
    i18n.t('toast.confirmzhiyi'),
    i18n.t('toast.tishi'),
    {
      confirmButtonText: i18n.t('universal.confirm'),
      cancelButtonText: i18n.t('universal.cancel'),
      type: 'warning'
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: i18n.t('toast.success')
      })
      store.dispatch('user/logout')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: i18n.t('toast.successquxiao')
      })
    })
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
  :deep(.right-menu) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-dropdown {
      margin: 0px 10px !important;
    }
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
