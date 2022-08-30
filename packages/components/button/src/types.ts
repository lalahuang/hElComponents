/*
 * @Author: hzm
 * @Date: 2022-08-30 10:56:06
 * @Description: 
 */
import { ExtractPropTypes } from "vue";

export const buttonProps = {
    title: {
        type: String,
        default: "默认按钮",
    },
    testProp: {
        type: String,
        default: "默认按钮",
    },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>