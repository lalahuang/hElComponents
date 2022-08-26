/*
 * @Author: hzm
 * @Date: 2022-08-26 14:49:28
 * @Description: 
 */
import { createApp } from 'vue';

function withInstall(component) {
    app.component(component.name, component);
} 

export default {
    withInstall

};