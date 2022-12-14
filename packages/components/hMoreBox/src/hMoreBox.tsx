/*
 * @Author: hzm
 * @Date: 2022-10-13 16:33:31
 * @Description:
 */

import { defineComponent, VNode, } from "vue";
import { hMoreBoxProps } from "./props";

import {
  ElDropdownItem,
  ElDropdownMenu,
  ElDropdown,
  ElSpace,

} from "element-plus";

import { stripEmpty } from "../../../components/utils";
import { flatten } from "lodash-es";
export default defineComponent({
  name: "HMoreBox",
  props: hMoreBoxProps,
  setup(props, { attrs, slots }) {
    /**获取元素 */
    const defaultNumber = props.showNumber || 3;
    let defaultList: VNode[] = [];
    /**收缩个数 */
    let contractionList: VNode[] = [];
    let dropdownItemList: VNode[] = [];
    // const slotsDefault = computed(() => {
    //   return slots?.default?.()??[];
    // })
    const renderSlots = () => {
      // const { visibleSlotEntries } = useSlot(slots.default);

      const vslots = resolveSlots(slots?.default?.() ?? []);
      console.log(
        "vslots: ",
        vslots,
        vslots.length,
        vslots.length > defaultNumber
      );

      if (vslots?.length && vslots.length > defaultNumber) {
        defaultList = vslots.slice(0, defaultNumber);
        contractionList = vslots.slice(defaultNumber);
      } else {
        defaultList = vslots;
        /** 修复存在缓存不更新的情况 */
        contractionList = [];
      }
      console.log("defaultList: ", defaultList);

      console.log("contractionList: ", contractionList);
      /** 渲染<el-dropdown-item>子项 */
      dropdownItemList = contractionList.length
        ? contractionList.map((comp) => {
            return <ElDropdownItem>{comp}</ElDropdownItem>;
          })
        : [];
      console.log("dropdownItemList: ", dropdownItemList);
    };

    /**
     * { <ElLink type="primary" underline={false}>
                        更多
                      </ElLink>
                      <ElIcon style={`color:var(--el-color-primary)`}>
                        <ArrowDown />
                      </ElIcon> */

    /** 解析slots?.default?.() */
    const resolveSlots = (vslots: VNode[]) => {
      return stripEmpty(
        flatten(
          vslots?.map?.((vnode) => {
            return vnode.type.toString() == "Symbol(Fragment)" ||
              //修复正式环境Symbol()的情况
              (vnode.type.toString() == "Symbol()" && vnode?.children?.length)
              ? vnode.children
              : vnode;
          }) ?? []
        )
      ) as VNode[];
    };

    return () => {
      renderSlots();
      return (
        <div class="h-more-box">
          <ElSpace size={12}>
            {defaultList}
            {dropdownItemList.length ? (
              <ElDropdown
                v-slots={{
                  dropdown: () => (
                    <ElDropdownMenu>{dropdownItemList}</ElDropdownMenu>
                  ),
                }}
              >
                <div class="h-more-box_text">
                  {slots?.more?.() ?? (
                    <>
                      <i
                        style={`color:var(--h-morebox-icon-color)`}
                        class="iconfont icon-gengduo-mian"
                      ></i>
                    </>
                  )}
                </div>
              </ElDropdown>
            ) : null}
          </ElSpace>
        </div>
      );
    };
  },
});
