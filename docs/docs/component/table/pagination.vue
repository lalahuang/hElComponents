<!--
 * @Author: hzm
 * @Date: 2022-10-19 08:32:40
 * @Description: 
-->
<template>
    <div>
        <HTable :columns="columns" :data="data" :total="4" v-model:page-size="pageSize"  v-model:current-page="limit" @load="loadData"    >
            <template #leftHandleArea>
                <el-button type="primary" size="default" @click="">按钮1</el-button>
                <el-button type="primary" size="default" @click="">按钮2</el-button>
                <el-link type="primary" :underline="false" href="" target="_blank">文档1</el-link>
            
            </template>
            <template #handleArea>
                <el-button type="primary" size="default" @click="">按钮1</el-button>
                <el-button type="primary" size="default" @click="">按钮2</el-button>
                <el-link type="primary" :underline="false" href="" target="_blank">文档1</el-link>
                
            </template>
        </HTable>
    </div>
</template>

<script setup lang="tsx">
import { HTable } from "h-components-next";
import { defineTableColumns } from "h-components-next/hTable";
import { ref } from "vue";

const pageSize=ref(1)
const limit=ref(1)
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
    // {
    //     date: '2016-05-04',
    //     name: 'Tom',
    //     address: 'No. 189, Grove St, Los Angeles',
    // },
    // {
    //     date: '2016-05-01',
    //     name: 'Tom',
    //     address: 'No. 189, Grove St, Los Angeles',
    // },
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
        // {
        //     label: "操作",
        //     columnType: "menu",
        //     width: "150px",
        //     render: () => (
        //         <>
        //             <el-link type="primary" target="_blank" > 增加 </el-link>
        //             <el-link type="primary" target="_blank" > 修改 </el-link>
        //             <el-link type="primary" target="_blank" > 查看 </el-link>
        //             <el-link type="primary" target="_blank" > 删除 </el-link>
        //             <el-link type="primary" target="_blank" > 其他操作 </el-link>
        //         </>
        //     )
        // }
    ]
)

const  loadData=()=> {
    console.log('loadData: ', "数据加载成功");
    
}
</script>