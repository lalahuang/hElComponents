/*
 * @Author: hzm
 * @Date: 2022-10-27 14:15:40
 * @Description: 
 */

import { formProps } from "element-plus";


type formPropsKeys = Array<keyof typeof formProps>;
export const formKeys = Object.keys(formProps) as formPropsKeys;
export const hQueryFormProp = {
  ...formProps,
  showLength: {
    type: Number,
    default: 0,
  },
  operationFollow: {
    type: Boolean,
    default: false, //默认不跟随
  },
  rowGutter: {
    type: Number,
    default: 16,
  },
  collapsed: {
    type: Boolean,
    default: true,
  },
};

export const hQueryFormEmits = {
  onCollapse: (collapse: boolean) => true,
};



