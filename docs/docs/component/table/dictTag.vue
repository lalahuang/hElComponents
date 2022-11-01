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
        <HTable :loading="loading" :columns="columns"  :data="lazyData" :total="query.total" v-model:pageSize="query.size" @load="renderData" v-model:currentPage="query.page" >

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
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '1'
    },
    {
        date: '2016-05-012',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '0',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '2',
    },

]
const data2 = [

    {
        date: '2016-05-042',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '1'
    },
    {
        date: '2016-05-012',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '2',
    },
    {
        date: '2016-05-012',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '0',
    },
    {
        date: '2016-05-042',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '1'
    },
    {
        date: '2016-05-012',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '2',
    },
    {
        date: '2016-05-012',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        status: '10',
    },
]

const loading = ref(false)

renderData()
const query = ref({
    page: 1,
    size: 10,
    total: 20
})
const lazyData = ref([])
const status = ['0', '1', '2']
function renderData() {
    loading.value=true
    setTimeout(() => {
        lazyData.value = query.value.page == 1 ? data : data2
        loading.value = false
    },1000)
}

const optionref = ref([]);
setTimeout(() => {
    optionref.value = [
        {
            label: "正常",
            value: "1",
            dictType: "hTag",
            elTagType: "danger"
        },
        {
            label: "正常1",
            value: "0",
            dictType: "hTag",
            elTagType: "primary"
        },
        {
            label: "正常2",
            value: "2",
            dictType: "text",
            elTagType: "primary"
        }
    ]
},1000)
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