/*
 * @Author: hzm
 * @Date: 2022-09-15 16:32:51
 * @Description:
 */
import { defineComponent } from "vue";
import { hFormProps } from "./types";
export default defineComponent({
  name: "HFormItem",
  props: hFormProps,
  setup(props, { attrs, slots }) {
    return () => <div>formIten</div>;
  },
});
