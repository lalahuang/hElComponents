/*
 * @Author: hzm
 * @Date: 2022-09-01 16:27:39
 * @Description: 
 */

import { ElBadgeType } from "packages/components/hTag/src/types"
import { ExtractPropTypes, PropType } from "vue"


export type DictTagOptions = {
    label: string,
    value: string | number,
    elTagType: ElBadgeType['type']
}

export type DictType = "hTag" | "elTag"

export const hDictTagProps = {
    // 数据
    options: {
        type: Array as PropType<DictTagOptions[]>,
        default: null,
    },
    // 当前的值
    value: [Number, String, Array],
    dictType: {
        type: String as PropType<DictType> ,
        default: "hTag"
    }
}

export type HDictTagProps = ExtractPropTypes<typeof hDictTagProps>

