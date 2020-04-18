## Vue全家桶+SSR+Koa2 全栈开发仿美团网
☀☀☀

**项目地址：** <a href="https://github.com/Chocolate1999/Vue-family-bucket-SSR-Koa2-full-stack-development-from-Meituan">https://github.com/Chocolate1999/Vue-family-bucket-SSR-Koa2-full-stack-development-from-Meituan</a>

**学习地址：**<a href="https://coding.imooc.com/class/280.html#Envir">传送门</a>

<!-- TOC -->

- [Vue全家桶+SSR+Koa2 全栈开发仿美团网](#vue全家桶ssrkoa2-全栈开发仿美团网)
- [项目介绍](#项目介绍)
    - [主要业务](#主要业务)
    - [技术内容](#技术内容)
    - [项目重点](#项目重点)
- [项目笔记](#项目笔记)
- [项目运行步骤](#项目运行步骤)
- [项目部分技术亮点](#项目部分技术亮点)
- [项目成果展示](#项目成果展示)
- [排版](#排版)
- [结尾](#结尾)

<!-- /TOC -->

## 项目介绍

融汇 **前端+服务端** 全栈项目，提供后端数据接口，源码开放，可进行二次开发与优化。

### 主要业务

- 首页
- 登录/注册
- 产品列表
- 产品详情
- 购物车
- 订单

### 技术内容
- 使用 **nuxt.js** 和 **koa2**  两者之间做  **SSR**
- 数据和状态同步，使用 **Vuex**
- 前端使用最新版 **Vue 语法** 和 **Vue Cli**
- 后端使用 **koa2** ，对应的是 **redis** 和 **mongodb**
- 使用了数据对象模型管理工具 **mongoose**
- 采用饿了么 **element-ui** 框架构建页面，简洁，美观
- 数据真实，杜绝 **Mock** ，逼真体验

### 项目重点
| Column 1 | Column 2      | Column 3  |
|:--------:| :-------------:|:-------------:|
| 登录/注册 | SMTP服务 |城市服务|
| 推荐服务 | 搜索服务 |地图服务|
| 购物车 |订单设计 | 组件复用设计|
|  接口设计 | 数据对象模型 |思维&技巧|

## 项目笔记

<a href="https://blog.csdn.net/weixin_42429718/article/details/105466115">【Vue全家桶+SSR+Koa2全栈开发】（一）Vue基础</a>

<a href="https://blog.csdn.net/weixin_42429718/article/details/105504843">【Vue全家桶+SSR+Koa2全栈开发】（二）Vuex基础</a>

<a href="https://blog.csdn.net/weixin_42429718/article/details/105504891">【Vue全家桶+SSR+Koa2全栈开发】（三）Koa2基础</a>

<a href="https://blog.csdn.net/weixin_42429718/article/details/105504951">【Vue全家桶+SSR+Koa2全栈开发】（四）mongoose基础</a>

<a href="https://blog.csdn.net/weixin_42429718/article/details/105505026">【Vue全家桶+SSR+Koa2全栈开发】（五） Redis基础</a>

<a href="https://blog.csdn.net/weixin_42429718/article/details/105505070">【Vue全家桶+SSR+Koa2全栈开发】（六） Nuxt.js基础</a>

<a href="https://blog.csdn.net/weixin_42429718/article/details/105505128">【Vue全家桶+SSR+Koa2全栈开发】（七） 项目搭建与配置</a>

<a href="https://blog.csdn.net/weixin_42429718/article/details/105326187">【Vue全家桶+SSR+Koa2全栈开发】学习笔记整合 （全）</a>


## 项目运行步骤

本项目提供开发时的源码，可以进行二次开发及优化，欢迎 contributor 参与！

① **Star** 本仓库，然后 **Fork** 到自己 github，下载代码到本地

```java
# install dependencies
$ npm run install
```

② 配置后端数据库文件，启动 MongoDB 和 Redis 服务（详情请见上文笔记）

③ 二次开发运行

```javascript
npm run dev
```

## 项目部分技术亮点

 **1、城市服务组件**

![](https://img-blog.csdnimg.cn/20200418113834793.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
城市定位实现原理：

浏览器在发出请求的时候，会有一个 `request` ，在服务器端可以拿到 `requset.ip`，然后就可以取数据中心作映射，根据 `ip` 来定位城市，服务器拿到 `city`后再下发给浏览器。

原本实现方式： 当页面渲染完了，向服务器发送请求，甚至可以发一个空内容，然后按照上述实现原理来获取 `city`。即在 **mounted** 事件之后，向服务器发送请求，然后服务器下发城市名称。（页面发送请求渲染，然后又异步请求获取城市名，共两次请求）

缺点：网络请求浪费，影响用户体验，异步获取的城市会 “闪” 一下。

项目实现方式：当浏览器去请求文档的时候，服务端 ip已经知道了，那个时候就可以拿到对应的城市，立即返回数据给浏览器。做法就是通过 `vuex` 来同步状态，然后通过 `SSR` 异步请求就能得到数据。

**2、用户数据&状态**
![](https://img-blog.csdnimg.cn/20200418120527347.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
浏览器发送一个 `request` 请求，根据 `cookie` ，服务器通过 `passport` 与 `redis`来验证当前是否是登录状态，返回 `username`。

**3、产品详情页开发**

本项目**产品列表页**（如下图所示）

![](https://img-blog.csdnimg.cn/20200418134724755.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
**产品详情页**（如下图所示）
![](https://img-blog.csdnimg.cn/20200418134741635.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
每一个列表对应着多个 `item` ，每个 `item` 与详情页是一对一关系，而上述两个页面路由是没有关联关系的。特此说明：本项目没有 **产品库**，因此路由没有根据 `id`来，依旧是根据搜索关键词 `keyword`。另外，产品列表页和产品详情页之间做了**登录拦截**。

接着，关于产品详情页是如何跳转到购物车的呢？

购物车页面如下图所示，可以看到，页面路由依旧是没有任何关联，但从下图地址栏可见，有一个重要的`id`属性。因为**产品详情页不能与购物车创建一对一映射关系**，即在进入产品详情页时，购物车页面是不存在的。当点击购买跳转到购物车时才会创建一个购物车。另外，产品详情页和购物车之间做了**登录拦截**。
![](https://img-blog.csdnimg.cn/2020041813563379.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)

**4、登录逻辑**

1. 将登录页面用户输入的username和password作为参数，请求接口`/users/signin`
2. 对密码加密
```javascript
self.$axios.post('/users/signin', {
   username : window.encodeURIComponent(self.username),
   password : CryptoJS.MD5(self.password).toString()
})
```
3. 请求成功跳转到主页面

```javascript
 location.href="/" 
```

**5、退出逻辑**

退出(exit.vue)组件，采用**中间件**来实现退出操作。

点击`users/components/public/header/user.vue`文件中的退出后跳转到退出页`(page/exit.vue)`之后，自动的去执行退出操作所以利用`middleware`机制，触发这个获取退出的接口，让接口响应完之后，我们再做自动化的执行动作

**6、搜索相关**

每输入一个字母都进行一次请求，显然浪费性能,因此引入`lodash`插件，使用`debounce`，函数防抖。

```javascript
import _ from 'lodash'
input:_.debounce(async function(){
      let self=this;
      let city=self.$store.state.geo.position.city.replace('市','')
      self.searchList=[]
      let {status,data:{top}}=await self.$axios.get('/search/top',{
        params:{
          input:self.search,
          city
        }
      })
      self.searchList=top.slice(0,10)
    },300)
```

<a href="https://segmentfault.com/a/1190000015312430">参考：由浅入深学习lodash的debounce函数</a>


**7、购物车相关**

父组件`pages/cart.vue`通过**asyncData**获取数据(接口：`/cart/getCart`)
传给子组件 `list.vue` 所有订单数据，由子组件全部渲染出来，通过`cartData`变量联系，如果我在子组件中更改了购买商品的数量，也就是cartData中的值被更改了，那么，我们在父组件监听的total(所有订单总价),也会重新计算

另外，购物车会创建一个订单，创建成功后才会跳转支付页面，但需考虑支付的是哪一个订单，于是支付和订单之间有一个依赖逻辑联系，但是支付和购物车之间是没有任何依赖的，虽然支付的动作是由购物车发起的，**但是购物车和支付之间的桥梁是订单**。

## 项目成果展示
项目部分截图如下文所示：

![](https://img-blog.csdnimg.cn/20200418110401586.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200418110421468.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200418110447173.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200418110241441.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20200418110305546.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200418110324961.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)
![](https://img-blog.csdnimg.cn/20200418110339348.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjQyOTcxOA==,size_16,color_FFFFFF,t_70)

## 排版

笔记内容按照 <a href="https://mazhuang.org/wiki/chinese-copywriting-guidelines/"> 中文文案排版指北 </a> 进行排版。

## 结尾

欢迎关注微信公众号：小狮子前端Vue

谢谢您的支持！✿✿ヽ(°▽°)ノ✿

注：本仓库不参与商业行为，也请各位读者周知。(This warehouse is not involved in commercial activities.)

转载使用请注明出处，谢谢！