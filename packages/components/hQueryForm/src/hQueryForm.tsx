/*
 * @Author: hzm
 * @Date: 2022-10-27 14:15:35
 * @Description:
 */

import { useResizeObserver, reactivePick } from "@vueuse/core";
import { defineComponent, ref, VNode, mergeProps } from "vue";
import { ElForm, ElCol, ElRow, FormInstance } from "element-plus";

import { hQueryFormProp, hQueryFormEmits, formKeys } from "./props";
import { FormLayout, SpanConfig, IFormExpose } from "./type";
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
    const formRef = ref<FormInstance>();
    /**获取ELForm props */
    const elFormProps = reactivePick(props, ...formKeys);
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
      //@ts-ignore
      spanInfo.value = getSpanConfig("horizontal", width);
      console.log("spanInfo.value: ", spanInfo.value);
      // key.value += 1;
    });

    /**根据宽度计算item默认显示占比,以及el-form label-position的值 */
    const getSpanConfig = (
      layout: FormLayout,
      width: number,
      span?: SpanConfig
    ) => {
      if (span && typeof span === "number") {
        return {
          span,
          layout,
        };
      }
      const spanConfig = span
        ? ["xs", "sm", "md", "lg", "xl", "xxl"].map((key) => [
            CONFIG_SPAN_BREAKPOINTS[key],
            //@ts-ignore
            24 / span[key],
            "horizontal",
          ])
        : BREAKPOINTS[layout == "horizontal" ? "default" : "vertical"];
      
      const breakPoint = (spanConfig || BREAKPOINTS.default).find(
        //@ts-ignore
        (item: [number, number, FormLayout]) => width < item[0] + 16
      ); ;
      return {
        //@ts-ignore
        span: 24 / breakPoint[1], //单个iten跨度
        //@ts-ignore
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
          <ElCol span={formItem.colSpan} v-show={!formItem.hidden}>
            {formItem.formItem}
          </ElCol>
        );
        currentSpan.value = curspan;
      });

      return (
        <ElRow gutter={props.rowGutter}>
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
    function onCollapse() {
      emit("onCollapse", !collapsed.value);
      collapsed.value = !collapsed.value;
    }

    /**渲染展开伸缩按钮 */
    function renderCollapsed() {
      return (
        //@ts-ignore
        <div onClick={onCollapse} class="h-queryForm__handelArea--collapse">
          <span class="collapse-text">{collapsed.value ? "展开" : "收起"}</span>
          {collapsed.value ? (
            <i class="collapse-icon iconfont icon-xiangxia-shuangjiantou"></i>
          ) : (
            <i class="collapse-icon iconfont icon-xiangshang-shuangjiantou"></i>
          )}
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
              ref="formRef"
              {...mergeProps(elFormProps, {
                labelPosition:
                  spanInfo.value.layout == "vertical"
                    ? "top"
                    : props.labelPosition || "right",
              })}
            >
              {renderELRow()}
            </ElForm>
          </div>
        </>
      );
    };
  },
  mounted() {
    this.injectTablePrimaryMethods();
  },
  methods: {
    /** 将elForm 暴露的方法转移到hqueryform */
    injectTablePrimaryMethods() {
      const _self = this as any;
      const elFormRef = _self["$refs"]["formRef"];
      const formMethodNameList = [
        "validate",
        "validateField",
        "resetFields",
        "scrollToField",
        "clearValidate",
      ];
      for (const methodName of formMethodNameList) {
        if (_self[methodName]) {
          console.warn(`the ${methodName} method is exist!, please rename it `);
        } else {
          _self[methodName] = elFormRef?.[methodName as keyof IFormExpose];
        }
      }
    },
  },
});
