import { CopyDocument, Check } from "@element-plus/icons-vue";
import { defineComponent, ref } from 'vue';
import { hCopyProps } from './props';
import useClipboard from "vue-clipboard3";
import { modal } from '@/components/utils';
import { useTimeoutFn } from "@vueuse/core";
/*
 * @Author: hzm
 * @Date: 2022-10-18 10:20:54
 * @Description: 复制组件
 */


export default defineComponent({
    name:"HCopy",
    props:hCopyProps,
    setup(props, { slots,attrs}) {
        const { toClipboard } = useClipboard();
        const copyStatus = ref(false);
        const { start, isPending } = useTimeoutFn(() => {
          copyStatus.value = false;
        }, 2000);
        const copyContext = () => {
            if (props.context) { 
                toClipboard(props.context).then(() => {
                    modal.msgSuccess("复制成功")
                    copyStatus.value = true;
                    start();
                });
            } else {
                modal.msgWarning("无内容，复制失败");
            }
        }

        return () => (
          <el-space class="h-copy">
            <div>{props.context}</div>
            <el-icon class="h-copy__icon ">
              {copyStatus.value ? (
                <Check class="h-copy__icon--success" />
              ) : (
                <CopyDocument onClick={copyContext} />
              )}
            </el-icon>
          </el-space>
        );





    },
})
