/*
 * @Author: hzm
 * @Date: 2022-10-27 14:15:35
 * @Description:
 */

import { useResizeObserver } from "@vueuse/core";
import { defineComponent, ref, VNode } from "vue";
import { ElForm, ElCol, ElRow, ElIcon,ElSpace } from "element-plus";
import { ArrowDownBold } from "@element-plus/icons-vue";

import { hQueryFormProp, hQueryFormEmits } from "./props";
import { FormLayout, SpanConfig } from "./type";
export default defineComponent({
  name: "HQueryForm",
  props: hQueryFormProp,
  emits: hQueryFormEmits,
  setup(props, { attrs, slots, emit }) {
    /**
     * 1 根据宽度计算item默认显示占比,以及el-form label-position的值
     * 2 过滤每项,计算每项展示占比,计算占比是否超过24,超过24隐藏          *
     *
     */
    const hQueryFormRef = ref();
    const spanInfo = ref({
      span: 6,
      layout: "horizontal",
    });
    const itemLength = ref(0);
    const totalSpan = ref(0);
    const totalSize = ref(0);
    const showLength = ref(1);
    const firstRowFull = ref(false);
    const currentSpan = ref(0);
    // 是否收起
    const collapsed = ref(true);

    const CONFIG_SPAN_BREAKPOINTS: { [key in string]: number } = {
      xs: 513,
      sm: 513,
      md: 785,
      lg: 992,
      xl: 1057,
      xxl: Infinity,
    };
    /** 配置表单列变化的容器宽度断点 */
    const BREAKPOINTS = {
      vertical: [
        [513, 1, "vertical"],
        [785, 2, "vertical"],
        [1057, 3, "vertical"],
        [Infinity, 4, "vertical"],
      ],
      default: [
        [513, 1, "vertical"],
        [701, 2, "vertical"],
        [1062, 3, "horizontal"],
        [1352, 3, "horizontal"],
        [Infinity, 4, "horizontal"],
      ],
    };
    // 监听hQueryFormRef
    useResizeObserver(hQueryFormRef, (entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      console.log("width, height: ", width, height);

      spanInfo.value = getSpanConfig("horizontal", width);
      console.log("spanInfo.value: ", spanInfo.value);
      // key.value += 1;
    });

    /**根据宽度计算item默认显示占比,以及el-form label-position的值 */
    const getSpanConfig = (
      layout: FormLayout,
      width: number,
      span?: SpanConfig
    ): { span: number; layout: FormLayout } => {
      if (span && typeof span === "number") {
        return {
          span,
          layout,
        };
      }
      const spanConfig = span
        ? ["xs", "sm", "md", "lg", "xl", "xxl"].map((key) => [
            CONFIG_SPAN_BREAKPOINTS[key],
            24 / span[key],
            "horizontal",
          ])
        : BREAKPOINTS[layout || "default"];

      const breakPoint = (spanConfig || BREAKPOINTS.default).find(
        (item: [number, number, FormLayout]) => width < item[0] + 16
      );
      return {
        span: 24 / breakPoint[1], //单个iten跨度
        layout: breakPoint[2], //  label-position
      };
    };

    function resetSpan() {
      itemLength.value = 0;
      totalSpan.value = 0;
      totalSize.value = 0;
      currentSpan.value = 0;
    }

    /** FormItem 初始化 ,获取每项colSize,计算每项占比,是否隐藏 */
    function handelFormItem() {
      const queryFormSlots = slots?.default?.() ?? [];

      resetSpan();
      let curTotalSpan = 0;
      let curTotalSize = 0;
      let curItemLength = 0;
      const processedDoms = queryFormSlots.map((formItem, index) => {
        const colSize =
          formItem?.props?.["col-size"] || formItem?.props?.["colSize"] || 1;
        const colSpan = Math.min(spanInfo.value.span * (colSize || 1), 24);
        curTotalSpan += colSpan;
        curTotalSize += colSize;
        curItemLength += 1;
        if (index === 0) {
          /**判读第一行是否直接沾满 */
          firstRowFull.value = colSpan === 24 && !formItem?.props?.hidden;
        }
        /**判断当前item是否需要隐藏 */
        let hidden: boolean =
          formItem?.props?.hidden ||
          //如果收起了
          (collapsed.value &&
            (firstRowFull.value ||
              //如果 超过显示长度 且 总长度超过了 24
              curTotalSize > showLength.value - 1) &&
            !!index &&
            curTotalSpan >= 24);
        console.log(
          "firstRowFull.value: ",
          firstRowFull.value,
          curTotalSize,
          showLength.value,
          index,
          curTotalSpan,
          collapsed.value
        );

        // 显示几个formItem
        if (props.showLength) {
          hidden = collapsed.value && curItemLength > props.showLength;
        }

        return {
          formItem,
          hidden,
          colSpan,
        };
      });
      totalSpan.value = curTotalSpan;
      totalSize.value = curTotalSize;
      itemLength.value = curItemLength;
      return processedDoms;
    }

    /**是否显示收缩 展开按钮 */
    function needCollapseRender() {
      if (
        totalSpan.value + spanInfo.value.span <= 24 ||
        Number(totalSize.value) + 1 <= showLength.value ||
        itemLength.value === props.showLength
      ) {
        return false;
      }
      return true;
    }
    /** 计算操作区域是否需要偏移 */
    const offset = () => {
      const offsetSpan = (currentSpan.value % 24) + spanInfo.value.span;
      return 24 - offsetSpan;
    };

    /**渲染form-item */

    function renderELRow() {
      const cols: VNode[] = [];
      const doms = handelFormItem();
      let curspan = 0;
      doms.forEach((formItem, index) => {
        if (!formItem.hidden) {
          // 当前dom占不下 需要换行， 当前行剩余的大小也计算在内
          if (24 - (curspan % 24) < formItem.colSpan) {
            curspan += 24 - (curspan % 24);
          }
          curspan += formItem.colSpan;
        }
        cols.push(
          <ElCol
            span={formItem.colSpan}
            v-show={!formItem.hidden}
          >
            {formItem.formItem}
          </ElCol>
        );
        currentSpan.value = curspan;
      });

      return (
        <ElRow gutter={24}>
          {cols} {renderHandelCol()}
        </ElRow>
      );
    }

    /**渲染操作行 */
    function renderHandelCol() {
      return (
        <ElCol
          span={spanInfo.value.span}
          offset={props.operationFollow ? 0 : offset()}
          class={
            spanInfo.value.layout == "horizontal"
              ? "h-queryForm__handelArea--col"
              : "h-queryForm__handelArea--col is-top"
          }
        >
          {renderHandelItem()}
        </ElCol>
      );
    }

    /**渲染展开伸缩按钮 */
    function renderCollapsed() {
      return (
        <div
          onClick={() => {
            emit("onCollapse", !collapsed.value);
            collapsed.value = !collapsed.value;
          }}
          class="h-queryForm__handelArea--collapse"
        >
          <span class="collapse-text">{collapsed.value ? "展开" : "收起"}</span>
          <ElIcon
            class="collapse-icon"
            style={`transform: rotate(${collapsed.value ? 0 : 0.5}turn)`}
          >
            <ArrowDownBold></ArrowDownBold>
          </ElIcon>
        </div>
      );
    }

    /**
     * 渲染操作按钮
     */
      function renderHandelItem() {
      
      return (
        <div
          class="h-queryForm__handelArea"
      
          style={`justify-content:${
            props.operationFollow ? "flex-start" : "flex-end"
          }`}
          >
          {slots?.handleArea?.()}
          {needCollapseRender() ? renderCollapsed() : ""}
        </div>
      );
    }

    return () => {
      return (
        <>
          <div ref={hQueryFormRef} class="h-queryForm">
            <ElForm
              labelPosition={
                spanInfo.value.layout == "horizontal" ? "left" : "top"
              }
              {...attrs}
            >
              {renderELRow()}
            </ElForm>
          </div>
        </>
      );
    };
  },
});
