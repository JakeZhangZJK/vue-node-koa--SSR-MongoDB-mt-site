<template>
  <div class="page-cart">
    <el-row>
      <el-col
        v-if="1 ||cart.length"
        :span="24"
        class="m-cart">
        <list/>
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
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/cart/index.scss";
</style>
