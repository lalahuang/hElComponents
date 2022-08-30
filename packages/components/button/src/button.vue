<!--
 * @Author: hzm
 * @Date: 2022-08-26 15:04:31
 * @Description: 
-->

<template>
  <div>
    <button class="h-button">{{ title + testProp }}</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { buttonProps } from "./types";

export default defineComponent({
  name: "HButton",
  props: buttonProps,
});
</script>

<style scoped></style>