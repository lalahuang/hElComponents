/*
 * @Author: hzm
 * @Date: 2022-08-19 10:33:46
 * @Description:
 *
 * //支持slots 、json传列表
 * <h-table
 * :columns=""
 *
 * >
 * </h-table>
 *
 *
 *
 *
 *
 */

import { defineComponent, App, PropType, createApp, ref, computed,onMounted,nextTick } from "vue";

import ToolLayout from "./tool";
import DictTag from "@comp/hDictTag/src/hDictTag.vue";
import { emitter } from "../../utils";
import useDataHandle from './composition/useDataHandle';
import { tableProps, paginationKeys,tableEmits } from './props';
import { FixHeader, ITableColumns, ITableExpose, TableColumn } from "./types";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import useHeaderTootip from './composition/useHeaderTootip';
import { get } from "lodash";
import { reactivePick  } from '@vueuse/core';
import { mergeProps  } from 'vue';
import { usePagination } from "./composition/usePagination";
import useFixHeader from './composition/useFixHeader';
import { isDefined  } from '@vueuse/core';
export default defineComponent({
  name: "HTbale",
  props: tableProps,
  components: {
    ToolLayout,
  },
  emits: tableEmits,
  provide() {
    // @ts-ignore
    return {
      column: this.columns,
    };
  },
  setup(props, { attrs, slots, emit }) {
    // const elTableRef = ref<ElTableType>();
    const columnList = ref(props.columns);
    console.log("columnList: ", columnList);
    const key = ref(0);
    //   监听设置变化
    emitter.on("updateColumns", (val) => {
      console.log("val: ", val);
      columnList.value = val as ITableColumns<any>;
      key.value = key.value + 1;
    });
    // 设置pagination props
    const paginationProps = reactivePick(props,  ...paginationKeys);
    const { currentChange, sizeChange } = usePagination(emit);

    return () => {
      // @ts-ignore
      const { data, columns, align } = props;
      const renderColumn = (columnDict: TableColumn, index: number) => {
        if (columnDict.hide) {
          return;
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
            return isDefined(data)&&data!=="" ? <span>{data}</span> : <>-</>;
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
        <div class="h-table" ref="hTableRef">
          <tool-layout
            v-slots={{
              leftHandleArea: () => {
                return slots.leftHandleArea && slots.leftHandleArea();
              },
              handleArea: () => {
                return slots.handleArea && slots.handleArea();
              },
            }}
          ></tool-layout>
          <el-table
            key={key.value}
            data={data}
            ref="elTableRef"
            {...attrs}
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
