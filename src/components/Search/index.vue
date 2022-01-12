<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchLang } from '@/utils/i18n.js'
import { filterRouter, generateFuse } from '@/utils/router.js'
const router = useRouter()
const isShow = ref(false)
const selectRef = ref('')
const srarch = ref('') // 用户输入检索的字符串
const searchResult = ref([])

const toggleShow = () => {
  // 展开自动获取获取焦点
  if (isShow.value) {
    isShow.value = false
    srarch.value = ''
    searchResult.value = []
    selectRef.value.blur()
  } else {
    isShow.value = true
    selectRef.value.focus()
  }
}
// 检索方法
const querySearch = (query) => {
  // 调用模糊搜索
  searchResult.value = fuse.search(query)
}
// 选中option触发事件
const onselectChange = (value) => {
  //  srarch修改
  srarch.value = value.title.join('>')
  // 跳转
  router.push(value.path)
  // srarch.value = ''
  // searchResult.value = []
}
// 准备数据源
let list = computed(() => {
  // 去除重复的路由
  const filterRoutes = filterRouter(router.getRoutes())
  // 格式化路由 条件1.具备meta&&meta.title 2.过滤动态路由
  // console.log(generateFuse(filterRoutes), '2')
  return generateFuse(filterRoutes)
})
// 初始化Fuse.js 模糊搜索工具
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, // 搜索的结果是否按照优先级排序
    minMatchCharLength: 2, // 搜索的字符串有效最小长度
    keys: [
      { name: 'path', weight: 0.7 }, // 搜索的字段 weight是搜索的权重以权重高的开始搜索
      { name: 'title', weight: 0.3 }
    ]
  })
}
initFuse(list.value) //  list数据源

// 监听language的切换动作
watchLang((lang) => {
  list = computed(() => {
    const filterRoutes = filterRouter(router.getRoutes())
    return generateFuse(filterRoutes)
  })
  initFuse(list.value) //  list数据源
})
// 点击任何位置让select收起
const onClone = () => {
  isShow.value = false
  srarch.value = ''
  searchResult.value = []
}

watch(isShow, (value) => {
  if (value) {
    document.body.addEventListener('click', onClone)
  } else {
    document.body.removeEventListener('click', onClone)
  }
})
</script>

<template>
  <div :class="{show:isShow}"
       class="header-search right-menu_1">
    <!-- 图标 -->
    <el-tooltip class="tooltip"
                :content="$t('guide.searchTitle')">
      <svg-icon icon="search"
                className="search-icon"
                @click.stop="toggleShow" />
    </el-tooltip>

    <!-- 下拉框 -->
    <el-select v-model="srarch"
               placeholder="Select"
               class="header-search-select"
               filterable
               remote
               ref="selectRef"
               default-first-option
               :remote-method="querySearch"
               @change="onselectChange">
      <el-option v-for="option in searchResult"
                 :key="option.item.path"
                 :label="option.item.title.join('>')"
                 :value="option.item">
      </el-option>
    </el-select>
  </div>
</template>

<style lang='scss' scoped>
.header-search {
  .search-icon {
    font-size: 23px;
    color: rgb(59, 60, 61);
    cursor: pointer;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0px;
    overflow: hidden;
    background: transparent;
    display: inline-block;
    vertical-align: middle;
    :deep(.el-input__inner) {
      border-radius: 0;
      border: none;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      padding-left: 0;
      padding-right: 0;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
