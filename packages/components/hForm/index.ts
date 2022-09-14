/*
 * @Author: hzm
 * @Date: 2022-09-14 16:36:50
 * @Description:
 */

import hFrom from "./src/hFrom";

import { withInstall } from "@h-components/utils";
export const HForm = withInstall(hFrom);

export type HFormInstance = InstanceType<typeof HForm>;
export default HForm;
export * from "./src/types";
