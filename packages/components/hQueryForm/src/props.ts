/*
 * @Author: hzm
 * @Date: 2022-10-27 14:15:40
 * @Description: 
 */

import { formProps } from "element-plus";

export const hQueryFormProp = {
  ...formProps,
  showLength: {
    type: Number,
    default: 0,
  },
  operationFollow: {
    type: Boolean,
    default: true,
  },
};

export const hQueryFormEmits = {
  onCollapse: (collapse: boolean) => true,
};



