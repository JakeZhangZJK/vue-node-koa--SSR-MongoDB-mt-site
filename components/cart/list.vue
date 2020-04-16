<template>
  <el-table
    :data="cartData"
    style="width: 980px">
    <el-table-column
      prop="name"
      label="项目"
      width="532"/>
    <el-table-column
      prop="price"
      label="单价"
      width="132"/>
      <!-- 去掉prop="count" 用scope动态变化 -->
    <el-table-column
      label="数量"
      width="212">
      <template slot-scope="scope">
        <el-input-number
          v-model="scope.row.count"
          :min="0"/>
      </template>
    </el-table-column>
    <el-table-column
      label="总价">
      <template slot-scope="scope">
        <div>
          {{ scope.row.price*scope.row.count }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props:{
    cartData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  }
}
</script>
