<!--
 * @Author: hzm
 * @Date: 2022-10-18 16:31:46
 * @Description: 
-->
<template>
    <div>
        <HTable :columns="columns" :data="data">
            <template #dateSlot="scoped">
               我是slotName渲染的 {{scoped.row.date}}
            </template>
        </HTable>
    </div>
</template>

<script setup lang="tsx">
import HTable, { defineTableColumns } from '../../../../packages/components/hTable';

interface DataType {
    date: string,
    name: string
    address: number,
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
    },
]
const columns = defineTableColumns<DataType>(
    [
        {
            label: "时间",
            prop: "date",
            slotName:"dateSlot"
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