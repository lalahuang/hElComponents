/*
 * @Author: hzm
 * @Date: 2022-10-24 12:51:30
 * @Description: 
 */
import { computed } from "vue";
import { stripEmpty } from "../utils";

export default function useSlot(slot:()=>any[]) {
  const visibleSlotEntries = computed(() => {
    return (slot && stripEmpty(slot())) || [];
  });

  const isSlotVisible = computed(() => {
    return visibleSlotEntries.value.length > 0;
  });


  return {
    visibleSlotEntries,
    isSlotVisible,
  };
}