<!--
 * @Author: hzm
 * @Date: 2022-10-18 16:48:00
 * @Description: 
-->
<!--
 * @Author: hzm
 * @Date: 2022-10-18 16:38:14
 * @Description: 
-->
<template>
    <div>
        <HTable :columns="columns" :data="data">

        </HTable>
    </div>
</template>

<script setup lang="tsx">
import { HTable } from "h-components-next";
import { defineTableColumns } from "h-components-next/hTable";
import { ref } from "vue";

interface DataType {
    date: string,
    name: string
    address: number,
    status?: number,
}
const data = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: 0,
    },
]

const optionref = ref([]);
setTimeout(() => {
    optionref.value = [
        {
            label: "正常",
            value: 0,
            dictType: "hTag",
            elTagType: "primary"
        }
    ]
},3000)
const columns = defineTableColumns<DataType>(
    [
        {
            label: "时间",
            prop: "date",

        },
        {
            label: "名称",
            prop: "name",

        },
        {
            label: "地址",
            prop: "address",
            
        },
        {
            label: "状态",
            prop: "status",
            columnType: "dict",
            options: {
                list: optionref,
            },
        },
    ]
)
</script>