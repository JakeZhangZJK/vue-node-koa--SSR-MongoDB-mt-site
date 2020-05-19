
### 主要业务

- 首页
- 登录/注册
- 产品列表
- 产品详情页展示
- 个人中心/购物车
- 订单

### 技术内容
- 使用 **nuxt.js** 和 **koa2**  两者之间做  **SSR**
- 数据和状态同步，使用 **Vuex**
- 前端使用最新版 **Vue 语法** 和 **Vue Cli**
- 后端使用 **node的koa2框架** ，对应的是 **redis** 和 **mongodb**
- 使用了数据对象模型管理工具 **mongoose**
- 页面整体采用饿了么 **element-ui** 框架构建页面，简洁，美观
- 数据真实，杜绝 **Mock** ，逼真流畅的体验

### 项目重点
| 1 |  2  | 3  |
|:--------:| :-------------:|:-------------:|
| 登录/注册 | 腾讯邮箱SMTP服务 |城市服务|
| 推荐服务 | 搜索服务 |地图服务|
| 购物车 |订单设计 | 组件复用设计|
|  接口设计 | 数据对象模型 |思维&技巧|




## 项目运行步骤

本项目提供开发时的源码，可以进行二次开发及优化，

① **Star** 本仓库，然后 **Fork** 到自己 github，下载代码到本地

```js
$ git clone git@github.com:JakeZhangZJK/vue-node-koa--SSR-MongoDB-mt-site.git
```

② 下载并配置好后端数据库文件，启动 MongoDB 和 Redis 服务（安装与配置教程自行百度）

③ 安装依赖并启动项目

```js
$ npm/cnpm install
$ npm/cnpm run dev

```

## 项目部分技术亮点
 ### 1、极简的dom节点实现复杂的表单/页面结构
 
 本项目中首页导航栏/主页菜单/城市服务页面/产品详情列表等每个复杂的页面dom节点几乎不超过10个，十分简洁，节约带宽。
 
