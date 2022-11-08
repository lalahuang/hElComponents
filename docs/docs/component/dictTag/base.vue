<!--
 * @Author: hzm
 * @Date: 2022-11-08 11:57:37
 * @Description: 
-->
<template>
    <div>
        <HDictTag :options="options" :value="data[0]"></HDictTag>
        <HDictTag :options="options" :value="data[1]"></HDictTag>
        <HDictTag :options="options" :value="data[2]"></HDictTag>
        <HDictTag :options="options" :value="[1,2]"></HDictTag>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HDictTag } from '../../../../packages/components';
import { DictTagOptions } from '../../../../packages/components/hDictTag';
const options = ref<DictTagOptions>([
    {
        label: "状态1",
        value: 1,
        elTagType: "primary",
        dictType: "elTag"
    },
    {
        label: "状态2",
        value: 2,
        elTagType: "danger",
        dictType: "elTag"
    },
    {
        label: "状态3",
        value: 3,
    }
])
const data =[1,2,3];


</script>

<style scoped>

</style>