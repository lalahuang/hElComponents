
/*
 * @Author: hzm
 * @Date: 2022-08-23 10:17:52
 * @Description: 
 */
import { createApp } from 'vue';
import dictTag from './index.vue';
function install(app: ReturnType<typeof createApp>, options = {}) {
    app.component(dictTag.name, dictTag);
}
dictTag.install = install

export default dictTag
