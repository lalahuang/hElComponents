/*
 * @Author: hzm
 * @Date: 2022-10-13 16:33:31
 * @Description: 
 */

import { defineComponent, VNode } from 'vue';
import { ArrowDown } from "@element-plus/icons-vue";
import { hMoreBoxProps } from './props';
export default defineComponent({
  name: "HMoreBox",
  props: hMoreBoxProps,
    setup(props, { attrs, slots }) {
      /**获取元素 */
      const vslots = slots?.default?.() ?? [];
      const defaultNumber = props.showNumber || 2;
      let defaultList: VNode[] = [];
      /**收缩个数 */
      let contractionList: VNode[] = [];
      
      if (vslots?.length && vslots.length > defaultNumber) {
          defaultList = vslots.slice(0, defaultNumber);
          contractionList = vslots.slice(defaultNumber);
      } else {
        defaultList = vslots;
      }
      console.log("defaultList: ", defaultList);

      console.log("contractionList: ", contractionList);
      /** 渲染<el-dropdown-item>子项 */
      const dropdownItemList = contractionList.length
        ? contractionList.map((comp) => {
            return <el-dropdown-item>{comp}</el-dropdown-item>;
          })
        : [];

      return () => (
        <div class='h-more-box'>
          <el-space>
            {defaultList}
            {dropdownItemList.length ? (
              <el-dropdown
                v-slots={{
                  dropdown: () => (
                    <el-dropdown-menu>{dropdownItemList}</el-dropdown-menu>
                  ),
                }}
              >
                <div
                  class="h-more-box_text"
                  style={`color:var(--el-color-primary)`}
                >
                  <el-link type="primary" underline={false} >更多</el-link>
                  <el-icon  style={`color:var(--el-color-primary)`} >
                    <ArrowDown />
                  </el-icon>
                </div>
              </el-dropdown>
            ) : null}
          </el-space>
        </div>
      );
    },
});