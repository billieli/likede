<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">
      <div class="bgc-w">
        <div class="title-container">
          <h3 class="title">
            <img src="@/assets/common/logo.png" alt="" class="title-img">

          </h3>
        </div>

        <el-form-item prop="loginName" style="background-color:#fff;border: #ccc 1px solid;width:88%; " class="item-s">
          <span class="svg-container">
            <span class="el-icon-mobile-phone" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.loginName"
            placeholder="请输入用户名/手机号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password" style="background-color:#fff;border: #ccc 1px solid;width:88%;" class="item-s">
          <span class="svg-container">
            <span class="el-icon-lock" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <!---------------------------------------- 验证码区域------------------------------- -->
        <el-form-item prop="code" style="background-color:#fff;border: #ccc 1px solid;width:88%; " class="item-s inputcode">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            type="text"
            auto-complete="on"
          />
          <span @click="getCode">
            <img :src="codeurl" alt="">
          </span>

        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:88%;margin-bottom:30px;background-color:#2e50e1; " @click="handleLogin" @click.native.prevent="handleLogin">点击登录</el-button>
      </div>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getImg } from '@/api/public'

export default {
  name: 'Login',
  data() {
    const validphone = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名错误'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码格式错误请确认'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0

      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      codeurl: '',
      rules: {
        loginName: [{ required: true, message: '请输入手机号', trigger: 'blur' }, {
          validator: validphone, trigger: 'blur'
        }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: validatePassword, trigger: 'blur'
          }

        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }

        ]
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCode()
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
    async getCode() {
      this.loginForm.clientToken = Math.random()
      console.log(this.loginForm.clientToken)
      const { data } = await getImg(this.loginForm.clientToken)
      this.codeurl = window.URL.createObjectURL(data)
      console.log(1, data)
    },
    async handleLogin() {
      try {
        // await this.$refs.loginForm.validator()
        this.loading = true
        await this.$store.dispatch('user/loginAction', this.loginForm)
        setTimeout(() => {
          this.$router.push('/home')
        }, 0)
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #ccc;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color:$bg;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-form-item__content{
      display: flex;
      height : 52px

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
  background: URL('~@/assets/common/background.png') no-repeat center;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .bgc-w{
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #fff;
      border-radius: .6rem;

    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

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

    .title {
      position: relative;
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      height:46px;
    .title-img{
    position: absolute;
    top: -45px;
    left:-40px;
    width: 96px;
// margin-left: -48px
}
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
  .item-s{
 .el-form-item__content{
      border: #283443 1px solid;
    }
  }
  .inputcode{
    height:  3.25rem;
    img{
      height: 3.1rem;
      width: 99%;

  }
}
}

</style>
