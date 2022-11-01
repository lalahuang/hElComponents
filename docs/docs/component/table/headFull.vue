<!--
 * @Author: hzm
 * @Date: 2022-10-31 13:58:30
 * @Description: 
-->
<template>
    <div style="height: 300px;display: flex; flex-direction: column;">
        <div>
            ceshiceshiceshiceshiceshi
        </div>

<HTable :columns="columns" :data="data" :total="4" v-model:page-size="pageSize" v-model:current-page="limit"
@load="loadData" height="100%">
</HTable>
       
        <!-- <el-dialog
            title="测试高度"
            v-model="diaopen"
            width="30%"
            >
           
              
            <template #footer>
            <span>
                <el-button type="primary" @click="">OK</el-button>
            </span>
            </template>
        </el-dialog> -->
        
        
    </div>
</template>

<script setup lang="tsx">
import { HTable } from "h-components-next";
import { defineTableColumns } from "h-components-next/hTable";
import { ref } from "vue";
const diaopen = ref(true)
const pageSize = ref(1)
const limit = ref(1)
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

    ]
)

const loadData = () => {
    console.log('loadData: ', "数据加载成功");

}
</script>
<style >

</style>