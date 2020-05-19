<template>
  <div class="page-login">

    <div class="login-header">
      <a href="/" class="logo" />
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370"
          alt="美团网">
      </div>
      <div class="form">
        <h4 v-if="error" class="tips"><i />{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile" />
        <el-input v-model="password" prefix-icon="password" type="password" show-password />
        <div class="foot">
          <el-checkbox class="" v-model="checked" disabled>7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
        <p class="signup-guide">还没有账号？<a href="/register" target="_top">免费注册</a></p>
      </div>
    </div>
    <footer class="footer--mini">
      <div class="copyright">
        <p>
          ©<span>2020</span>
          <a class="f1" href="https://www.meituan.com">美团网团购</a>
          meituan.com
          <a class="f1" href="http://www.miibeian.gov.cn/" target="_blank">京ICP证070791号</a>
          京公网安备11010502025545号
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  export default {
    data: () => {
      return {
        checked: '',
        username: '',
        password: '',
        error: ''
      }
    },
    layout: 'blank',
    methods: {
      login: function () {
        let self = this;
        self.$axios.post('/users/signin', {
          username: window.encodeURIComponent(self.username),
          password: CryptoJS.MD5(self.password).toString()
        }).then(({
          status,
          data
        }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              location.href = '/'
            } else {
              self.error = data.msg
            }
          } else {
            self.error = `服务器出错`
          }
        })
      }
    }
  }

</script>

<style lang="scss">
  @import "@/assets/css/login/index.scss";

  .footer--mini {
    padding-top: 20px;
    border-top: 1px solid #e5e5e5;
    color: #999;
    font-size: 13px;

    .f1 {
      color: #999;
    }
  }


  

</style>
