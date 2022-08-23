/*
 * @Author: hzm
 * @Date: 2022-08-23 09:35:39
 * @Description:
 */
import { get } from "lodash";

export default function useDataHandle({
  prop,
  vSlots,
  columnType,
  options,
}: {
  prop: string;
  vSlots: {
    default?: (scope: Record<string, any>) => any;
    header?: (scope: Record<string, any>) => any;
  };
  columnType?: "image";
  options: DictTagOptions[];
}) {
  // 空数据处理
  if (prop) {
    vSlots.default = (scope) => {
      const data = get(scope.row, prop);
      return data ? <span>data </span> : <  >-</  >;
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
  if (prop && options) {
    vSlots.default = (scope) => {
      const data = get(scope.row, prop);
      return <dict-tag options={options} value={data}></dict-tag>;
    };
  }

  function getFirstImage(str: string, delimiter = ",") {
    if (str) {
      return str.split(delimiter)?.[0] ?? "";
    }
    return "";
  }
}
