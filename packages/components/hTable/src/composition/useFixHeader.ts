/*
 * @Author: hzm
 * @Date: 2022-10-20 11:04:36
 * @Description: 固定表头
 */
import { FixHeader } from "../types";
import { useScroll, isDefined } from '@vueuse/core';
import { watch,  } from "vue";

export default function useFixHeader(params:FixHeader,htableRef:HTMLElement) {
    const { top, scrollContainer } = params
    /** 获取table宽度 */
    const el = scrollContainer
      ? document.querySelector<HTMLElement>(scrollContainer)
        : document;
    const { x, y, isScrolling, arrivedState, directions } = useScroll(el);
    watch(() => y.value, (newValue, oldValue) => {
          /**htable 离滚动容器的高度 */
          const htableRefTopOffset = htableRef.offsetTop;
          /**htable 宽度 */
          const htableRefWidth = htableRef.clientWidth;
          const elTableHeader = htableRef.querySelector<HTMLElement>(
            ".el-table__header-wrapper"
          );
          const elTableBody = htableRef.querySelector<HTMLElement>(
            ".el-table__body-wrapper"
          );
          const elTable = htableRef.querySelector<HTMLElement>(".el-table");
          const elTableHeaderHeight = elTableHeader?.clientHeight ?? 0;
          const elTableBodyHeight = elTableBody?.clientHeight ?? 0;
          const elTableBodyTopOffset = elTable?.offsetTop ?? 0;
          if (
            y.value - htableRefTopOffset >= top &&
            y.value <= elTableBodyTopOffset + elTableBodyHeight
          ) {
            if (isDefined(elTableHeader)) {
              elTableHeader.style.position = "fixed";
              elTableHeader.style.width = htableRefWidth + "px";
              elTableHeader.style.zIndex = "200";
              elTableHeader.style.top = top + "px";
              if (isDefined(elTableBody)) {
                elTableBody.style.marginTop = elTableHeaderHeight + "px";
              }
            }
          } else {
            if (isDefined(elTableHeader)) {
              elTableHeader.style.position = "inherit";
              elTableHeader.style.width = "inherit";
              elTableHeader.style.zIndex = "inherit";
              elTableHeader.style.top = "inherit";
              if (isDefined(elTableBody)) {
                elTableBody.style.marginTop = "inherit";
              }
            }
          }
        
      
        
    })

    

};
