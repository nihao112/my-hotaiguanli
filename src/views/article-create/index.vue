<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('article.markdown')"
                     name="first">
          <toastuiEditor :articleRoute="info" />
        </el-tab-pane>
        <el-tab-pane :label="$t('article.richText')"
                     name="second">
          <wangeditor :articleRoute="info" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import toastuiEditor from '@/components/editor/toastuiEditor.vue'
import wangeditor from '@/components/editor/wangeditor.vue'

const activeName = ref('first')

defineProps({
  info: {
    type: String
  }
})

</script>

<style lang="scss" scoped>
</style>
