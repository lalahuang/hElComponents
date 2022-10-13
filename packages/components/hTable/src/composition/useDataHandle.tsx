/*
 * @Author: hzm
 * @Date: 2022-08-23 09:35:39
 * @Description:
 */
import { getFirstImage } from "@/components/utils";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { get } from "lodash";
import { ColumnTypeOptions,columnType } from '../types';

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
  // 空数据处理
  if (prop) {
    vSlots.default = (scope) => {
      const data = get(scope.row, prop);
      return data ? <span>{data}</span> : <>-</>;
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
          class="column-image"
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
}
