/*
 * @Author: hzm
 * @Date: 2022-08-22 15:21:07
 * @Description: 
 */
import mitt from 'mitt';

const tableEvents={
    "lineSpaceChange": "default",
    "updateColumns":[]
}
const events = {
    ...tableEvents,

}

export const emitter = mitt<typeof events>();