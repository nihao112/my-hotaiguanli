<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
const router = useRouter()
const route = useRoute()
const store = useStore()
const tabflse = ref(false)
const indexref = ref(-1)
const styleobj = ref({
  left: 0,
  top: 0
})
const liebiao = ref([{
  name: 'refresh'
}, {
  name: 'closeRight'
}, {
  name: 'closeOther'
}])
// 获取的数据
const daohang = computed(() => {
  return store.getters.daohang
})
// 点击叉号删除
const handleClose = (index) => {
  indexref.value = index
  store.commit('app/closeTap', { type: 'index', index })
}
// 点击跳转
const pathroute = (item) => {
  router.push({ path: item.path })
}
// 判断添加类名
const isActive = (path) => {
  return path === route.fullPath
}
// 背景颜色
const backgstyle = computed(() => {
  return store.getters.cssVar.menuBg
})
// 字体颜色
const colorhover = computed(() => {
  return store.getters.cssVar.subMenuHover
})
// 右击事件
const Contextmenu = (item, index, e) => {
  styleobj.value.left = e.y - 60 + 'px'
  styleobj.value.top = '26px'
  // youji.style.left
  tabflse.value = item
  indexref.value = index
}
// 点击右击出现菜单选项
const tabltem = (inde, item) => {
  switch (inde) {
    // 刷新
    case 0:
      // window.location.reload()
      router.go(0)
      break
    // 关闭右侧
    case 1:
      store.commit('app/closeTap', { type: 'right', item })
      tabflse.value = false
      break
    // 关闭其他
    case 2:
      store.commit('app/closeTap', { type: 'other', item })
      tabflse.value = false
      break
  }
}
// 点击任何位置让右击消失
const onClone = () => {
  tabflse.value = false
}

watch(tabflse, (value) => {
  if (value) {
    document.body.addEventListener('click', onClone)
  } else {
    document.body.removeEventListener('click', onClone)
  }
})
</script>

<template>
  <div style="display:flex">
    <el-tag v-for="(item,index) in daohang"
            :key="item.path"
            :class="{'active': isActive(item.path)}"
            class="daohang"
            closable
            :disable-transitions="false"
            @click="pathroute(item)"
            @close="handleClose(index)"
            @contextmenu.prevent.stop="Contextmenu(item.path,index,$event)">
      {{ item.title}}
      <div v-if="item.path==tabflse"
           class="liebiao"
           :style="styleobj">
        <ul class="liebiao_1"
            v-for="(ite,inde) in liebiao"
            :key="inde">
          <li @click="tabltem(inde,item)">{{$t(`tagsView.${ite.name}`)}}</li>
        </ul>
      </div>
    </el-tag>
  </div>
</template>

<style lang='scss' scoped>
.daohang {
  position: relative;
}
.liebiao {
  width: 90px;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: white;
  border-radius: 5px;
  height: 100px;
  box-shadow: 2px 2px 3px 1px rgb(202, 202, 202);
  z-index: 555;
  .liebiao_1 {
    margin: 3px 0px;
    li {
      width: 90px;
      color: black;
      text-align: center;
    }
    &:hover {
      background-color: v-bind(colorhover);
    }
  }
}

:deep(.el-tag) {
  margin-left: 10px;
  cursor: pointer;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.active {
  --el-tag-background-color: v-bind(backgstyle);
  --el-tag-hover-color: v-bind(colorhover);
  border-color: v-bind(backgstyle);
  color: white;
  &:before {
    content: '●';
    padding: 0px 5px 4px 0px;
    font-size: 16px;
  }
  :deep(.el-icon) {
    display: none;
  }
}
</style>
