<!--
 * @Author: hzm
 * @Date: 2022-10-27 15:47:58
 * @Description: 
-->
<template>
    <div>
        <HQueryForm  ref="formRef" :model="model"  >
            <ElFormItem label="123" prop="name">
                <el-input placeholder="123" size="normal"  v-model="model.name"  clearable></el-input>
            </ElFormItem>
            <ElFormItem label="123" prop="name1">
                <el-input placeholder="123" size="normal" v-model="model.name1" clearable></el-input>
            </ElFormItem>
            <ElFormItem label="123" prop="name2">
                <el-input placeholder="123" size="normal" v-model="model.name2" clearable></el-input>
            </ElFormItem>
            <ElFormItem label="123" prop="name3">
                <el-input placeholder="123" size="normal" v-model="model.name3" clearable></el-input>
            </ElFormItem>
            <ElFormItem label="123" prop="name4">
                <el-input placeholder="123" size="normal" v-model="model.name4" clearable></el-input>
            </ElFormItem>
            
            <template #handleArea>
                <el-button type="primary" size="default" >搜锁</el-button>
                <el-button type="primary" size="default" @click="resetForm"  >重置</el-button>
            </template>
        </HQueryForm >

    </div>
</template>

<script setup lang="ts">

// import { HQueryForm } from 'h-components-next';
import HQueryForm from '../../../../packages/components/hQueryForm';
import { ElButton, ElFormItem, ElInput, FormInstance } from 'element-plus';
import { ref } from 'vue';
const formRef = ref<FormInstance>();
const model = ref({
    name:undefined,
    name1:undefined,
    name2:undefined,
    name3:undefined,
    name4:undefined,
})
function resetForm() {
    formRef.value?.resetFields();
}


</script>

<style scoped>

</style>