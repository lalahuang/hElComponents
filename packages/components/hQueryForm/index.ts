/*
 * @Author: hzm
 * @Date: 2022-10-27 14:06:29
 * @Description:  搜索表单
 */
import hQueryForm from "./src/hQueryForm";

import { withInstall } from "../utils";
export const HQueryForm = withInstall(hQueryForm);

export type HQueryFormInstance = InstanceType<typeof HQueryForm>;
export default HQueryForm;
export * from "./src/props"
export * from "./src/type"