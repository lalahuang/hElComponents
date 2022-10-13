/*
 * @Author: hzm
 * @Date: 2022-10-13 15:52:15
 * @Description: 
 */

import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

import { QuestionFilled } from "@element-plus/icons-vue";
export default function useHeaderTootip(
  {
    column,
    
    $index,
  }: {
    column: TableColumnCtx<any>;
    $index: number;
  },
  headerDescription:string
) {
console.log("column: ", column);
    return (
      <div class="h-table-header_tooltip">
        {column.label}
        <el-tooltip
          effect="dark"
          content={headerDescription}
          placement="top-start"
        >
          <el-icon>
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </div>
    );



};
