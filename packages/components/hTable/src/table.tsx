/*
 * @Author: hzm
 * @Date: 2022-08-19 10:33:46
 * @Description:
 * 
 */

import {
  defineComponent,
  ref,
  provide,
} from "vue";

import ToolLayout from "./tool";
import useDataHandle from "./composition/useDataHandle";
import { tableProps, paginationKeys, tableEmits } from "./props";
import { FixHeader, ITableExpose, TableColumn } from "./types";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import useHeaderTootip from "./composition/useHeaderTootip";
import { get } from "lodash-es";
import { reactivePick,reactiveOmit } from "@vueuse/core";
import { mergeProps } from "vue";
import { usePagination } from "./composition/usePagination";
import useFixHeader from "./composition/useFixHeader";
import { isDefined } from "@vueuse/core";
import useLineSpaceChange from "./composition/useLineSpaceChange";
export default defineComponent({
  name: "HTbale",
  props: tableProps,
  components: {
    ToolLayout,
  },
  emits: tableEmits,
  
  setup(props, { attrs, slots, emit }) {
    // const elTableRef = ref<ElTableType>();
    const columnList = ref(props.columns);
    /**注入column 供设置使用 */
    provide("column", columnList);
    /**注入行距 供设置使用 */
    /** 监听行距变化 */
    const { spaceClass,lineSpaceChange } = useLineSpaceChange(props.lineSpace);
    provide("lineSpaceSet", { propSpace: props.lineSpace, lineSpaceChange });
    /**筛选elTable选项 */
    const tablePropsPick = reactiveOmit(
      props,
      ...paginationKeys,
      "showSettingIcon",
      "columns",
      "fixHeader",
      "showOverflowTooltip",
      "align",
      "headerAlign",
      "lineSpace"
    );

    // 设置pagination props
    const paginationProps = reactivePick(props, ...paginationKeys);
    /** toolprops */
    const toolProps = reactivePick(
      props,
      "showSettingIcon",
      "showLineSpaceIcon"
    );
    const { currentChange, sizeChange } = usePagination(emit);

    return () => {
      // @ts-ignore
      const { data, columns, align } = props;
      const renderColumn = (columnDict: TableColumn, index: number) => {
        if (columnDict.hide) {
          return;
        } else {
          /**初始化 */
          columnDict.hide = false;
        }
        const { render, slotName, headerSlotName, children, ...restAtts } =
          columnDict;
        const { prop, columnType, options, headerDescription } = restAtts;
        const vSlots: {
          default?: ({
            row,
            column,
            $index,
          }: {
            row: any;
            column: TableColumnCtx<any>;
            $index: number;
          }) => any;
          header?: ({
            column,
            $index,
          }: {
            column: TableColumnCtx<any>;
            $index: number;
          }) => any;
        } = {};

        // 空数据处理
        if (prop) {
          vSlots.default = (scope) => {
            const data = get(scope.row, prop);
            return isDefined(data) && data !== "" ? (
              <span>{data}</span>
            ) : (
              <>-</>
            );
          };
        }
        if (typeof render === "function") {
          vSlots.default = (scope) => {
            if (restAtts.prop) {
              return render(scope, scope.row[restAtts.prop]);
            }
            return render(scope);
          };
        }

        if (slotName && typeof slots[slotName] === "function") {
          vSlots.default = (scope) =>
            (slots[slotName] as (scope: any) => {})(scope);
        }
        /** 复杂组件渲染 */
        if (columnType) {
          useDataHandle({
            prop,
            vSlots,
            columnType,
            options,
          });
        }

        /**header slot */

        if (headerSlotName && slots[headerSlotName]) {
          vSlots.header = (scope) =>
            (slots[headerSlotName] as (scope: any) => {})(scope);
        } else if (headerDescription) {
          /** 头部描述 */
          vSlots.header = (scope) => useHeaderTootip(scope, headerDescription);
        }

        if (children?.length ?? 0 > 0) {
          vSlots.default = (scope) => {
            return children?.map(renderColumn) ?? [];
          };
        }

        return (
          <el-table-column
            key={index}
            align={align}
            {...restAtts}
            v-slots={vSlots}
          />
        );
      };
      const columnsSlots = columnList?.value?.map(renderColumn) ?? [];
      return (
        <div
          class={
            (() => {
              let defalutClass = `h-table ${spaceClass.value} `
              defalutClass+=props.height == "100%"
              ? "isFixedHeader"
              : ''
              return defalutClass
            })()
          }
          ref="hTableRef"
        >
          <div class="h-table__container">
            <tool-layout
              {
              ...toolProps
              }
              v-slots={{
                leftHandleArea: () => {
                  return slots.leftHandleArea && slots.leftHandleArea();
                },
                handleArea: () => {
                  return slots.handleArea && slots.handleArea();
                },
              }}
            ></tool-layout>
            <div class="h-table__container--eltable">
              <el-table
                v-loading={props.loading}
                ref="elTableRef"
                {...mergeProps(tablePropsPick, attrs)}
                v-slots={{
                  append: () => {
                    return slots.append && slots.append();
                  },
                  empty: () => {
                    return slots.empty && slots.empty();
                  },
                }}
              >
                {columnsSlots}
              </el-table>
            </div>

            {props.total ? (
              <div class="h-table__pagination">
                <el-pagination
                  {...mergeProps(paginationProps, {
                    "onUpdate:pageSize": sizeChange,
                    "onUpdate:currentPage": currentChange,
                  })}
                />
              </div>
            ) : null}
          </div>
        </div>
      );
    };
  },
  mounted() {
    // @ts-ignore
    this.injectTablePrimaryMethods();
    this.handelFixHeader();
  },
  methods: {
    handelFixHeader() {
      const _self = this as any;
      const hTableRef = _self["$refs"]["hTableRef"];
      if (isDefined(this.fixHeader)) {
        useFixHeader(this.fixHeader as FixHeader, hTableRef);
      }
    },
    injectTablePrimaryMethods() {
      const _self = this as any;
      const elTableRef = _self["$refs"]["elTableRef"];
      const tableMethodNameList = [
        "clearSelection",
        "toggleRowSelection",
        "toggleAllSelection",
        "toggleRowExpansion",
        "setCurrentRow",
        "clearSort",
        "clearFilter",
        "doLayout",
        "sort",
        "getSelectionRows",
        "scrollTo",
        "setScrollTop",
        "setScrollLeft",
      ];
      for (const methodName of tableMethodNameList) {
        if (_self[methodName]) {
          console.warn(`the ${methodName} method is exist!, please rename it `);
        } else {
          _self[methodName] = elTableRef?.[methodName as keyof ITableExpose];
        }
      }
    },
  },
});
