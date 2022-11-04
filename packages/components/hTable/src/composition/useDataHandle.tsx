/*
 * @Author: hzm
 * @Date: 2022-08-23 09:35:39
 * @Description:
 */
import { getFirstImage } from "@/components/utils";
import {  get, isArray } from "lodash-es";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ColumnTypeOptions, columnType } from '../types';

import HMoreBox from "../../../hMoreBox";
import HCopy from "../../../hCopy";
import DictTag from "../../../hDictTag";
import { isRef } from "vue";

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
        const optionList = isRef(options?.list)
          ? options?.list?.value
          : options?.list;
        return <DictTag options={optionList ?? []} value={data}></DictTag>;
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
                console.log("context: ", context, scope.row);
                return isArray(context) ? context : context?.children;
              },
            }}
          ></HMoreBox>
        );
      };
    }
  }
