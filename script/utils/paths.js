/*
 * @Author: hzm
 * @Date: 2022-08-31 13:15:05
 * @Description: 
 */
const {resolve}=require("path")
//组件库根目录

exports.componentPath = resolve(__dirname, '../../packages/components')
exports.uitlsPath = resolve(__dirname, '../../packages/utils')
exports.rootPath = resolve(__dirname, '../../')