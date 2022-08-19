/*
 * @Author: hzm
 * @Date: 2022-08-19 10:03:10
 * @Description: 
 */

import {  createApp } from 'vue';
import { hTable }  from './table';
function install(app: ReturnType<typeof createApp>, options = {}) {
    app.component(hTable.name, hTable);
}
hTable.install = install

export default hTable



