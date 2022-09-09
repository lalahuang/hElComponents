/*
 * @Author: hzm
 * @Date: 2022-09-01 13:47:17
 * @Description:
 */

import { ExtractPropTypes, PropType } from "vue";
import type ElBadge from "element-plus/lib/components/badge";
export type ElBadgeType = InstanceType<typeof ElBadge>;

export const hTagProps = {
  type: {
    type: String as PropType<ElBadgeType["$props"]["type"]>,
    default: "primary",
  },
  content: {
    type: String,
    default: "",
  },
};

export type HTagProps = ExtractPropTypes<typeof hTagProps>;
