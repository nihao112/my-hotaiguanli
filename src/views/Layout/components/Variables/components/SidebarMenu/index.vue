<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import SidebarItem from '../SidebarItem'
import { useStore } from 'vuex'
// import avatar from '@/assets/logo.png'
import { filterRouter, generateMenus } from '@/utils/router.js'
const router = useRouter()
const store = useStore()

// 获取路由
// console.log(router.getRoutes())
// 去除重复路由
// console.log(filterRouter(router.getRoutes()))
// 格式化
// console.log(generateMenus(filterRouter(router.getRoutes())))
// 因为以后路由要变化所以要用计算属性
const routes = computed(() => {
  const filterRoutes = filterRouter(router.getRoutes())
  return generateMenus(filterRoutes)
})
const route = useRoute()
const activePath = computed(() => {
  const { path } = route
  return path
})
</script>
<template>
  <div>
    <el-menu :active-text-color="store.getters.cssVar.colors"
             :default-active="activePath"
             :text-color="store.getters.cssVar.menuText"
             :unique-opened="true"
             :collapse="!store.getters.zheDieTuBiao"
             :background-color="store.getters.cssVar.subMenuBg"
             router>
      <sidebar-item v-for="item in routes"
                    :key="item.path"
                    :route="item" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '~@/style/variables/variables.scss';
:deep(.is-active) {
  .el-submenu__title {
    .iconst {
      color: #5468ff;
    }
    span {
      color: #5468ff;
    }
  }
}
:deep(.is-opened) {
  .el-submenu__title {
    .iconst {
      color: #5468ff;
    }
    span {
      color: #5468ff;
    }
  }
}
:deep(.el-menu) {
  border: 1px solid $subMenuBg;
  .el-menu-item {
    .el-icon-user {
      padding: 0px 4px 0px 0px;
    }
  }
  .el-menu--inline {
    .el-menu-item {
      display: block !important;

      .iconst {
        // border: 1px solid red;
        padding: 0px 20px 15px 0px !important;
      }
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
:deep(.el-menu) {
  .el-menu-item.is-active {
    .iconst {
      color: #5468ff;
    }
  }
}
</style>
