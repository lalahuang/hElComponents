/*
 * @Author: hzm
 * @Date: 2022-08-19 10:00:37
 * @Description: 
 */
import { App } from 'vue';

import * as components from './components';
export * from './components';
// // 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
export const install = (app: App): App => {
    Object.entries(components).forEach(([key, value]): void => {
        //@ts-ignore
        app.component(key, value)
    })
    return app
}

    
    
export default {
    install,
}
