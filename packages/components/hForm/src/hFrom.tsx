/*
 * @Author: hzm
 * @Date: 2022-09-14 16:37:23
 * @Description:
 */

import { defineComponent } from "vue";
import { hFormProps } from "./types";
export default defineComponent({
  name: "HForm",
  props: hFormProps,
  setup(props, { attrs, slots }) {
    return () => <div>123</div>;
  },
});
