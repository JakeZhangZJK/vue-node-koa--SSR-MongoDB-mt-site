<template>
  <div class="page-cart">
    <el-row>
      <el-col
        v-if="1||cart.length"
        :span="24"
        class="m-cart">
        <list/>
        <p>
          应付金额：<em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button
            type="primary"
            @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col
        v-else
        class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
import List from '@/components/cart/list.vue'
export default {
  components:{
    List
  },
  data(){
    return {
      cart:[]
    }
  },
  //计算total
  computed:{
    total(){
      let total=0;
      this.cart.forEach(item=>{
        total+=item.price*item.count
      })
      return total
    }
  },
  methods:{
      submit:function(){
          
      }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
