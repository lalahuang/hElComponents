/*
 * @Author: hzm
 * @Date: 2022-08-23 10:17:52
 * @Description: 
 */
import { createApp } from 'vue';
import hTag from './index.vue';
function install(app: ReturnType<typeof createApp>, options = {}) {
    app.component(hTag.name, hTag);
}
hTag.install = install

export default hTag
