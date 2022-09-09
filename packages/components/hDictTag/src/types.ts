/*
 * @Author: hzm
 * @Date: 2022-09-01 16:27:39
 * @Description:
 */

// import type { ElBadgeType } from "packages/components/hTag/src/types";
import type ElBadge from "element-plus/lib/components/badge";
import type ElSpace from "element-plus/lib/components/space";
import { ExtractPropTypes, PropType } from "vue";
export type ElBadgeType = InstanceType<typeof ElBadge>;
export type ElSpaceType = InstanceType<typeof ElSpace>;
export type DictTagOptions = {
  label: string;
  value: string | number;
  dictType: DictType;
  elTagType: ElBadgeType["$props"]["type"];
};

export type DictType = "hTag" | "elTag" | "text";

export const hDictTagProps = {
  // 数据
  options: {
    type: Array as PropType<DictTagOptions[]>,
    default: null,
  },
  // 当前的值
  value: [Number, String, Array],
  direction: {
    type: String as PropType<ElSpaceType["$props"]["direction"]>,
    default: "horizontal",
  },
};

export type HDictTagProps = ExtractPropTypes<typeof hDictTagProps>;
