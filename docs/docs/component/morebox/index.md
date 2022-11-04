<script setup>
import morebase from './base.vue';
import moredynamic from './dynamic.vue';
</script>

# 更多组件
将超出的操作选项自动收缩

## 基础用法

:::demo morebox/base

<morebase></morebase>

:::

## 动态渲染

:::demo morebox/dynamic

<moredynamic></moredynamic>

:::

## HMoreBox 属性
| 参数    | 说明   | 类型                | 可选值  | 默认值  |
| ------- | ------------ | ------- | ------ | ------- |
| showNumber    | 展示个数     |          -                    | - |3|


## HMoreBox 插槽
| 插槽名   | 说明   |
| ------- | ------------ |
|more |可定义更多图标的展现方式|

