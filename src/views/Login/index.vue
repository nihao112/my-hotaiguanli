
<script setup>
import { reactive, ref, getCurrentInstance, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { valiPassword, valiusername } from './rule'
import { ElMessage } from 'element-plus'
import SelectLang from '@/components/SelectLang'
import Jiazai from '@/components/Jiazai'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const loginForm = ref(null)
var time = ref(null)
const passwd = ref(true)
const boxshow = ref(false)
const jiazai = ref(false)
var router = useRouter()
var store = useStore()
const state = reactive({
  ruleForm: {
    username: 'super-admin',
    password: '123456'
  },
  checked: false,
  rules: {
    username: [
      { required: 'true', validator: valiusername, trigger: 'change' }
    ],
    password: [
      {
        required: 'true',
        trigger: 'blur',
        validator: valiPassword
      }
    ]
  }
})

const submitForm = async () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      // 由于是局内导出所有在后面要加上("模块名us/方法名login")
      store.dispatch('user/login', state.ruleForm).then((res) => {
        jiazai.value = true
        setTimeout(() => {
          ElMessage.success(i18n.t('toast.successfully'))
          router.push('/')
          jiazai.value = false
        }, 2000)
      })
    } else {
      return false
    }
  })
}
const passwores = () => {
  clearInterval(time)
  passwd.value = !passwd.value
  time = setInterval(() => {
    passwd.value = true
  }, 500)
}
// 中英切换
const { proxy } = getCurrentInstance()
console.log(proxy)
// 监听getters.language的变化
watch(() => store.getters.language, (newValu, oldValue) => {
  // 中英文切换，验证重新执行
  loginForm.value.validateField('username')
  loginForm.value.validateField('password')
})

</script>

<template>
  <div class="home">
    <div class="login">
      <div class="zhongying">
        <!-- 国际化 -->
        <select-lang />
      </div>
      <div class="Neilogin">
        <h1 class="titles">{{$t("login.title")}}</h1>
        <el-form label-position="top"
                 :rules="state.rules"
                 :model="state.ruleForm"
                 ref="loginForm"
                 class="login-form">
          <el-form-item prop="username">
            <div class="inputs">
              <svg-icon icon="yonghu"
                        className="classIcon" />
              <el-input placeholder="请输入用户名"
                        type="text"
                        v-model.trim="state.ruleForm.username"
                        autocomplete="off">
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="inputs">
              <svg-icon className="classIcon"
                        icon="mima" />
              <el-input :type="passwd?'password':'text'"
                        v-model.trim="state.ruleForm.password"
                        placeholder="请输入密码"
                        autocomplete="off"></el-input>
              <svg-icon @click="passwores"
                        className="classIcon xiaoyan"
                        :icon="passwd?'biyanjing-xianxing3-0':'yanjing'" />
            </div>
          </el-form-item>
          <el-form-item>
            <div style="color: aliceblue">{{$t("login.logindenglu")}}&nbsp;<a href="https://work.weixin.qq.com/nl/privacy">{{$t("login.loginfuwu")}}</a></div>
            <el-button style="width: 100%"
                       type="primary"
                       @click="submitForm">
              <Jiazai v-if="jiazai" /> {{$t("login.loginBtn")}}
            </el-button>
            <el-checkbox v-model="state.checked"
                         @change="!checked">{{$t("login.loginjizhu")}}</el-checkbox>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <div class="biaoji">
      <div @mouseover="boxshow=true"
           @mouseout="boxshow=false"
           class="biaoji_1">{{$t("login.permission")}}<svg-icon className="jianto"
                  icon="jianto"></svg-icon>
      </div>
      <transition name="fade">
        <p v-show="boxshow"
           class="biaoji_2"
           v-html="$t('login.desc')">
        </p>
      </transition>
    </div>
  </div>

</template>
<style lang="scss" scoped>
@import '../../style/Login/login.scss';
</style>
