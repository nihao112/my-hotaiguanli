<script setup>
import { ref, defineProps, onMounted, watch, onActivated, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { text } from './hooks/toa'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const props = defineProps({
  compileTitle: {
    type: String,
    required: true
  },
  idRrticleRoute: {
    type: String,
    required: true
  }
})

const buttos = ref(false)
const buttos_ = ref(true)

// 监听id值清空内容
watch(() => props.idRrticleRoute,
  (val) => {
    if (val) {
      buttos.value = false
      buttos_.value = true
    }
  })
// 监听titil然后给输入框赋值
watch(() => props.compileTitle,
  (val) => {
    if (props.idRrticleRoute !== ':info') {
      text.value = val
      buttos.value = true
      buttos_.value = false
    }
  })

const datafocus = ref(null)
// 点击跳转文章排名
const router = useRouter()
const toArticle = () => {
  router.push({ path: '/article/ranking' })
}
const emit = defineEmits(['syncHTML', 'compiles'])
// 点击发布文章
const syncHTML = () => {
  emit('syncHTML', text.value)
}

onMounted(() => {
  datafocus.value.focus()
})
onActivated(() => {
  datafocus.value.focus()
})
// 编辑事件
const compiles = () => {
  emit('compiles', text.value)
}
</script>
<template>
  <div class="inputButt">
    <p @click="toArticle">
      <svg-icon className="svgicon"
                icon="zuojianto" />{{$t('route.articleRanking')}}
    </p>
    <el-input v-model="text"
              ref="datafocus"
              maxlength="100"
              :placeholder="i18n.t('article.titlePlaceholder')"
              show-word-limit
              type="text">
    </el-input>

    <el-button type="primary"
               @click="syncHTML"
               :disabled="buttos"
               round>{{$t("article.commit")}}</el-button>
    <el-button :disabled="buttos_"
               type="primary"
               @click="compiles"
               round>{{$t("article.edit")}}</el-button>
  </div>
</template>

<style lang='scss' scoped>
.inputButt {
  display: flex;
  margin: 10px 10px;
  align-items: center;
  justify-content: space-around;
  p {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    padding: 0px 10px 0px 0px;
    cursor: pointer;
    .svgicon {
      padding: 0px 8px 0px 0px;
      font-size: 18px;
      vertical-align: text-top;
    }
  }
  :deep(.el-input__inner) {
    border-radius: 20px;
  }
  button {
    margin: 0px 0px 0px 10px;
  }
}
</style>
