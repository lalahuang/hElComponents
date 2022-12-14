/*
 * @Author: hzm
 * @Date: 2022-08-19 10:55:23
 * @Description: 表格设置
 */

import { defineComponent, computed } from "vue";

import setting from "./setting.vue";
import lineSpacing from "./lineSpacing";
import { stripEmpty } from "../../utils";

export default defineComponent({
  components: {
    setting,
    lineSpacing,
  },
  props: {
    showSettingIcon: {
      type: Boolean,
      default: true,
    },
    showLineSpaceIcon: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      // 解析左插槽
      let leftHandleArea = null;
      let handleArea = null;
      if (slots && slots.leftHandleArea) {
        leftHandleArea = stripEmpty(slots.leftHandleArea());
      }
      // 解析右插槽
      if (slots && slots.handleArea) {
        handleArea = stripEmpty(slots.handleArea());
      }
      console.log("leftHandleArea: ", leftHandleArea);

      console.log("handleArea: ", handleArea);
      const toolIsShow = computed(() => {
        return (
          leftHandleArea.length || handleArea.length || props.showSettingIcon || props.showLineSpaceIcon
        );
      });

      return (
        <>
          {toolIsShow.value ? (
            <div class="h-table__tool-container">
              <div class="left-tool-container">
                <el-space>{leftHandleArea}</el-space>
              </div>
              <div class="right-tool-container">
                {handleArea}
                {props.showLineSpaceIcon ? <lineSpacing></lineSpacing> : null}
                {props.showSettingIcon ? <setting></setting> : null}
              </div>
            </div>
          ) : null}
        </>
      );
    };
  },
});
