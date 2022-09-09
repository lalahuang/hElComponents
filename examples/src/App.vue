<template>
  <h-tag content="ceshi" type="primary"></h-tag>
  <h-dict-tag
    :options="dictTagsOptions"
    direction="vertical"
    :value="['0', '1']"
  ></h-dict-tag>
</template>

<script setup lang="ts">
import { HTag, HDictTag } from "h-components-next";
import type { DictTagOptions } from "h-components-next/hDictTag";

const dictTagsOptions: DictTagOptions[] = [
  {
    label: "测试字典",
    value: "0",
    elTagType: "primary",
    dictType: "elTag",
  },
  {
    label: "测试字典2",
    value: "1",
    elTagType: "danger",
    dictType: "hTag",
  },
];
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
