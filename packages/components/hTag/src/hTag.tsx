import { defineComponent } from "vue";
import { hTagProps } from "./types";
export default defineComponent({
  name: "HTag",
  props: hTagProps,
  setup(this, props, ctx) {
    return ()=>(
      <div class="h-tag">
        <el-badge type={props.type} is-dot></el-badge>
        <span>{props.content}</span>
      </div>
    );
  },
});
