import Router from 'koa-router'
import Order from '../dbs/models/order'
// 导入购物车实例
import Cart from '../dbs/models/cart'
// 加密
import md5 from 'crypto-js/md5'

const router = new Router({ prefix: '/order' })

// 创建订单
router.post('/createOrder', async(ctx) => {
  const { id, price, count } = ctx.request.body
  // console.log(id + " " + price + " " + count);
  const time = Date()
  const orderID = md5(Math.random() * 1000 + time).toString()
  // isAuthenticated 是否登录（登录拦截)
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请先登录!'
    }
  } else {
    // 异步，查询购物车，findOne：找到第一个就返回
    const findCart = await Cart.findOne({ cartNo: id })
    const order = new Order({
      id: orderID,
      count,
      total: price * count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs,
      status: 0
    })
    // 订单创建成功，入库
    try {
      const result = await order.save()
      // 如果入库正常，需要删除购物车，因为购物车是临时状态
      if (result) {
        await findCart.remove()
        ctx.body = {
          code: 0,
          //传过去 orderId 
          id: orderID
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1
      }
    }
  }
})

// 获取所有订单
router.post('/getOrders', async ctx => {
  // isAuthenticated 是否登录
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    // 容错处理
    try {
      // find 查询所有，可以加上分页逻辑进行优化，就是find().limit(15)，每页显示15条
      const result = await Order.find()
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})

export default router