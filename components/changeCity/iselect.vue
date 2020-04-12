<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data(){
    return {
      province:[],
      pvalue:'',
      city:[],
      cvalue:'',
      input:'',
      //全国城市列表
      cities:[]
    }
  },
  //监听pvalue值，当省份发生改变的时候，可选城市也要跟着改变（联动）
  watch:{
    pvalue:async function(newPvalue){
      let self=this;
      let {status,data:{city}}=await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city=city.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        self.cvalue=''
      }
    }
  },
  //当页面加载时候，同时请求省份数据
  mounted:async function(){
    let self=this;
    let {status,data:{province}}=await self.$axios.get('/geo/province')
    if(status===200){
      self.province=province.map(item=>{
        return {
          value:item.id,
          label:item.name
        }
      })
    }
  },
  methods:{
    // 加防抖；传入的第一个参数是要搜索的内容，
    // 第二个参数是回调（其参数是个对象数组，每一项的value值将显示在筛选框中/**
    //当用户输入的时候，延时处理
    querySearchAsync:_.debounce(async function(query,cb){
      let self=this;
      if(self.cities.length){
        //搜索与输入值相关的城市
        cb(self.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        let {status,data:{city}}=await self.$axios.get('/geo/city')
        if(status===200){
          self.cities=city.map(item=>{return {
            value:item.name
          }})
          cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          cb([])
        }
      }
    },300),
    // 搜索框和联动筛选公用的切换store中城市的方法，没有实现跳到首页功能
    handleSelect:function(param){
      //console.log(item.value);
      let city = ''
        if(typeof param === 'string'){
          city = this.city.filter(item=>item.value===param)[0].label
        }else{
          city = param.value
        }
        this.$store.dispatch('geo/setPosition',{
          city
        })
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
