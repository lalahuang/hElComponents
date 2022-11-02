/*
 * @Author: hzm
 * @Date: 2022-11-01 16:05:55
 * @Description:
 */

import { defineComponent, ref, watch, inject } from "vue";
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";
import { emitter } from "../../utils";
import Ref from "vue";

export default defineComponent({
  name: "LineSpacing",
  setup(props, { attrs }) {
    const {
      propSpace,
      lineSpaceChange,
    }: { propSpace: string; lineSpaceChange: (space: string) => void } = inject(
      "lineSpaceSet"
    ) ?? { propSpace: "default", lineSpaceChange: () => {} };
    const selectedSpaced = ref(propSpace || "default");
    const lineSpacingList = [
      {
        key: "default",
        label: "紧凑",
      },
      {
        key: "middle",
        label: "中等",
      },
      {
        key: "big",
        label: "宽松",
      },
    ];

    function renderLineSpaceOptions() {
      return lineSpacingList.map((item) => (
        <ElDropdownItem
          class={
            item.key == selectedSpaced.value
              ? "h-table__tool--space--selected"
              : ""
          }
          command={item.key}
        >
          {item.label}
        </ElDropdownItem>
      ));
    }

    function spaceChange(key: string) {
        selectedSpaced.value = key;
        lineSpaceChange(key);
     
    }
    //   watch(() => selectedSpaced.value, (val) => {
    //   });

    return () => {
      return (
        <div class="right-tool-setting">
          <ElDropdown
            onCommand={spaceChange}
            trigger="click"
            hideOnClick={false}
            v-slots={{
              dropdown: () => (
                <ElDropdownMenu>{renderLineSpaceOptions()}</ElDropdownMenu>
              ),
            }}
          >
            <span class="el-dropdown-link">
              <i class="iconfont icon-hangjushezhi"></i>
            </span>
          </ElDropdown>
        </div>
      );
    };
  },
});
