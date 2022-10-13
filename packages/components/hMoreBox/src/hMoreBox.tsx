/*
 * @Author: hzm
 * @Date: 2022-10-13 16:33:31
 * @Description: 
 */

import { defineComponent } from "vue";
import { ArrowDown  } from "@element-plus/icons-vue";
import { hMoreBoxProps } from './props';
export default defineComponent({
  name: "HMoreBox",
  props: hMoreBoxProps,
    setup(props, { attrs, slots }) {
      /**获取元素 */

    return () => (
      <el-dropdown
        v-slots={{
          dropdown: () => (
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-link type="primary" href="" target="_blank">
                  123
                </el-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="primary" size="default">
                  按钮
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
            </el-dropdown-menu>
          ),
        }}
      >
        <span class="el-dropdown-link">
          Dropdown List
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
      </el-dropdown>
    );
  },
});