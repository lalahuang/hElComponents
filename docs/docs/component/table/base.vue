<template>
    <div>
        <HTable  border :columns="columns" :data="data" line-space="big" >

        </HTable>
    </div>
</template>

<script setup lang="tsx">
import { HTable, defineTableColumns } from "h-components-next";

interface DataType {
    date: string,
    name: string
    address: number,
}
const data = [
    {
        date: '2016-05-03',
        name: 0,
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
            
        },
    ]
)
</script>