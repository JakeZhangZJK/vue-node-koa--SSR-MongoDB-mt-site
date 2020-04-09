<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <my-header/> 
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer height="100%">
      <my-footer/>
    </el-footer>
  </el-container>
</template>

<script>
  import myHeader from '@/components/public/header/index.vue'
  import myFooter from '@/components/public/footer/index.vue'
  export default {
    components:{
      myHeader,
      myFooter
    }
  }
</script>
