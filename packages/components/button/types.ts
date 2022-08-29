/*
 * @Author: hzm
 * @Date: 2022-08-29 14:35:22
 * @Description: 
 */

import { ExtractPropTypes } from "vue";

export const buttonProps = {
    title: {
        type: String,
        default: "默认按钮",
    },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>