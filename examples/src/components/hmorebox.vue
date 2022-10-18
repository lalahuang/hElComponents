<!--
 * @Author: hzm
 * @Date: 2022-10-13 16:41:31
 * @Description: 
-->
<template>
    <div>
        <HMoreBox :show-number="0">
            <el-link type="primary"  target="_blank">测试按钮1</el-link>
            <el-link type="danger"  target="_blank">测试按钮2</el-link>
            <el-link type="warning"  target="_blank">测试按钮3</el-link>
            <el-link type="info"  target="_blank">测试按钮4</el-link>
            <el-link type="success"  target="_blank">测试按钮5</el-link>
        </HMoreBox>
    </div>
</template>

<script setup lang="ts">
import { HMoreBox } from "h-components-next";
</script>

<style scoped>

</style>