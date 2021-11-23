<script setup>
import avatar from '@/assets/logo.png'
import SidebarMenu from './SidebarMenu.vue'
import { useStore } from 'vuex'
const store = useStore()

</script>
<template>
  <div class="cebianlan ">
    <div class="logos">
      <el-avatar shape="square"
                 :size="50"
                 :src="avatar"></el-avatar>
      <h1 v-if="store.getters.zheDieTuBiao">{{store.getters.userInfo}}</h1>
    </div>
    <!-- 滚动组件 -->
    <el-scrollbar>
      <SidebarMenu />
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
.logos {
  display: flex;
  justify-content: space-around;
  h1 {
    height: 53px;
    text-align: center;
    line-height: 53px;
    font-size: 18px;
    color: white;
  }
  .el-avatar {
    background: none;
    margin-left: 2px;
  }
}
</style>
