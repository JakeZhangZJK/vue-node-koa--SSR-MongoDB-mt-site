<template>
  <div class="m-geo">
    <!-- store是vuex实例，state获取状态的，geo模块名称，position模块下的变量 -->
    <i class="el-icon-location"/>{{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    <!--[香河 廊坊 天津]-->
    <!--热门：{{hotPlaceList}}-->
    <span class="area">  [香河 廊坊 天津]</span>
 
  </div>
</template>

<script>
export default {
  data(){
    return{
      hotPlaceList:[]
    }
  },
  mounted() {
   this.getPosition()
  },
  methods:{
   async getPosition(){
       let {status,data:{result}}=await this.$axios.get('/search/hotPlace',{
      params:{
        city:this.$store.state.geo.position.city
      }
    })
    if(status===200&&result){
      this.hotPlaceList=result.slice(0,3);
      //console.log(this.hotPlaceList)
      if(this.hotPlaceList.length===0) this.hotPlaceList.name="该地区暂未发现";
    }else{
      //console.log(`请求失败`+this.hotPlaceList)
      this.hotPlaceList.name="该地区暂未发现";
    }
    }
  }
}
</script>

<style lang="css">
</style>
