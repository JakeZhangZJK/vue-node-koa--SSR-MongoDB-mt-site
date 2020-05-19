<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="/my">我的美团</nuxt-link>
        <dl>
          <dd>
            <nuxt-link to="/order">我的订单</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">我的收藏</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">抵用券</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">账户设置</nuxt-link>
          </dd>
        </dl>
      </li>
      <li>
        <nuxt-link to="https://i.meituan.com/mobile/down/meituan">手机APP</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
          <dd>
            <nuxt-link to="/userCenter">登录商家中心</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/coop">我想合作</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/wap">免费手机开店</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/kaipiao">商家申请链开票</nuxt-link>
          </dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
        <div class="subContainer">
          <dl class="hotel">
            <dt>酒店旅游</dt>
            <dd v-for="item in hotel " :key="item">{{item}}</dd>
          </dl>
          <dl class="food">
            <dt>吃美食</dt>
            <dd v-for="item in food " :key="item">{{item}}</dd>
          </dl>
          <dl class="movie">
            <dt>看电影</dt>
            <dd v-for="item in movie " :key="item">{{item}}</dd>
          </dl>
          <dl class="app">
            <dt>手机应用</dt>
            <dd v-for="item in app" :key="item.alt">
              <a href="#">
                <img :src="item.src" :alt="item.alt" />
              </a>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotel: [
        "国际机票",
        "火车票",
        "民宿",
        "经济型酒店",
        "主题酒店",
        "商务酒店",
        "公寓",
        "豪华酒店",
        "客栈",
        "青年旅社",
        "度假酒店",
        "别墅",
        "农家院"
      ],
      food: ["烤鱼", "特色小吃", "烧烤", "自助餐", "火锅", "代金券"],
      movie: [
        "热映电影",
        "热门影院",
        "热映电影口碑榜",
        "国内票房榜",
        "最受期待电影",
        "北美票房榜",
        "电影排行榜"
      ],
      app: [
        {
          alt: "美团app",
          src:
            "//s0.meituan.net/bs/fe-web-meituan/2d53095/img/appicons/meituan.png"
        },
        {
          alt: "外卖app",
          src:
            "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/waimai.png"
        },
        {
          alt: "民宿app",
          src:
            "https://p0.meituan.net/travelcube/162c3308d9622f6d9cfaa49e60be4dca8573.png"
        },
        {
          alt: "点评app",
          src:
            "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/dianping.png"
        },
        {
          alt: "猫眼app",
          src:
            "//s1.meituan.net/bs/fe-web-meituan/404d350/img/appicons/maoyan.png"
        }
      ]
    };
  },
  methods: {}
};
</script>
</script>
<style lang='scss'>
</style>
