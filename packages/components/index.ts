/*
 * @Author: hzm
 * @Date: 2022-08-19 10:00:37
 * @Description: 
 */
// filename: packages/index.ts
// import HTable from './hTable';
// import HTag from './hTag';
// import HDictTag from './dictTag';
// import HQueryWapper from './queryWapper';
import Button from './button';

// const components = [HTable, HTag, HDictTag, HQueryWapper];
// // 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
// const install = function (Vue: any) {
//     // 遍历注册全局组件
//     components.forEach(component => {
//         Vue.component(component.name, component)
//     })
// }
/**按需引入 */
export {
    // HTable,
    // HTag,
    // HDictTag,
    // HQueryWapper,
    Button
};
    
    
export default {
    // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
    // install,
}
