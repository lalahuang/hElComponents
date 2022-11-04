import { FormItemProp } from "element-plus/es/components/form/src/form-item";
import { Arrayable } from "element-plus/es/utils";
import { ExternalParam, ValidateFieldsError } from "../../../components/commonTypes";

/*
 * @Author: hzm
 * @Date: 2022-10-27 14:41:01
 * @Description: 
 */
export type SpanConfig =
  number
  | {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
      [key: string]: number;
    }
export type FormLayout = "horizontal" | "vertical";


/** form 暴露出来的方法 */
export interface IFormExpose<T = ExternalParam> {
  validate: (
    callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void
  ) => Promise<void>;
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void
  ) => Promise<void>;
  resetFields: (props?: Arrayable<FormItemProp>) => void;
  scrollToField: (prop: FormItemProp) => void;
  clearValidate: (props?: Arrayable<FormItemProp>) => void;
}