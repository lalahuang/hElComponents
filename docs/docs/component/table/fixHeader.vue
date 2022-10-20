<!--
 * @Author: hzm
 * @Date: 2022-10-20 11:14:13
 * @Description: 固定表头
-->



<template>
    <div>
        <HTable :columns="columns" :data="data" :fix-header="fixHeader" >

        </HTable>
    </div>
</template>

<script setup lang="tsx">
import { HTable } from "h-components-next";
import { defineTableColumns } from "h-components-next/hTable";
import { FixHeader } from '../../../../packages/components/hTable/src/types';

interface DataType {
    date: string,
    name: string
    address: number,
}
const fixHeader:FixHeader = {
    top: 73,
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
            fixed:"right"
        },
        {
            label: "名称",
            prop: "name",
            fixed:"left"
        },
    ]
)
</script>