/*
 * @Author: hzm
 * @Date: 2022-10-13 16:32:40
 * @Description: 
 */
import hMoreBox from "./src/hMoreBox";

import { withInstall } from "../utils";
export const HMoreBox = withInstall(hMoreBox);

export type HMoreBoxInstance = InstanceType<typeof HMoreBox>;
export default HMoreBox;