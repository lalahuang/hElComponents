/*
 * @Author: hzm
 * @Date: 2022-08-19 10:55:23
 * @Description: 表格设置
 */

import { defineComponent, PropType } from "vue";

import setting from "./setting.vue";

export default defineComponent({
  
  components: {
    setting,
  },

  setup(props, { attrs, slots }) {
    return () => {
      // 解析左插槽
      let leftHandleArea = null;
      let handleArea = null;
      if (slots && slots.leftHandleArea) {
        leftHandleArea = slots.leftHandleArea();
      }
      // 解析右插槽
      if (slots && slots.handleArea) {
        handleArea = slots.handleArea();
      }
      return (
        <div class="h-table__tool-container">
          <div class="left-tool-container">
            <el-space>{leftHandleArea}</el-space>
          </div>
          <div class="right-tool-container">
            <el-space>
              {handleArea}
              <setting></setting>
            </el-space>
          </div>
        </div>
      );
    };
  },
});
