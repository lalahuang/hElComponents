/*
 * @Author: hzm
 * @Date: 2022-08-30 10:32:24
 * @Description: 
 */
import '@vue/runtime-core'
declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        HTag: typeof import('./hTag')['HTag']
        HTable: typeof import('./hTable')['HTable']
    }
}

export { }