![](https://user-gold-cdn.xitu.io/2020/5/19/1722ba3bb9467873?w=1189&h=866&f=png&s=389246)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722ba90ea6b14c8?w=1059&h=364&f=png&s=62889)

利用精简的几个dom节点就可实现复杂的表单页面。
 ### 2、注册模块
 
![](https://user-gold-cdn.xitu.io/2020/5/19/1722bb83feae16bf?w=1738&h=808&f=png&s=57243)
**后面补充。。。。。。。。。。。。。。**
### 3、登录模块
 
#### 1.登录业务流程
- 在登录页面输入用户名和密码
- 调用服务端接口进行验证
- 验证失败，返回错误信息告知用户；验证通过，根据后台的响应状态跳转到项目主页
- ![](https://user-gold-cdn.xitu.io/2020/4/4/171441804e32da7c?w=812&h=379&f=png&s=51296)

#### 2. 对密码加密
```javascript
self.$axios.post('/users/signin', {
   username : window.encodeURIComponent(self.username),
   password : CryptoJS.MD5(self.password).toString()
})
```
#### 3. 请求成功跳转到主页面

```javascript
 location.href="/" 
```
#### 4. 退出逻辑

退出(exit.vue)组件，采用**中间件**来实现退出操作。

点击`users/components/public/header/user.vue`文件中的退出后跳转到退出页`(page/exit.vue)`之后，自动的去执行退出操作所以利用`middleware`机制，触发这个获取退出的接口，让接口响应完之后，我们再做自动化的执行动作。
#### 5. 用户数据&状态

![](https://user-gold-cdn.xitu.io/2020/5/19/1722b5495cf7b605?w=898&h=305&f=png&s=28446)
浏览器发送一个 `request` 请求，根据 `cookie` ，服务器通过 `passport` 与 `redis`来验证当前是否是登录状态，返回 `username`。

 ### 3、城市服务



![](https://user-gold-cdn.xitu.io/2020/5/19/1722bbf727521a37?w=1550&h=851&f=png&s=114273)
![](https://user-gold-cdn.xitu.io/2020/5/19/1722b441512bc191?w=1398&h=461&f=png&s=223713)
城市定位实现原理：

浏览器在发出请求的时候，会有一个 `request` ，在服务器端可以拿到 `requset.ip`，然后就可以取数据中心作映射，根据 `ip` 来定位城市，服务器拿到 `city`后再下发给浏览器。

原本实现方式： 当页面渲染完了，向服务器发送请求，甚至可以发一个空内容，然后按照上述实现原理来获取 `city`。即在 **mounted** 事件之后，向服务器发送请求，然后服务器下发城市名称。（页面发送请求渲染，然后又异步请求获取城市名，共两次请求）

缺点：网络请求浪费，影响用户体验，异步获取的城市会 “闪” 一下。

项目实现方式：当浏览器去请求文档的时候，服务端 ip已经知道了，那个时候就可以拿到对应的城市，立即返回数据给浏览器。做法就是通过 `vuex` 来同步状态，然后通过 `SSR` 异步请求就能得到数据。


### 4、首页搜索模块
![](https://user-gold-cdn.xitu.io/2020/5/19/1722bbe031cca9b8?w=828&h=794&f=png&s=262232)
每输入一个字母都进行一次请求，显然浪费性能,因此引入`lodash`插件，使用`debounce`，函数防抖。

**后面再补充。。。。。。。。。。。。。。。。**

```js
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

### 5、产品详情模块

**产品列表页**


![](https://user-gold-cdn.xitu.io/2020/5/19/1722baaca64576a0?w=1534&h=818&f=png&s=416367)
**产品详情页**

![](https://user-gold-cdn.xitu.io/2020/5/19/1722baccf501acc3?w=1557&h=897&f=png&s=540247)
每一个列表对应着多个 `item` ，每个 `item` 与详情页是一对一关系，而上述两个页面路由是没有关联关系的。由于本项目没有 **产品库**，因此路由没有根据 `id`关联产品详情，依旧是根据搜索关键词 `keyword`。另外，产品列表页和产品详情页之间做了**登录拦截**。

接着，就是从产品详情页是跳转到购物车了

购物车页面如下图所示，可以看到，页面路由依旧是没有任何关联，但从下图地址栏可见，有一个重要的`id`属性。因为**产品详情页不能与购物车创建一对一映射关系**，即在进入产品详情页时，购物车页面是不存在的。当点击购买跳转到购物车时才会创建一个购物车。另外，产品详情页和购物车之间同样做了**登录拦截**。






### 6、购物车相关

父组件`pages/cart.vue`通过**asyncData**获取数据(接口：`/cart/getCart`)
传给子组件 `list.vue` 所有订单数据，由子组件全部渲染出来，通过`cartData`变量联系，如果我在子组件中更改了购买商品的数量，也就是cartData中的值被更改了，那么，我们在父组件监听的total(所有订单总价),也会重新计算

另外，购物车会创建一个订单，创建成功后才会跳转支付页面，但需考虑支付的是哪一个订单，于是支付和订单之间有一个依赖逻辑联系，但是支付和购物车之间是没有任何依赖的，虽然支付的动作是由购物车发起的，**但是购物车和支付之间的桥梁是订单**。

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bb10fd877f67?w=1314&h=279&f=png&s=17253)
### 7、订单中心

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bc43cdc4dec2?w=1511&h=530&f=png&s=127842)

## 页面全家福

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bc75de823cce?w=1574&h=798&f=png&s=1122957)


![](https://user-gold-cdn.xitu.io/2020/5/19/1722bc84af79f278?w=1587&h=780&f=png&s=474653)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bc8ef1e3348e?w=1585&h=875&f=png&s=1934564)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bca1cde55f55?w=1533&h=907&f=png&s=489335)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bcaa9fe8f571?w=1553&h=823&f=png&s=482520)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bd44ecec56b3?w=1540&h=896&f=png&s=540399)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bd585bb21a6a?w=1471&h=640&f=png&s=186765)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bcc334c49b0e?w=1364&h=795&f=png&s=51317)

![](https://user-gold-cdn.xitu.io/2020/5/19/1722bcb7083da763?w=1320&h=742&f=png&s=386867)

## 免责声明
本项目为仿做项目,仅做练手和学习使用,非官方网站,禁止用于商业目的,产生的一切侵权著作法律后果,与本作者无关。

转载使用请注明出处，谢谢！

Copyright (c) 2020 Jake Zhang

