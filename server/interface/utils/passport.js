//koa2使用passport权限认证中间件安装包
import passport from 'koa-passport'
//本地验证策略
import LocalStrategy from 'passport-local'
//导入本地数据库
import UserModel from '../../dbs/models/users'

//提交数据（策略）
passport.use(new LocalStrategy(async function(username,password,done){
  let where = {
    username
  };
  //从本地数据库查找，判断是否存在该用户
  let result = await UserModel.findOne(where)
  if(result!=null){
    //找到之后匹配密码
    if(result.password===password){
      return done(null,result)
    }else{
      return done(null,false,'密码错误')
    }
  }else{
    return done(null,false,'用户不存在')
  }
}))
//序列化,让用户每次进入时候，通过session验证
passport.serializeUser(function(user,done){
  done(null,user)
})
//反序列化
passport.deserializeUser(function(user,done){
  return done(null,user)
})

//导出
export default passport
