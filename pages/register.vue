<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button size="mini" class="el-button-bg-color">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button size="mini" @click="sendMsg" class="el-button-yz">{{sendCode}}</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="6" />
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" />
        </el-form-item>
        <el-form-item>
          <!-- <a href="/login"> -->
          <el-button class="el-button-bg-color" @click="register">同意以下协议并注册</el-button>
          <!-- </a> -->
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="https://rules-center.meituan.com/rules-detail/4" target="_blank">《美团点评用户服务协议》</a>
          <a class="f1" href="https://rules-center.meituan.com/rules-detail/2" target="_blank">《美团点评隐私政策》</a>
        </el-form-item>
      </el-form>
    </section>
    <footer class="footer--mini">
      <p class="copyright">
        ©
        <a class="f1" href="https://www.meituan.com">meituan.com</a>&nbsp;
        <a class="f1" target="_blank" href="http://www.miibeian.gov.cn/">京ICP证070791号</a>&nbsp;
        <span class="f1">京公网安备11010502025545号</span>
      </p>
    </footer>
  </div>
</template>

<script>
  import CryptoJS from "crypto-js";
  import axios from "axios";
  export default {
    data() {
      return {
        sendCode: "发送验证码到邮箱",
        statusMsg: "",
        error: "",
        ruleForm: {
          name: "",
          code: "",
          pwd: "",
          cpwd: "",
          email: "",

        },
        rules: {
          name: [{
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }],
          email: [{
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }],
          pwd: [{
            required: true,
            message: "创建密码",
            trigger: "blur"
          }],
          cpwd: [{
              required: true,
              message: "确认密码",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (value === "") {
                  callback(new Error("请再次输入密码"));
                } else if (value !== this.ruleForm.pwd) {
                  callback(new Error("两次输入密码不一致"));
                } else {
                  callback();
                }
              },
              trigger: "blur"
            }
          ]
        }
      };
    },
    layout: "blank",
    methods: {
      sendMsg() {
        let namePass;
        let emailPass;
        if (this.timerid) {
          return false;
        }
        this.$refs["ruleForm"].validateField("name", valid => {
          namePass = valid;
        });
        this.statusMsg = "";
        if (namePass) {
          return false;
        }
        this.$refs["ruleForm"].validateField("email", valid => {
          emailPass = valid;
        });
        if (!namePass && !emailPass) {
          this.$axios
            .post("/users/verify", {
              username: encodeURIComponent(this.ruleForm.name), // 要对中文进行编码
              email: this.ruleForm.email
            })
            .then(({
              status,
              data
            }) => {
              if (status === 200 && data && data.code === 0) {
                let count = 59;
                this.statusMsg = `验证码已发送,剩余${count--}秒`;
                this.timerid = setInterval(() => {
                  this.statusMsg = `验证码已发送,剩余${count--}秒`;
                  if (count === 0) {
                    clearInterval(this.timerid);
                    this.statusMsg = '验证码已发送，有效期5分钟'
                    this.sendCode = '重新获取'
                  }
                }, 1000);
              } else {
                this.statusMsg = data.msg;
              }
            });
        }
      },
      register () {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$axios.post('/users/signup', {
              //设置中文编码
              username: window.encodeURIComponent(this.ruleForm.name),
              //使用MD5进行密码加密，MD5处理之后会有很多值，并不是hash值，于是需要toString()函数
              password: CryptoJS.MD5(this.ruleForm.pwd).toString(),
              email: this.ruleForm.email,
              code: this.ruleForm.code
            }).then(({
              status,
              data
            }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  this.$message({
                    message: '恭喜，注册成功',
                    type: 'success'
                  });
                  //跳转到登录页面
                  location.href = '/login'
                } else {
                  this.error = data.msg
                }
              } else {
                this.error = `服务器出错，错误码:${status}`
              }
              //定时清空error
              setTimeout( () => {
                this.error = ''
              }, 1500)
            })
          }
        })
      }
    }
  };

</script>
<style lang="scss">
  @import "@/assets/css/register/index.scss";

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
