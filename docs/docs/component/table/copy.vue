<!--
 * @Author: hzm
 * @Date: 2022-10-18 13:22:42
 * @Description: 
-->
<template>
    <div>
        <HTable :columns="columns" :data="data">
        </HTable>
    </div>
</template>

<script setup lang="tsx">
import HTable, { defineTableColumns } from '../../../../packages/components/hTable';

interface DataType {
    date: string,
    title: string
    status: number,
    compxObj: {
        obj: string,
        obj1: string
    },

}
const data = [
    {
        date: 123,
        title: "132",
        status: 0,
        compxObj: {
            obj: "复杂对象1",
            obj1: "复杂对象2"
        },
    }
]
const columns = defineTableColumns<DataType>(
    [
        {
            label: "复制测试",
            prop: "compxObj.obj",
            columnType:'copy'
        },
     
    ]
)
</script>

<style scoped>

</style>