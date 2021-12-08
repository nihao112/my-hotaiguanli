<template>
  <div>
    <div class="app-wrapper"
         :class="store.getters.zheDieTuBiao?'':'hideSidebar'">
      <Variables :style="{backgroundColor:store.getters.cssVar.menuBg}"
                 id="guide-sidebar"
                 class="siderbar-container" />
      <div class="main-container">
        <div class="fixed-header">
          <Sidebar />
        </div>
        <Common />
      </div>
    </div>
  </div>

</template>
<script setup>
import { useStore } from 'vuex'
import Common from './components/Common/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Variables from './components/Variables/index.vue'
const store = useStore()
</script>
<style lang="scss" scoped>
@import '~@/style/common/common.scss';
@import '~@/style/variables/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  .siderbar-container {
    width: $sideBarWidth;
    height: 100vh;
    float: left;
    // background-color: v-bind(cssStyle);
    overflow: hidden; // 侧边栏超出出现了滚动条
    transition: width 0.29s;
  }
  .main-container {
    flex: 1;
    overflow: hidden;
    .fixed-header {
      width: calc(100% - #{$sideBarWidth}+4); // 用来动态计算宽度的
    }
  }
}
.hideSidebar {
  .siderbar-container {
    transition: width 0.29s;
    width: #{$sideBarhideWidth};
  }
  .fixed-header {
    width: calc(100% - #{$sideBarhideWidth}+4); // 用来动态计算宽度的
  }
}
</style>
