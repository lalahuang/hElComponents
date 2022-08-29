<!--
 * @Author: hzm
 * @Date: 2022-08-26 15:04:31
 * @Description: 
-->

<template>
  <div>
    <button>{{ props.title }}</button>
  </div>
</template>

<script setup lang="ts">
import { buttonProps } from "./types";
const props =defineProps(buttonProps);
</script>

<style scoped></style>