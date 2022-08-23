<!--
 * @Author: hzm
 * @Date: 2022-08-22 14:36:16
 * @Description: 
-->
<template>
  <el-popover
    popper-class="tableToolPopover"
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
        <div class="column-setting-container">
          <div class="sort-handel" >
            <img :src="rankIcon" alt="" />
          </div>
          <el-checkbox
            class="line-clamp-1 column-setting-checkbox"
            :model-value="element.visiable"
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
              <!-- <el-icon
                cursor="pointer"
                :color="element.fixed == 'left' ? '#1482f0' : ''"
                @click="fixTop(index)"
                ><SortUp
              /></el-icon> -->
              <div
                :color="element.fixed == 'left' ? '#1482f0' : ''"
                @click="fixTop(index)"
              >
                <img :src="topIcon" alt="" />
              </div>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="固定在列尾"
              placement="top-start"
            >
              <div
                :color="element.fixed == 'left' ? '#1482f0' : ''"
                @click="fixDown(index)"
              >
                <img :src="bottomIcon" alt="" />
              </div>
            </el-tooltip>
          </div>
        </div>
      </template>
    </draggable>
    <template #reference>
      <div class="right-tool-setting">
        <img :src="settingIcon" alt="" />
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts" name="HzmTableTool">
import { computed, inject, PropType ,ref,watch} from "vue";
import draggable from "zhyswan-vuedraggable";
import rankIcon from "./style/icon/rank.png";
import topIcon from "./style/icon/top.png";
import bottomIcon from "./style/icon/bottom.png";
import settingIcon from "./style/icon/setting.png";
import type { ElTableColumnProps } from "./table";
import mitt from "../../utils/mitt";
import { WritableArray } from "element-plus/lib/utils";
const columns: ElTableColumnProps<any>[] = inject("column") ?? [];
const columnsList=ref(columns)
const propChange = (v: boolean, index: number) => {
  columnsList.value[index].visiable = v;
};
const fixTop = (index: number) => {
  // @ts-ignore
  columnsList.value[index].fixed = columnsList.value[index].fixed == "left" ? undefined : "left";

};
const fixDown = (index: number) => {
  // @ts-ignore
  columnsList.value[index].fixed = columnsList.value[index].fixed == "right" ? undefined : "right";
};
watch(() => columnsList.value, (newValue, ) => {
  mitt.emit("updateColumns", newValue);
  
})
</script>

<style lang="scss">
.tableToolPopover {
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.column-setting-container {
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;

  &:hover {
    background: #409eff;
    .column-setting-top-bottom {
      display: flex;
    }
  }
  .column-setting-checkbox.el-checkbox {
    margin-left: 24px;
    width: 200px;
    overflow: hidden;
  }
  .column-setting-top-bottom {
    display: none;
    align-items: center;
  }
}
</style>
