<!--
 * @Author: hzm
 * @Date: 2022-10-12 10:15:56
 * @Description: table demo
-->

<template>
  <div>
    <HTable :columns="columns" :data="data">
      <template #testSlotName="scoped">
        {{`${scoped.row.title}${scoped.$index}`}}
      </template>

      <template #testRenderSlot="scoped">
        {{"slotName优先级高"}}
      </template>
      <template #testHeader="scoped">
        <el-input placeholder="1232" size="normal" clearable @change=""></el-input>
      </template>
      <template #expandtest="props">
        <p>State: {{ props.row.state }}</p>
        <p>City: {{ props.row.city }}</p>
        <p>Address: {{ props.row.address }}</p>
        <p>Zip: {{ props.row.zip }}</p>
      </template>
      <template #leftHandleArea>
        <el-button type="primary" size="default" @click="">测试按钮</el-button>
        <el-button type="primary" size="default" @click="">测试按钮2</el-button>
      </template>
      <template #menuList>
        <el-link type="primary" target="_blank">测试按钮1</el-link>
        <el-link type="danger" target="_blank">测试按钮2</el-link>
        <el-link type="warning" target="_blank">测试按钮3</el-link>
        <el-link type="info" target="_blank">测试按钮4</el-link>
        <el-link type="success" target="_blank">测试按钮5</el-link>
        <el-link type="success" target="_blank">测试按钮6</el-link>
      </template>
    </HTable>
    <!-- <ProTable></ProTable> -->


  </div>
</template>

<script setup lang="tsx">
import { HTable,defineTableColumns } from "h-components-next";

// import { defineTableColumns } from 'element-pro-components';


import { h } from "vue";



// import  { defineTableColumns   } from "h-components-next/hTable";
interface DataType {
  date: string,
  title: string
  status: number,
  compxObj: {
    obj: string,
    obj1: string
  },

}
const data = [
  {
    date: 123,
    title: "132",
    status: 0,
    compxObj: {
      obj: "复杂对象1",
      obj1: "复杂对象2"
    },
  }
]
const columns = defineTableColumns<DataType>(
  [
    {
      label: "复杂",
      prop: "compxObj.obj",
    },
    {
      label: "时间",
      prop: "date",
      align: "left"
    },
    {
      label: "测试slotName",
      prop: "title",
      slotName: "testSlotName"
    },
    {
      label: "测试headerSolt",
      prop: "title",
      headerSlotName: "testHeader"
    },
    {
      label: "测试render,支持h()渲染",
      prop: "title",
      render: ({ column, $index }, data) => {
        console.log('{ column, $index }, data: ', { column, $index }, data);
        return h("div", 1235);
      }
    },
    {
      label: "测试render与slot优先级",
      prop: "title",
      render: ({ row, column, $index }, data) => {
        console.log('{ column, $index }, data: ', { column, $index }, data,);
        return "render优先级高";
      },
      slotName: "testRenderSlot"
    },
    {
      type: "selection",
      label: "选择"
    },
    {
      type: "expand",
      label: "展开",
      width: "150",
      slotName: "expandtest"
    },
    {
      type: "index",
      label: "序号",
    },
    {
      label: "字典测试",
      prop: "status",
      columnType: "dict",
      options: {
        list: [
          {
            label: "开",
            value: 0,
            dictType: "hTag",
            elTagType: "primary"
          }
        ],
      },
    },
    {
      label: "复杂表头",
      prop: "compxObj",
      children: [
        {
          label: "表头1",
          prop: "compxObj.obj",
        },
        {
          label: "表头2",
          prop: "compxObj.obj1",
        }
      ]

    },
    {
      label: "测试表格表述",
      prop: "compxObj.obj",
      headerDescription: "这是测试表格描述"
    },
    {
      label: "操作",
      columnType: "menu",
      width: "250px",
      slotName: "menuList",
      render: () => (
        <>
          <el-link type="primary" target="_blank" > 测试按钮1 </el-link>
          <el-link type="primary" target="_blank" > 测试按钮1 </el-link>
          <el-link type="primary" target="_blank" > 测试按钮1 </el-link>
          <el-link type="primary" target="_blank" > 测试按钮1 </el-link>
          <el-link type="primary" target="_blank" > 测试按钮1 </el-link>
        </>
      )
    }
  ]
)
console.log('columns: ', columns);
</script>

<style scoped>

</style>