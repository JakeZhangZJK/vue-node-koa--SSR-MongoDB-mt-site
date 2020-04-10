export default {
    dbs:'mongodb://127.0.0.1:27017/student',
    redis:{
      get host(){
        return '127.0.0.1'
      },
      get port(){
        return 6379
      }
    },
    smtp:{
      get host(){
        return 'smtp.qq.com'
      },
      get user(){
        return 'xx@qq.com' //填入你的邮箱
      },
      get pass(){
        return 'xx' //填入你的授权码
      },
      get code(){
        return ()=>{
          return Math.random().toString(16).slice(2,6).toUpperCase()
        }
      },
      get expire(){
        return ()=>{
          return new Date().getTime()+60*60*1000
        }
      }
    }
  }
  