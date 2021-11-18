
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { valiPassword } from './rule'

const loginForm = ref(null)
var time = ref(null)
const passwd = ref(true)
var router = useRouter()
var store = useStore()
const state = reactive({
  ruleForm: {
    username: 'super-admin',
    password: '123456'
  },
  checked: true,
  rules: {
    username: [
      { required: 'true', message: '账户不能为空', trigger: 'change' }
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
        router.push('/')
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
  }, 1000)
}
</script>
<template>
  <div class="home">
    <div class="login">
      <div class="Neilogin">
        <h1 class="titles">后台管理</h1>
        <el-form label-position="top"
                 :rules="state.rules"
                 :model="state.ruleForm"
                 ref="loginForm"
                 class="login-form">
          <el-form-item prop="username">
            <div class="inputs">
              <svg-icon icon="yonghu"
                        className="classIcon" />
              <el-input type="text"
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
                        autocomplete="off"></el-input>
              <svg-icon @click="passwores"
                        className="classIcon"
                        :icon="passwd?'biyanjing-xianxing3-0':'yanjing'" />
            </div>
          </el-form-item>
          <el-form-item>
            <div style="color: aliceblue">登录表示您已同意<a>《服务条款》</a></div>
            <el-button style="width: 100%"
                       type="primary"
                       @click="submitForm">立即登录</el-button>
            <el-checkbox v-model="state.checked"
                         @change="!checked">下次自动登录</el-checkbox>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../style/Login/login.scss';
</style>
