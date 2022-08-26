<template>
  <div class="h-tag">
    <el-badge :type="type" is-dot></el-badge>
    <span>{{ content }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name:"hTag"
})
</script>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
  },
  content: {
    type: String,
    default: '',
  },
});
</script>


<style scoped lang="scss" >
.h-tag {
  :deep(.el-badge__content) {
    display: block;
    margin-right: 6px;
  }
  display: flex;
  align-items: center ;
}


</style>