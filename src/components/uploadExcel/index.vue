<script setup>
import { ref, defineProps, computed } from 'vue'
import { useStore } from 'vuex'
import { isExcel, readFileAsExcel, isJs } from '@/utils/xlsx.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const tagUploadInput = ref('')
const store = useStore()
const i18n = useI18n()
const yunStyle = computed(() => {
  return store.getters.cssVar.menuBg
})

var type = ref('')
const props = defineProps({
  beforeUpload: {
    type: Function,
    required: true
  },
  onSuccess: Function
})
const accept = ref({ excel: '.xlsx,.xls', js: '.js', txt: '.txt' })
const { type: filetype, doUpload } = props.beforeUpload()
type.value = filetype
if (filetype) {
  type.value = filetype
} else {
  ElMessage.error(i18n.t('uploadExcel.upSheDing'))
}
// input文件上传
// 点击文件上传按钮
const handleUpload = () => {
  // 触发input的点击事件
  tagUploadInput.value.click()
}
// 文件上传的隐藏域
const handleChange = (e) => {
  // 获取到文件
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return false
  console.log(files)
  // 上传
  upload(rawFile)
}

// 执行上传 beforeUpload 而且beforeUpload返回true才执行读取操作,如果没有beforeUpload直接执行操作
const upload = (rawFile) => {
  if (doUpload) {
    // 读取文件
    readFile(rawFile)
  } else {
    ElMessage.error(i18n.t('uploadExcel.upQuXiao'))
  }
}
// 读取文件
const readFile = (rawFile) => {
  // 1.创建一个读取对象
  const reader = new FileReader()
  // 2.读取完的回调
  reader.onload = (e) => {
    // 2-1-1获取读取完毕后的文件内容(excel文件格式)
    const data = e.target.result
    if (type.value === 'excel') {
      const result = readFileAsExcel(data)
      generateDate(result)
    } else if (type.value === 'js') {
      // 解析其他类型文件 需要下载要解析的包
      console.log('解析js')
    }
    // 2-2解析完毕后调用onSuccess()
  }
  // 3.异步读取
  reader.readAsArrayBuffer(rawFile)
}

// 通知父组件解析完毕
const generateDate = (result) => {
  props.onSuccess(result)
}

// 拖拽上传业务
// 释放后会触发
const onDrop = (e) => {
  //  获取文件内容
  const files = e.dataTransfer.files
  if (files.length <= 0) {
    ElMessage.error(i18n.t('uploadExcel.upYouXiao'))
    return false
  }
  const rawFile = files[0]
  if (!checkFileType(rawFile)) {
    return false
  }
  upload(rawFile)
}
// 验证文件类型
const checkFileType = (rawFile) => {
  if (type.value === 'excel') {
    if (!isExcel(rawFile)) {
      ElMessage.error(`${rawFile.name} ：${i18n.t('uploadExcel.upONWxcel')}`)
      return false
    } else {
      return true
    }
  } else if (type.value === 'js') {
    if (!isJs(rawFile)) {
      ElMessage.error(`${rawFile.name} ：${i18n.t('uploadExcel.upOnJs')}`)
      return false
    } else {
      return true
    }
  }
}

// 当拖拽文件到一个可释放目标时触发
const onDropEnter = (e) => {
  // 在新位置生成源项的副本(获取备份)
  e.dataTransfer.dropEffect = 'copy'
}

</script>
<template>
  <div class="upload-excel-conteiner">
    <!-- 文件上传 -->
    <div class="btn-upload">
      <el-button type="primary"
                 @click="handleUpload">{{$t("uploadExcel.upload")}}</el-button>
      <!-- 文件上传的隐藏域 -->
      <input type="file"
             ref="tagUploadInput"
             class="upload-excel-input"
             :accept="accept[type]"
             @change="handleChange">
    </div>
    <!-- 拖拽上传 -->
    <div class="drop"
         @drop.prevent.stop="onDrop"
         @drEnter.prevent.stop="onDropEnter"
         @dragover.prevent.stop="onDropEnter">
      <svg-icon icon="yunshangchuan"
                className="yunshangchuan"></svg-icon>
      <p>{{$t("uploadExcel.drop")}}</p>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.upload-excel-conteiner {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .btn-upload {
    line-height: 160px;
  }
  .btn-upload,
  .drop {
    width: 350px;
    height: 160px;
    text-align: center;
    border: 1px dashed #ddd;
  }
  .drop {
    color: #bbb;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .yunshangchuan {
    font-size: 60px;
    color: v-bind(yunStyle);
  }
  .upload-excel-input {
    display: none;
    z-index: -1000;
  }
}
</style>
