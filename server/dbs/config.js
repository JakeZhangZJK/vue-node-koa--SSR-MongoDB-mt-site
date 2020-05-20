export default {
    dbs:'mongodb://127.0.0.1:27017/jk-meituan',
    redis:{
      get host(){
        return '127.0.0.1'
      },
      get port(){
        return 6379 //Redis默认端口，不建议修改
      }
    },
    // 配置邮箱服务
    smtp:{
      get host(){
        return 'smtp.qq.com'
      },
      get user(){
        return '2188732198@qq.com' //填入你的邮箱
      },
      get pass(){
        return 'nrgjtbcqxijtdjhh' //填入你的授权码
      },
      get code(){//随机验证码
        return ()=>{
          return Math.random().toString(16).slice(2,6).toUpperCase()
        }
      },
      get expire(){// 过期时间
        return ()=>{
          return new Date().getTime()+60*60*5000
        }
      }
    }
  }
  