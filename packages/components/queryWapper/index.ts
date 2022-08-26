/*
 * @Author: hzm
 * @Date: 2022-08-23 14:32:01
 * @Description: 
 */
import { createApp } from 'vue';
import queryWapper from './index.vue';
function install(app: ReturnType<typeof createApp>, options = {}) {
    app.component(queryWapper.name, queryWapper);
}
queryWapper.install = install

export default queryWapper