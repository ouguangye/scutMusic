<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div>
        <el-select v-model="value" clearable placeholder="请选择身份">
          <text slot="prefix">请选择当前身份</text>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <img style="width: 20px;height: 20px" :src="item.imgSrc" alt="">
            <span style="float: right; color: #8492a6; font-size: 15px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>

      <div class="title-container">
        <img src="@/assets/log_image/music.png" alt="">
        <h3 class="title">欢迎使用华工静听</h3>
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
          auto-complete="on"
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
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <el-button type="text" style="margin-right:20px;" @click="JumpTo(2)">忘记密码</el-button>
        <el-button type="text" @click="JumpTo(1)">还没注册？</el-button>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { userLogin } from '@/backendApi/api'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
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
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      options: [{
        value: '1',
        label: '普通用户',
        imgSrc: require('@/assets/log_image/normal_user.png')
      }, {
        value: '2',
        label: '管理员',
        imgSrc: require('@/assets/log_image/manager.png')
      }],
      value: '1'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        // console.log(route)
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
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
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          if (this.value === '2') {
            if (this.loginForm.username === 'admin' && this.loginForm.password === 'admin') {
              window.location.href = '/admin/index/album/'
            } else {
              this.$message.error('账户或者密码错误')
            }
          }
          this.loading = true
          const res = await userLogin({ 'username': this.loginForm.username,
            'password': this.loginForm.password })
          if (!res.data) {
            console.log('res为空')
            return
          }
          if (res.data.msg === 'success') {
            console.log(res.data.result)
            setToken(res.data.result.username) // 这里偷懒了，直接使用username作为token
            await this.$store.dispatch('user/login', res.data.result)
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          } else {
            this.$message.error(res.data.msg)
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    JumpTo(id) {
      this.$emit('listenEvent', id)
    }
  }
}
</script>

<style lang="scss">

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
  height: 100%;
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
      margin: 0 25px 30px auto;
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

