<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <a href="/"><img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团"></a>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input @input="input" @focus="focus" @blur="blur"   v-model="search" placeholder="搜索商家或地点" />
          <button class="el-button el-button--primary"><i class="el-icon-search" /></button>
          <dl v-if="isHotPlace"   class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx" >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
          <dl v-if="isSearchList"  class="searchList">
            <dd v-for="(item,idx) in searchList" :key="idx" >
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{item.name}}</a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a v-for="(item,idx) in $store.state.home.hotPlace.slice(0,5)" :key="idx" :href="'/products?keyword='+encodeURIComponent(item.name)">{{item .name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="http://waimai.meituan.com" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="maoyan.com" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="//hotel.meituan.com" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="gongyi">美团公益</nuxt-link>
          </li>
        </ul>
      </el-col>
    
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    data() {
      return {
        search: '',
        isFocus: false,
        hotPlace: [],
        searchList: [],
        hotPlaceList: []
      }
    },
    // 重写的获取热门景点，但已经有使用过vuex，
    async mounted() {
      let that = this;
      let {
        status,
        data: {
          result
        }
      } = await that.$axios.get('search/hotPlace', {
        params: {
          city: that.$store.state.geo.position.city.replace('市', '')
        }
      })
      //console.log(that.hotPlaceList);

      if (status === 200) {
        that.hotPlaceList = result.slice(0, 5)
      } else {
        console.log("error!!!");
      }
    },
    computed: {
      isHotPlace: function () {
        return this.isFocus && !this.search
      },
      isSearchList: function () {
        return this.isFocus && this.search
      }
    },
    methods: {
      focus: function () {
        this.isFocus = true
      },
      blur: function () {
        let self = this;
        setTimeout(function () {
          self.isFocus = false
        }, 200)
      },

      input: _.debounce(async function () {// 延时函数
        let self = this;
        let city = self.$store.state.geo.position.city.replace('市', '')
        self.searchList = []
        let {
          status,
          data: {
            top
          }
        } = await self.$axios.get('/search/top', {
          params: {
            input: self.search,
            city
          }
        })
        self.searchList = top.slice(0, 15)
      }, 300)
    }
  }

</script>

<style lang="css">
</style>
