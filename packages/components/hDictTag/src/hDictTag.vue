<!--
 * @Author: hzm
 * @Date: 2022-09-01 16:27:51
 * @Description: 
-->
<!--
 * @Author: hzm
 * @Date: 2022-08-23 10:24:27
 * @Description: 
-->
<template>
  <div class="hDictTag">
    <el-space wrap :direction="direction">
      <template v-for="(item, index) in options">
        <template v-if="checkIsInclude(item.value)">
          <span
            v-if="item.dictType == 'text'"
            :key="item.value"
            :index="index"
            :class="item.elTagType"
            >{{ item.label }}</span
          >
          <h-tag
            v-else-if="item.dictType == 'hTag'"
            :key="item.value + ''"
            :content="item.label"
            :type="item.elTagType"
          ></h-tag>
          <el-tag
            v-else-if="item.dictType == 'elTag'"
            :disable-transitions="true"
            :index="index"
            :type="item.elTagType == 'primary' ? void 0 : item.elTagType"
            :class="item.elTagType"
          >
            {{ item.label }}
          </el-tag>
        </template>
      </template>
    </el-space>
    <!-- 都不存在显示- -->
    <span v-if="isEmpty">-</span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "HDictTag",
});
</script>

<script setup lang="ts">
import HTag from "../../hTag/index";
import { hDictTagProps } from "./types";
const props = defineProps(hDictTagProps);
console.log('props: ', props);
const isEmpty = ref(false);
let count = 0;
function checkIsInclude(value: string | number) {

  if (values.value.includes(String(value))) {
    
    isEmpty.value = false;
    return true;
  } else {
    count++;
    if (count == props.options.length) {
      isEmpty.value = true;
    }
    return false;
  }
  
}

const values = computed(() => {
  if (props.value !== null && typeof props.value !== "undefined") {
    
    return Array.isArray(props.value) ? props.value : [String(props.value)];
  } else {
    isEmpty.value = true;
    return [];
  }
});
</script>
