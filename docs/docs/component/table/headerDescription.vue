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
import { HTable, defineTableColumns } from "h-components-next";

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
            headerDescription:"这是地址字段"
        },
        
    ]
)
</script>