/*
 * @Author: hzm
 * @Date: 2022-10-18 10:20:29
 * @Description: 
 */
import hCopy from "./src/hCopy";

import { withInstall } from "../utils";
export const HCopy = withInstall(hCopy);

export type HCopyInstance = InstanceType<typeof HCopy>;
export default HCopy;
export * from "./src/props";