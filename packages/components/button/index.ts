/*
 * @Author: hzm
 * @Date: 2022-08-26 15:04:16
 * @Description: 
 */

import Button from './src/button.vue';

import { withInstall  } from '@h-components/utils';
export const HButton = withInstall(Button)

export type HButtonInstance = InstanceType<typeof HButton>
export default HButton;
export * from './src/types'