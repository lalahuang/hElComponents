<!--
 * @Author: hzm
 * @Date: 2022-08-23 10:24:27
 * @Description: 
-->
<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="checkIsInclude(item.value)">
        <span
          v-if="item.elTagType == 'default' || item.elTagType == ''"
          :key="item.value"
          :index="index"
          :class="item.elTagType"
          >{{ item.label }}</span
        >
        <h-tag
          v-else
          :key="item.value + ''"
          :disable-transitions="true"
          :index="index"
          :content="item.label"
          :type="item.elTagType"
          :class="item.elTagType"
        ></h-tag>
      </template>
    </template>
    <!-- 都不存在显示- -->
    <span v-if="isEmpty">-</span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref,PropType } from 'vue';


export default defineComponent({
    name:"dictTag"
})
</script>

<script setup lang="ts">
import HTag from '../hTag/index.vue';
const props = defineProps({
  // 数据
  options: {
    type: Array as PropType<DictTagOptions[]> ,
    default: null,
  },
  // 当前的值
  value: [Number, String, Array],
});
const isEmpty = ref(false);
let count = 0;
function checkIsInclude(value:string|number) {
  if (values.value.includes(value)) {
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
  if (props.value !== null && typeof props.value !== 'undefined') {
    return Array.isArray(props.value) ? props.value : [String(props.value)];
  } else {
    isEmpty.value = true;
    return [];
  }
});
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
