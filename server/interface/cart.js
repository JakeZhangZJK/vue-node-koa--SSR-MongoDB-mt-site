import Router from 'koa-router';
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

let router = new Router({prefix: '/cart'})

//创建购物车和返回购物车相关信息
router.post('/create', async ctx => {
  //创建之前需要进行登录拦截
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random() * 1000 + time).toString()
    let {
      params: {
        id,
        detail
      }
    } = ctx.request.body
    //session下有个passport对象，里面存有user
    let cart = new Cart({id, cartNo, time, user: ctx.session.passport.user, detail})
    let result = await cart.save()
    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo  //返回购物车id
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})
//获取购物车信息
router.post('/getCart', async ctx => {
  let {id} = ctx.request.body
  //console.log(id);
  try {
    let result = await Cart.findOne({cartNo: id})
    ctx.body = {
      code: 0,
      data: result
        ? result.detail[0]
        : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
