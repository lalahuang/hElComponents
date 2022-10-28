<!--
 * @Author: hzm
 * @Date: 2022-10-19 08:32:40
 * @Description: 
-->
<template>
    <div>
        <HTable :columns="columns" :showSettingIcon="false" :data="lazyData" :total="query.total" v-model:pageSize="query.size" @load="renderData" v-model:currentPage="query.page">
            <template #menuName="scoped">
                <el-link type="primary" target="_blank" v-for="item in scoped.row.menus" > {{item}} </el-link>
                <!-- <el-link type="primary" target="_blank"  > cess{{scoped.row.date}} </el-link>
                 -->
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

const lazyData = ref<DataType[]>([])
setTimeout(() => {
     renderData()
}, 1000)
const query = ref({
    page: 1,
    size: 10,
    total:20
})

function renderData() {
    lazyData.value= Array.from({ length: 1 }).map(item => {
        /**生成随机菜单 */
        const length = Math.floor(Math.random() * (5 - 3)) + 3;
        return {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
            menus: Array.from({ length }, v => `菜单${Math.floor(Math.random() * (10 - 1)) + 1}`) ,
        };
    });
    console.log('lazyData.valu: ', lazyData.value);
}



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
        //     render: ({ row }) => { 
        //         const loopItem = row.menus.map(item => (<el-link type="primary" target="_blank"  >render{item}</el-link>))
        //         return (
        //             <>
        //                 <el-link type="primary" target="_blank" > 增加 </el-link>
        //                 <el-link type="primary" target="_blank" > 修改 </el-link>
        //                 <el-link type="primary" target="_blank" > 查看 </el-link>
        //                 <el-link type="primary" target="_blank" > 删除 </el-link>
        //                 <el-link type="primary" target="_blank" > 其他操作 </el-link>
        //                 {loopItem}
        //             </>
        //         )
        //     } 
        // },
        {
            label: "操作-slotName",
            columnType: "menu",
            width: "150px",
            slotName:"menuName"
            
        }
    ]
)
</script>