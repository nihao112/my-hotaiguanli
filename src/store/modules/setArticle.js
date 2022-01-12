import { articleCreate, articleEdit } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import router from '@/router'
import i18n from '@/i18n'
const state = {
  // 创建文章数据
  wangeditorText: '',
  // 文章编辑数据
  infoArticleEdit_: ''
}
const mutations = {
  // 创建文章请求数据
  initarticleCreate: async (state, htmlTitle) => {
    state.wangeditorText = htmlTitle
    const { text, html } = state.wangeditorText
    if (text.length <= 0) {
      ElMessage.error(i18n.global.t('article.titlePlaceholder'))
    }
    if (html.length <= 0) {
      setTimeout(() => {
        ElMessage.error(i18n.global.t('article.sortArticle'))
      }, 300)
    }
    if (text.length > 0 && html.length > 0) {
      await articleCreate({ title: text, content: html })
      ElMessage.success(i18n.global.t('article.createSuccess'))
      router.push({ path: '/article/ranking' })
    }
  },
  // 文章编辑数据请求
  articleEdits: async (state, articleEdit_) => {
    state.infoArticleEdit_ = articleEdit_
    const { id, title, content } = state.infoArticleEdit_
    await articleEdit({ id, title, content })
    ElMessage.success(i18n.global.t('article.editorSuccess'))
    router.push({ path: '/article/ranking' })
  }
}
const actions = {
  initarticleCreate_({ commit }, htmlTitle) {
    commit('initarticleCreate', htmlTitle)
  },
  articleEdits_({ commit }, articleEdit_) {
    commit('articleEdits', articleEdit_)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
