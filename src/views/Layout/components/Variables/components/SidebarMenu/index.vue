<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import SidebarItem from '../SidebarItem/index.vue'
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
const borderstyle = computed(() => {
  return store.getters.cssVar.menuBg
})
const colorstyle = computed(() => {
  return store.getters.cssVar.menuActiveText
})
console.log(store.getters.cssVar.menuText, '23')

</script>
<template>
  <div>
    <el-menu :active-text-color="store.getters.cssVar.menuActiveText"
             :default-active="activePath"
             :text-color="store.getters.cssVar.menuText"
             :unique-opened="true"
             :collapse="!store.getters.zheDieTuBiao"
             :background-color="store.getters.cssVar.menuBg"
             router>
      <sidebar-item v-for="item in routes"
                    :key="item.path"
                    :route="item" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '~@/style/variables/variables.scss';
:deep(.el-sub-menu__title) {
  display: block !important;
}
:deep(.el-menu-item) {
  display: block !important;
}
:deep(.is-active) {
  .el-submenu__title {
    .iconst {
      color: v-bind(colorstyle);
    }
  }
}
:deep(.is-opened) {
  .el-submenu__title {
    .iconst {
      color: v-bind(colorstyle);
    }
  }
}

:deep(.el-menu) {
  border: 1px solid v-bind(borderstyle);
  margin-top: 10px;
  li {
    .iconst {
      padding: 0px 18px 18px 0px;
    }
  }
  .el-menu--inline {
    text-align: center;

    .el-menu-item {
      .iconst {
        padding: 0px 13px 16px 0px !important;
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
      color: v-bind(colorstyle);
    }
  }
}
</style>
