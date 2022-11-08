<!--
 * @Author: hzm
 * @Date: 2022-11-08 11:40:08
 * @Description: 
-->
<script setup>
import dictTagBase from './base.vue';



</script>

# 字典展示组件

## 基础用法


:::demo dictTag/base

<dictTagBase></dictTagBase>

:::

## HDictTag 属性


| 参数    | 说明   | 类型                | 可选值  | 默认值  |
| ------- | ------------ | ------- | ------ | ------- |
| options    | 字典选项     | `{label: string;value: string \ number;dictType?: 'hTag'\'elTag'\'text' ;elTagType?: "primary"\"success"\ "warning" \ "info" \ "danger";}[]`                   | - |-|
| value    | 值     |          number\string\number\string[]                    | - |-|
| direction    | 排列方式     |          horizontal\vertical                    | - |horizontal|

