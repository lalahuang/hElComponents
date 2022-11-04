<!--
 * @Author: hzm
 * @Date: 2022-10-27 15:47:00
 * @Description: 
-->
<script setup>
import queryformbase from './base.vue';

</script>

# 查询表单

规整搜索区域的表单项的排列，表单操作区域默认展示在最后一列。表单项默认占满第一行


## 基础用法


:::demo queryForm/base

<queryformbase></queryformbase>

:::

## HQueryForm 属性
HQueryForm 属性与el-form相同。

| 参数    | 说明   | 类型                | 可选值  | 默认值  |
| ------- | ------------ | ------- | ------ | ------- |
| showLength    | 表单项默认展示个数     |          -                    | - |0(默认占满第一行)|
| operationFollow    | 操作项是否跟随     |          -                    | - |false|
| rowGutter    | 表单项间距     |          -                    | - |16|
| collapsed    | 展开收起     |          -                    | - |true|

## HQueryForm 事件
支持el-form 所有事件

| 参数    | 说明   | 类型                | 可选值  | 默认值  |
| ------- | ------------ | ------- | ------ | ------- |
| onCollapse    | 展开收起会触发     |          `(collapse: boolean) => true`                    | - |-|


