<!--
 * @Author: hzm
 * @Date: 2022-08-22 14:36:16
 * @Description: 
-->
<template>
  <el-popover
    popper-class="h-table__setting-popover"
    placement="bottom-start"
    trigger="click"
    width="200px"
  >
    <draggable
      v-model="columnsList"
      item-key="id"
      handle=".sort-handel"
      :animation="340"
      
    >
      <template #item="{ element, index }">
        <div class="h-table__setting-inner">
          <div class="sort-handel" >
            <el-icon><Rank /></el-icon>
          </div>
          <el-checkbox
            class=" column-setting-checkbox"
            :model-value="!element.hide"
            :indeterminate="false"
            @change="(v: boolean) => propChange(v, index)"
          >
            <el-tooltip
              effect="dark"
              :content="element.label"
              placement="top-start"
            >
              <div w="1/1">{{ element.label }}</div>
            </el-tooltip>
          </el-checkbox>
          <div class="column-setting-top-bottom ">
            <el-tooltip
              effect="dark"
              content="固定在列首"
              placement="top-start"
            >
              <el-icon
                :color="element.fixed == 'left' ? '#1482f0' : ''"
                @click="fixTop(index)"
                ><Upload /></el-icon>
              
            </el-tooltip>
            <el-tooltip
              effect="dark" 
              content="固定在列尾"
              placement="top-start"
            >
              <el-icon
                :color="element.fixed == 'right' ? '#1482f0' : ''"
                @click="fixDown(index)"
                ><Download /></el-icon>
            </el-tooltip>
          </div>
        </div>
      </template>
    </draggable>
    <template #reference>
      <div class="right-tool-setting">
        <i class="iconfont icon-shezhi"></i>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts" name="HzmTableTool">
import { computed, inject, PropType ,Ref,ref,watch} from "vue";
import draggable from "zhyswan-vuedraggable";
import { Setting,Download,Upload,Rank} from '@element-plus/icons-vue'

import type { ITableColumns } from "./types";

const columnsList: Ref<ITableColumns> = inject("column")??ref([]);

const propChange = (v: boolean, index: number) => {
  console.log('v: boolean, index: number: ', v, index);
  columnsList.value[index].hide = !v;
};
const fixTop = (index: number) => {
  // @ts-ignore
  columnsList.value[index].fixed = columnsList.value[index].fixed == "left" ? undefined : "left";
};
const fixDown = (index: number) => {
  // @ts-ignore
  columnsList.value[index].fixed = columnsList.value[index].fixed == "right" ? undefined : "right";
};

</script>

<style lang="scss">

</style>
