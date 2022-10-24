<!--
 * @Author: hzm
 * @Date: 2022-10-19 08:32:40
 * @Description: 
-->
<template>
    <div>
        <HTable :columns="columns" :data="lazyData">
            <template #menuName="scoped">
                <el-link type="primary" target="_blank" v-for="item in scoped.row.menus" > 增加{{scoped.row.date}} </el-link>
                <el-link type="primary" target="_blank"  > cess{{scoped.row.date}} </el-link>
                
            </template>
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
    menus:[],
}
const data = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        menus: [1,2,3,4],
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        menus: [1, 2, 3, 4],
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        menus: [1, 2, 3, 4],
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        menus: [1, 2, 3, 4],
    },
];
const lazyData = ref<DataType[]>([])
setTimeout(() => {
    lazyData.value=data
},5000)



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
            label: "操作",
            columnType: "menu",
            width: "150px",
            render: ({ row }) => { 
                const loopItem = row.menus.map(item => (<el-link type="primary" target="_blank"  >render{item}</el-link>))
                return (
                    <>
                        <el-link type="primary" target="_blank" > 增加 </el-link>
                        <el-link type="primary" target="_blank" > 修改 </el-link>
                        <el-link type="primary" target="_blank" > 查看 </el-link>
                        <el-link type="primary" target="_blank" > 删除 </el-link>
                        <el-link type="primary" target="_blank" > 其他操作 </el-link>
                        {loopItem}
                    </>
                )
            } 
        },
        {
            label: "操作-slotName",
            columnType: "menu",
            width: "150px",
            slotName:"menuName"
            
        }
    ]
)
</script>