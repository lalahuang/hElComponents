<!--
 * @Author: hzm
 * @Date: 2022-10-27 15:47:58
 * @Description: 
-->
<template>
    <div>
        <HQueryForm   >
            <ElFormItem label="123">
                <el-input placeholder="123" size="normal" clearable></el-input>
            </ElFormItem>
            <ElFormItem label="4">
                <el-input placeholder="1234" size="normal" clearable></el-input>
            </ElFormItem>
            <ElFormItem label="4">
                <el-input placeholder="1234" size="normal" clearable></el-input>
            </ElFormItem>
            <ElFormItem label="4">
                <el-input placeholder="1234" size="normal" clearable></el-input>
            </ElFormItem>
            <template #handleArea>
                <el-button type="primary" size="default" >搜锁</el-button>
                <el-button type="primary" size="default" >重置</el-button>
            </template>
        </HQueryForm >

    </div>
</template>

<script setup lang="ts">

import { HQueryForm } from 'h-components-next';
</script>

<style scoped>

</style>