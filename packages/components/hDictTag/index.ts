/*
 * @Author: hzm
 * @Date: 2022-08-23 10:17:52
 * @Description:
 */
import hDictTag from "./src/hDictTag.vue";

import { withInstall } from "@h-components/utils";
export const HDictTag = withInstall(hDictTag);

export type HDictTagInstance = InstanceType<typeof HDictTag>;
export default HDictTag;
export * from "./src/types";
