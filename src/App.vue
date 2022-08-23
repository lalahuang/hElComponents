<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup]
// import hTable from './packages';
import { HTable  } from 'hcomponents';
// import 'hcomponents/lib/style.css';

import type { ElTableColumnProps } from './packages/hTable/table'
type dataType = {
  test?: string,
  haha?: string,
  sah?:string
}
type newType = dataType & {
  sah?:number
}
const options: DictTagOptions[] = [
  {
    label: "123",
    value: "0",
    elTagType:"primary"
  }, 
  {
    label: "1234",
    value: "1",
    elTagType:"primary"
  }
  
]

const tableColumn: ElTableColumnProps<newType>[] = [
  {
    type: "index",
    label: "序号",
    width:"100px"
  },
  {
    label: "测试",
    prop:"test",
    options
  },
]
const data= [
  {
    test:0
  }
]

</script>

<template>
   
  <h-table :column="tableColumn" :data="data" >
    
  </h-table>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
