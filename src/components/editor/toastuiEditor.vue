<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps, watch } from 'vue'
import { articleDetail } from '@/api/article.js'
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/i18n/zh-cn'
import initInput from './input.vue'
import { text, stance, compileTitle, initarticleDetail } from './hooks/toa'
import { useStore } from 'vuex'
const props = defineProps({
  articleRoute: {
    type: String,
    required: true
  }
})
// 请求当前数据
const articleDetail_ = async () => {
  initarticleDetail.value = await articleDetail(props.articleRoute)
  const { title, content } = initarticleDetail.value
  compileTitle.value = title
  initToastuiEditor.setHTML(content)
}
// id丢失后清空数据
watch(() => props.articleRoute,
  (val) => {
    if (val) {
      initToastuiEditor.setHTML('')
      text.value = ''
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

const toastuiEditor = ref(null)
const store = useStore()

// 初始化编辑器数据
let initToastuiEditor
onMounted(() => {
  initToastuiEditor = new Editor({
    el: toastuiEditor.value,
    height: '450px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    viewer: true
  })
})

// 组件卸载之前销毁数据
onBeforeUnmount(() => {
  initToastuiEditor.destroy()
  initToastuiEditor = null
})
const clearinit = () => {
  setTimeout(() => {
    initToastuiEditor.setHTML('')
    text.value = ''
  }, 800)
}
// 点击发布文章发送commit请求
const syncHTML = () => {
  stance.value.html = initToastuiEditor.getHTML()
  store.dispatch('setArticle/initarticleCreate_', { text: text.value, html: stance.value.html }).then(res => {
    clearinit()
  })
}
// 点击编辑发送commit请求
const compiles = () => {
  stance.value.html = initToastuiEditor.getHTML()
  const data = { id: initarticleDetail.value._id, title: text.value, content: stance.value.html }
  store.dispatch('setArticle/articleEdits_', data).then(() => {
    clearinit()
  })
}

</script>

<template>
  <div>
    <initInput :compileTitle="compileTitle"
               :idRrticleRoute="articleRoute"
               @syncHTML="syncHTML"
               @compiles="compiles" />
    <div ref="toastuiEditor">

    </div>
  </div>
</template>

<style lang='scss' scoped>
</style>
