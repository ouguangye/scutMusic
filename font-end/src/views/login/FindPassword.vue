<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <img src="@/assets/log_image/music.png" alt="icon">
        <h3 class="title">找回密码</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="new Password"
          name="password"
          tabindex="2"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="password1">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password1"
          v-model="loginForm.password1"
          :type="passwordType"
          placeholder="input Password again"
          tabindex="2"
        />
      </el-form-item>

      <el-form-item prop="auth_code">
        <span class="svg-container">
          <svg-icon icon-class="auth_token" style="font-size: 20px" />
        </span>
        <el-input
          ref="auth_code"
          v-model="loginForm.email"
          placeholder="auth_code"
          name="auth_code"
          tabindex="2"
          auto-complete="on"
        >
          <el-button slot="suffix" type="primary" style="margin-top: 10px" size="small" @click="getAuth">
            {{ content }}
          </el-button>
        </el-input>
      </el-form-item>

      <div style="width:100%;margin-bottom:30px;display: flex;justify-content: space-around;">
        <el-button :loading="loading" type="primary" @click.native.prevent="handleRegister">Confirm</el-button>
        <el-button @click="backToLogin">Back to Login</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

import { validUsername } from '@/utils/validate'
import { getAuthCode, updateUserPassword } from '@/backendApi/api'

export default {
  name: 'FindPassword',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    const validatePassword1 = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error('保证两次输入的密码相同'))
      } else {
        callback()
      }
    }

    return {
      content: '发送验证码', // 按钮里显示的内容
      totalTime: 120, // 记录具体倒计时时间
      real_auth_code: '',
      loginForm: {
        username: '',
        password: '',
        password1: '',
        auth_code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        password1: [{ required: true, trigger: 'blur', validator: validatePassword1 }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      options: [{
        value: '选项1',
        label: '普通用户',
        imgSrc: require('@/assets/log_image/normal_user.png')
      }, {
        value: '选项2',
        label: '管理员',
        imgSrc: require('@/assets/log_image/manager.png')
      }],
      value: '选项1'
    }
  },

  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleRegister() {
      this.loading = true
      if (this.content === '发送验证码') {
        this.$message.error('超时，验证码无效！！！')
        return
      }
      if (this.loginForm.auth_code === this.real_auth_code) {
        this.$message.error('验证码输入错误')
        return
      }
      const userInfo = { 'username': this.loginForm.username, 'password': this.loginForm.password }
      const res = await updateUserPassword(userInfo)
      if (res.data.msg === 'success') {
        this.$message('密码更改成功!!! 将自动跳转登录界面')
        setTimeout(this.backToLogin(), 1000)
      } else {
        this.$message.error(res.data.msg)
      }
      this.loading = false
    },
    backToLogin() {
      this.$emit('listenEvent', 0)
    },
    async getAuth() {
      this.countDown()
      const res = await getAuthCode({ 'username': this.loginForm.username })
      if (res.data.msg === 'success') {
        this.real_auth_code = res.data.result
      } else {
        this.$message(res.data.msg)
      }
    },
    countDown() {
      this.content = this.totalTime + 's后重新发送'
      const clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) { // 当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.content = '重新发送验证码'
          this.totalTime = 60
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  //background-image: url("../../assets/log_image/bg.png");
  //background-repeat: no-repeat;
  //background-attachment: fixed;
  //background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .el-select {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background-color: rgba(80,150,245,.1);
    border: 1px solid #5096f5;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    margin-bottom: 70px;
    vertical-align: center;

    input{
      padding-top: 0;
      padding-left: 13%;
    }

    .el-input__suffix{
      padding-bottom: 7px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 80px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    display: flex;
    justify-content: center;

    img{
      width: 50px;
      height: 50px;
      margin: 0 25px 30px 100px;
      vertical-align:middle;
    }

    .title {
      font-size: 25px;
      color: $light_gray;
      margin: 10px auto 30px 0;
      text-align: center;
      font-weight: bold;
      vertical-align:middle;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
