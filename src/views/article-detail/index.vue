<template>
  <div class="article-detail-container">
    <h2 class="title">{{articleData.title}}</h2>
    <div class="header">
      <!-- 作者 -->
      <span class="author">{{$t("article.author")}}&nbsp; : &nbsp;<span style=" text-align: center; text-decoration: underline;">{{articleData.author}}</span></span>
      <!-- 时间 -->
      <span class="time">{{$t("article.publicDate")+ " : " +$filters.relativeTime(articleData.publicDate)}}</span>
      <!-- 编辑按钮 -->
      <el-button type="text"
                 class="edit"
                 @click="editArticle">{{$t("article.edit")}}</el-button>
    </div>
    <!-- 内容 -->
    <div class="content"
         v-html="articleData.content"></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articleDetail } from '@/api/article.js'

const route = useRoute()
const articleData = ref({})
const articleDetail_ = async (id) => {
  articleData.value = await articleDetail(id)
}

watch(() => {
  return route.params.id
}, (val) => {
  if (val) {
    articleDetail_(val)
  }
}, { immediate: true })
// 点击编辑文章
const router = useRouter()
const editArticle = () => {
  router.push('/article/create/' + articleData.value._id)
}

</script>

<style lang="scss" scoped>
.article-detail-container {
  .title {
    text-align: center;
    font-size: 22px;
    padding: 12px 0px;
  }
  .header {
    padding: 26px 0px;
    .author {
      font-size: 14px;
      color: #556665;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
      margin-right: 12px;
    }
  }
  :deep(.content) {
    font-size: 17px;
    padding: 20px 0px;
    border-top: 1px solid #000;
    text-indent: 2em;
    white-space: pre-line;
    line-height: 24px;
    /* table 样式 */
    table {
      border-top: 1px solid #ccc;
      border-left: 1px solid #ccc;
    }
    table td,
    table th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
    table th {
      border-bottom: 2px solid #ccc;
      text-align: center;
    }

    /* blockquote 样式 */
    blockquote {
      display: block;
      border-left: 8px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }

    /* code 样式 */
    code {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      background-color: #f1f1f1;
      border-radius: 3px;
      padding: 3px 5px;
      margin: 0 3px;
    }
    pre code {
      display: block;
    }

    /* ul ol 样式 */
    ul,
    ol {
      margin: 10px 0 10px 20px;
    }
  }
}
</style>
