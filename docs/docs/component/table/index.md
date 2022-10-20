
<script setup>
import copy from './copy.vue';
import tablebase from './base.vue';
import slotName from './slotName.vue';
import renderSlot from './render.vue';
import dictTag from './dictTag.vue';
import headerDescription from './headerDescription.vue';
import tablemenu from './menu.vue';
import pagination from './pagination.vue';
import fixHeader from './fixHeader.vue';

</script>

# 表格

目前主要解决两个问题：
1. `el-table-column`原先prop 不支持ts类型
2. 自定义组件整理

## 基础用法
原先  `el-table-column`采用属性 `columns` 替代。使用 `defineTableColumns`定义columns，提供完善类型支持。


:::demo table/base

<tablebase></tablebase>

:::

## 自定义slot--template模式

通过`columns`下的 `slotName`属性映射`tempalte` 下的具名插槽
     
:::demo table/slotName

<slotName></slotName>

:::

## 自定义slot--render模式

通过`columns`下的 `render`属性来渲染插槽,支持 `h()`方法与jsx写法
     
:::demo table/render

<renderSlot></renderSlot>

:::

## 字典功能

通过`columns`下的 `columnType='dict'`属性来设置字典，通过`options.list `设置字典选项
     
:::demo table/dictTag

<dictTag></dictTag>

:::


## 表头描述
通过`columns`下的 `headerDescription`属性来表头内容
     
:::demo table/headerDescription

<headerDescription></headerDescription>

:::

## 操作行
通过`columns`下的 `columnType='menu'`属性来设置操作列，操作列会默认展示2个按钮，其余按钮显示为更多
     
:::demo table/menu

<tablemenu></tablemenu>

:::




## 复制功能


你可以使用 `columnType='copy'` 属性来使用复制功能

:::demo table/copy

<copy></copy>

:::

##  分页


传入`total`属性即可开启分页

:::demo table/pagination

<pagination></pagination>

:::

## 固定表头


你可以使用 `columnType='fixHeader'` 属性来使用固定表头功能

:::demo table/fixHeader

<fixHeader></fixHeader>

:::

## HTable 属性

HTable 多了一个columns 配置项，其余属性与el-table 相同。
分页属性同el-pagination 属性相同。

## Htable 事件

| 参数    | 说明   | 类型                | 可选值  | 默认值  |
| ------- | ------------ | ------- | ------ | ------- |
| load    | pageSize 和 currentPage 改变时会触发     |          -                    | - |-|




## columns 配置项
columns 拥有el-table-column所有属性，额外扩展以下属性

| 参数    | 说明   | 类型                | 可选值  | 默认值  |
| ------- | ------------ | ------- | ------ | ------- |
| children    | 嵌套表格     | ITableColumns                             | default |-|
| hide    | 是否隐藏当前列  | boolean | true |-|-|
| render | slot渲染行，支持h方法、jsx写法 | function({$index,column,row},value)   | — |    -|
| columnType    | 行扩展类型  | string |  "dict"/"image"/"menu"/"copy" |-|
| headerSlotName    | 表头渲染slot名称  | string | - |-|
| slotName    | slot渲染行，template写法  | string | - |-|
| options    | 配置选项  | ColumnTypeOptions |  |-|
| headerDescription    | 表头描述  | string |  |-| 

## Htable 插槽
| 插槽名    | 说明   |
| ------- | ------------ |
|leftHandleArea|表格工具栏左侧区域|
|handleArea|表格工具栏右侧区域|
