<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col :span="3" class="left">
                <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
            </el-col>
            <el-col :span="15" class="center">
                <div class="wrapper">
                    <el-input v-model="search"
                     @focus="focus" 
                     @blur="blur"
                     @input="input"
                     placeholder="搜索商家或地点"/>
                    <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt>热门搜索</dt>
                        <dd v-for="(item,idx) in hotPlace" :key="idx">{{ item }}</dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd v-for="(item,idx) in searchList" :key="idx">{{ item }}</dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                    <a href="#">故宫博物院</a>
                </p>
                <ul class="nav">
                    <li>
                        <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/" class="business">商家入驻</nuxt-link>
                    </li>
                </ul>
            </el-col>
            <el-col :span="6" class="right">
                <ul class="security">
                    <li><i class="refund"/><p class="txt">随时退</p></li>
                    <li><i class="single"/><p class="txt">不满意免单</p></li>
                    <li><i class="overdue"/><p class="txt">过期退</p></li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            search:'',
            isFocus:false,
            hotPlace:['火锅','火锅','火锅'],
            searchList:['小吃','故宫','故宫']
        }
    },
    computed:{
        isHotPlace:function(){
            return this.isFocus&&!this.search
        },
        isSearchList:function(){
            return this.isFocus&&this.search
        }
    },
    methods:{
        focus:function(){
            this.isFocus=true
        },
        blur:function(){
            //this.isFocus=false
            let self=this;
            setTimeout(function(){
                self.isFocus=false
            },200)
        },
        input:function(){
            console.log(1)
        }
    }
}

</script>
<style lang='scss' >
    @import "@/assets/css/public/header/search.scss";
</style>