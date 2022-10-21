/*
 * @Author: hzm
 * @Date: 2022-10-13 16:33:31
 * @Description: 
 */

import { defineComponent, VNode,watch,ref,  } from 'vue';
import { ArrowDown } from "@element-plus/icons-vue";
import { hMoreBoxProps } from './props';
import { flatten } from 'lodash';
import { ElDropdownItem } from "element-plus";
export default defineComponent({
  name: "HMoreBox",
  props: hMoreBoxProps,
  setup(props, { attrs, slots }) {
    /**获取元素 */
    const defaultNumber = props.showNumber || 3;
    let defaultList = ref<VNode[]>([]);
    /**收缩个数 */
    let contractionList = ref<VNode[]>([]);
    const dropdownItemList = ref<VNode[]>([]);

    const renderSlots = () => {
      const vslots =resolveSlots(slots?.default?.()??[]);
      console.log('vslots: ', vslots);

      if (vslots?.length && vslots.length > defaultNumber) {
        defaultList.value = vslots.slice(0, defaultNumber);
        contractionList.value = vslots.slice(defaultNumber);
      } else {
        defaultList.value = vslots;
      }
      console.log("defaultList: ", defaultList);

      console.log("contractionList: ", contractionList);
      /** 渲染<el-dropdown-item>子项 */
      dropdownItemList.value = contractionList.value.length
        ? contractionList.value.map((comp) => {
            return <ElDropdownItem >{comp}</ElDropdownItem>;
          })
        : [];
      console.log("dropdownItemList.value: ", dropdownItemList.value);
      
    };

    /** 解析slots?.default?.() */
    const resolveSlots = (vslots: VNode[]) => {
      
     return flatten(
       vslots?.map?.((vnode) => { 
         return vnode.type.toString() == "Symbol(Fragment)" &&
           vnode?.children?.length
           ? vnode.children
           : vnode;
       })??[] ) as VNode[];

    };
    renderSlots();
    watch(
      () => slots?.default?.(),
      (val) => {
        console.log("slot 变化啦", val);
        renderSlots();
      }
    );

    return () => (
      <div class="h-more-box">
        <el-space>
          {defaultList.value}
          {dropdownItemList.value.length ? (
            <el-dropdown
              v-slots={{
                dropdown: () => (
                  <el-dropdown-menu>{dropdownItemList.value}</el-dropdown-menu>
                ),
              }}

            >
              <div
                class="h-more-box_text"
                style={`color:var(--el-color-primary)`}
              >
                <el-link type="primary" underline={false}>
                  更多
                </el-link>
                <el-icon style={`color:var(--el-color-primary)`}>
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