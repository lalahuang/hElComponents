/*
 * @Author: hzm
 * @Date: 2022-08-23 09:35:39
 * @Description:
 */
import { getFirstImage } from "@/components/utils";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { get, isArray } from "lodash";
import { ColumnTypeOptions, columnType } from '../types';

import HMoreBox from "../../../hMoreBox";
import HCopy from "../../../hCopy";
import { h } from "vue";

export default function useDataHandle({
  prop,
  vSlots,
  columnType,
  options,
}: {
  prop?: string;
  vSlots: {
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
  };
  columnType?: columnType;
  options?: ColumnTypeOptions;
  }) {
    //复制
  if (prop && columnType == "copy") {
      vSlots.default = (scope) => {
        const data = get(scope.row, prop);
        return data ? (
          <HCopy context={data}></HCopy>
        ) : (
          <span>-</span>
        );
      };
    }
    // 图片处理
    if (prop && columnType == "image") {
      vSlots.default = (scope) => {
        const data = get(scope.row, prop);
        return data ? (
          <el-image
            src={getFirstImage(data)}
            preview-src-list={data?.split(",") ?? []}
            class="h-table__column-image"
            fit="fill"
            preview-teleported={true}
          ></el-image>
        ) : (
          <span>-</span>
        );
      };
    }
    // 选项
    if (prop && columnType == "dict") {
      vSlots.default = (scope) => {
        const data = get(scope.row, prop);
        return <dict-tag options={options?.list ?? []} value={data}></dict-tag>;
      };
    }

    /**h-more-box */
    if (columnType == "menu") {
      const slot = vSlots.default;
      vSlots.default = (scope) => {
        return (
          <HMoreBox
            v-slots={{
              default: () => {
                const context = slot?.(scope);
                return isArray(context) ? context : context?.children;
              },
            }}
          ></HMoreBox>
        );
      };
    }
  }
