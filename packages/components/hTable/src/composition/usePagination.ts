/*
 * @Author: hzm
 * @Date: 2022-10-19 13:34:20
 * @Description: 分页透传事件
 */

import { ITableEmits } from "../types";

export function usePagination(emit: ITableEmits): {
  sizeChange: (size: number) => void;
  currentChange: (current: number) => void;
} {
  function sizeChange(size: number) {
    
    emit("update:pageSize", size);
    emit("load")
  }

    function currentChange(current: number) {
        console.log("current: number: ", current);
      
    emit("update:currentPage", current);
    emit("load");
  }

  return {
    sizeChange,
    currentChange,
  };
}

