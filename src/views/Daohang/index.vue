<template>

  <div class="app-wrapper">
    <div class="daohanglan">
      <Variables class="siderbar-container"
                 :style="{ backgroundColor: variables.subMenuBg }" />
    </div>
    <div class="main-container">
      <div class="fixed-header">
        <Sidebar />
      </div>
      <div class="app-center">
        <Common />
      </div>
    </div>
  </div>

</template>
<script setup>
import Common from './components/Common/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Variables from './components/Variables/index.vue'
import variables from '@/style/variables/variables.scss'
</script>
<style lang="scss" scoped>
@import '~@/style/common/common.scss';
@import '~@/style/variables/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  display: flex;
  .daohanglan {
    .siderbar-container {
      width: $sideBarWidth;
      height: 100%;
    }
  }
  .main-container {
    flex: 1;
    .fixed-header {
      width: calc(100% - #{$sideBarWidth}+3);
    }
  }
}
</style>
