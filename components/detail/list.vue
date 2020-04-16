<template>
    <div class="m-detail-list">
        <ul>
            <li>{{list.filter(item=>item.photos.length).length}}款套餐</li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array,
            default:()=>{
                return 
            }
        }
    }
}

</script>
<style lang='scss'>
    
</style>