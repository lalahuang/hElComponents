/*
 * @Author: hzm
 * @Date: 2022-08-23 10:17:52
 * @Description: 
 */
import hTag from './src/hTag';

import { withInstall } from '../utils';
export const HTag = withInstall(hTag)

export type HTagInstance = InstanceType<typeof HTag>
export default HTag;
export * from './src/types'
