<script setup>
import SidebarMenu from './components/SidebarMenu/index.vue'
import { useStore } from 'vuex'
const store = useStore()
</script>
<template>
  <div class="cebianlan ">
    <div class="logos">
      <el-avatar shape="circle"
                 :size="50"
                 :src="store.getters.userInfo.avatar"></el-avatar>
      <h1 v-if="store.getters.zheDieTuBiao">{{store.getters.userInfo.username}}</h1>
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
  height: 50px;
  justify-content: space-around;
  h1 {
    height: 53px;
    text-align: center;
    line-height: 53px;
    font-size: 18px;
    color: white;
    white-space: nowrap;
  }
  .el-avatar {
    background: none;
    margin-left: 2px;
  }
}
</style>
