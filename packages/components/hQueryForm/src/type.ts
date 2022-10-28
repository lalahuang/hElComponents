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
    };
export  type FormLayout = "horizontal" | "vertical";
