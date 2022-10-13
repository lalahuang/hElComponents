/*
 * @Author: hzm
 * @Date: 2022-08-19 10:03:10
 * @Description: 
 */

import hTable from "./src/table";

import { withInstall } from "../utils";
export const HTable = withInstall(hTable);
export type HTableInstance = InstanceType<typeof HTable>;
export default HTable;
export * from "./src/types";
export * from "./src/props";



