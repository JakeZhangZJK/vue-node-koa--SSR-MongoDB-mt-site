<template>
  <div class="">
    <dl class="m-category">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-'+item">{{item}}</a>
        <!--       哈希做跳转链接-->
<!--        注意href前面的‘:’-->
      </dd>
    </dl>
    <dl v-for="item in block"
        :key="item.title" class="m-category-section">
      <dt :id="'city-'+item.title">{{item.title}}</dt>
      <dd>
          <span v-for="c in item.city" :key="c" @click="changeTheCity(c)"> {{c}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  import pyjs from 'js-pinyin'
  export default {
    data() {
      return {
        list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        block: []
      }
    },
    async mounted() {
      let self = this
      let blocks = []
      let {status, data: {city}} = await self.$axios.get('/geo/city')
      if (status === 200) {
        let p
        let c
        let d={}
        city.forEach(item=>{
          p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
          c=p.charCodeAt(0)
          if(c>96&&c<123){
            if(!d[p]){
              d[p]=[]
            }
            d[p].push(item.name)
          }
        })
        for(let [k,v] of Object.entries(d)){
          blocks.push({
            title:k.toUpperCase(),
            city:v
          })
        }
        blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block=blocks
      }
    },
     methods:{
    changeTheCity: function(val){
      //console.log(val)
      let that=this;
      //self.$store.state.geo.position.city=val
      that.$store.dispatch('geo/setPosition',{
          city:val
      })
      that.$router.push({
        path: '/'
      })
    }
  }
  }
</script>

<style scoped lang="scss">
  @import "@/assets/css/changeCity/category.scss";
</style>
