<script setup>
import WangEditor from 'wangeditor'
import initInput from './input.vue'
import { articleDetail } from '@/api/article.js'
import { text, stance, compileTitle, initarticleDetail } from './hooks/toa'

import { useStore } from 'vuex'
import { ref, onMounted, watch, onBeforeUnmount, defineProps } from 'vue'
const editor = ref(null)

let instance
// 挂在前执行初始化
onMounted(() => {
  instance = new WangEditor(editor.value)
  instance.config.zIndex = 1
  instance.create()
})
// 组件卸载之前销毁数据
onBeforeUnmount(() => {
  instance.destroy()
  instance = null
})

const initWangEditor = ref([])

// 请求当前数据
const articleDetail_ = async () => {
  initWangEditor.value = await articleDetail(props.articleRoute)
  const { title, content } = initWangEditor.value
  compileTitle.value = title
  instance.txt.html(content)
}
// 接收id参数
const props = defineProps({
  articleRoute: {
    type: String,
    required: true
  }
})
// id丢失后清空数据
watch(() => props.articleRoute,
  (val) => {
    if (val) {
      instance.txt.clear()
    }
  })
// 接收到id值然后发送请求
watch(
  () => { return props.articleRoute },
  (val) => {
    if (val !== ':info') {
      articleDetail_()
    }
  }, { immediate: true })
const store = useStore()
const clearinit = () => {
  setTimeout(() => {
    instance.txt.clear()
    text.value = ''
  }, 800)
}
// 点击发布文章
const syncHTML = (text) => {
  stance.value.html = instance.txt.html()
  store.dispatch('setArticle/initarticleCreate_', { text, html: stance.value.html }).then(res => {
    clearinit()
  })
}
// 点击编辑发送commit请求
const compiles = (text) => {
  stance.value.html = instance.txt.html()
  const data = { id: initarticleDetail.value._id, title: text, content: stance.value.html }
  store.dispatch('setArticle/articleEdits_', data).then(res => {
    clearinit()
  })
}
</script>

<template>
  <div class="container">
    <initInput @syncHTML="syncHTML"
               :idRrticleRoute="articleRoute"
               :compileTitle="compileTitle"
               @compiles="compiles" />
    <div ref='editor'></div>
  </div>
</template>

<style lang='scss' scoped>
:deep(.w-e-text-container) {
  height: 400px !important;
}
</style>
