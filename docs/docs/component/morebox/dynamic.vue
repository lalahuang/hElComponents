<!--
 * @Author: hzm
 * @Date: 2022-10-21 14:44:40
 * @Description: 
-->
<template>
    <div>
        <h-more-box>
            <el-link type="primary" v-for="item in lazyData" :underline="false" href="" target="_blank">{{item}}</el-link>
            <el-link type="primary"  :underline="false" href="" target="_blank">5</el-link>
            <el-link type="primary"  :underline="false" href="" target="_blank">6</el-link>
            <el-link type="primary"  :underline="false" href="" target="_blank">7</el-link>
        </h-more-box>
    </div>
</template>

<script setup lang="ts">
import HMoreBox from '../../../../packages/components/hMoreBox';
import { ref } from 'vue';

const lazyData = ref<number[]>([]);

setTimeout(() => {
    lazyData.value = [1, 2, 3, 4]
},3000)
</script>

<style scoped>

</style>