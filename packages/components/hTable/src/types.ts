/*
 * @Author: hzm
 * @Date: 2022-10-12 09:00:53
 * @Description: 
 */
import { tableProps, tableEmits } from "./props";
import type { VNode } from "vue";
import type { Placement  } from "element-plus";
import type {
  IDefineProps,
  IDefineEmits,
  UnknownFunction,
  UnknownObject,
  MaybeArray,
  ExternalParam,
  ColumnProp,
  Paths
} from "../../commonTypes";
import type { DictTagOption } from "../../hDictTag";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { MaybeRef } from '../../commonTypes';


/** Table Column Options for pro-table */
export interface TableColumnsProps {
  /** whether to hide extra content and show them in a tooltip when hovering on the cell */
  showOverflowTooltip?: boolean;
  /** alignment */
  align?: "left" | "center" | "right";
  /** alignment of the table header. If omitted, the value of the above align attribute will be applied */
  headerAlign?: "left" | "center" | "right";
}

export interface TableCommonColumn<T = ExternalParam> extends TableColumnsProps {
  type?: "selection" | "index" | "expand";
  /** column label */
  label?: string;
  /** column width */
  width?: string;
  /** column minimum width. Columns with width has a fixed width, while columns with min-width has a width that is distributed in proportion */
  minWidth?: string;
  /** whether column is fixed at `left` `right` */
  fixed?: boolean | "left" | "right";
  /** render function for table header of this column */
  renderHeader?: UnknownFunction;
  /** whether column can be sorted. Remote sorting can be done by setting this attribute to 'custom' and listening to the sort-change event of Table */
  sortable?: boolean | "custom";
  /** sorting method, works when sortable is true */
  sortMethod?: (a: unknown, b: unknown) => number;
  /** specify which property to sort by, works when sortable is true and sort-method is undefined. If set to an Array, the column will sequentially sort by the next property if the previous one is equal */
  sortBy?: string | string[] | ((row: T, index: number) => void);
  /** the order of the sorting strategies used when sorting the data, works when sortable is true. Accepts an array, as the user clicks on the header, the column is sorted in order of the elements in the array */
  sortOrders?: Array<"ascending" | "descending" | null>;
  /** whether column width can be resized, works when border of pro-table is true */
  resizable?: boolean;
  /** function that formats cell content */
  formatter?: UnknownFunction;
  /** class name of cells in the column */
  className?: string;
  /** class name of the label of this column */
  labelClassName?: string;
  /** an array of data filtering options. For each element in this array, text and value are required */
  filters?: Array<"text" | "value" | string>;
  /** placement for the filter dropdown */
  filterPlacement?: Placement;
  /** whether data filtering supports multiple options */
  filterMultiple?: boolean;
  /** data filtering method. If filter-multiple is on, this method will be called multiple times for each row, and a row will display if one of the calls returns true */
  filterMethod?: UnknownFunction;
  /** filter value for selected data, might be useful when table header is rendered with render-header */
  filteredValue?: unknown[];
  /** function that determines if a certain row can be selected */
  selectable?: (row: T, index: number) => unknown;
  /** whether to reserve selection after data refreshing. Note that row-key is required for this to work */
  reserveSelection?: boolean;
  index?: number | ((index: number) => number | string);
  /**表头 */
  fixHeader?: FixHeader;
}
/** 组件选项 */
export interface ColumnTypeOptions {
  /** 数据列表 */
  list?:MaybeRef<DictTagOption[]>;
}
export type columnType = "dict" | "image" | "menu" | "copy";


/** Table Column Options */
export interface TableColumn<T = ExternalParam> extends TableCommonColumn<T> {
  /** 获取T类型键 */
  prop?: Paths<T>;
  /** 嵌套表格 */
  children?: ITableColumns<T>;
  /** 是否隐藏当前列 */
  hide?: boolean;
  /** render函数支持h()写法以及 tsx写法 */
  render?: (
    {
      row,
      column,
      $index,
    }: { row: T; column: TableColumnCtx<T>; $index: number },
    value?: any
  ) => string | MaybeArray<VNode>;
  columnType?: columnType;
  /**Table-column  header slot的名字  */
  headerSlotName?: string;
  /** template 模式下 slot名称 */
  slotName?: string;
  /** 表格单元格组件选项 */
  options?: ColumnTypeOptions;
  /** 表头描述 */
  headerDescription?: string;
  
}

/** Table Columns Options */
export type ITableColumns<T = ExternalParam> = Array<
  TableColumn<T> 
>;



/** Table Expose Methods */
export interface ITableExpose<T = ExternalParam> {
  /** used in multiple selection Table, clear user selection */
  clearSelection: () => void;
  /** used in multiple selection Table, toggle if a certain row is selected. With the second parameter, you can directly set if this row is selected */
  toggleRowSelection: (row: T, selected?: boolean) => void;
  /** used in multiple selection Table, toggle select all and deselect all */
  toggleAllSelection: () => void;
  /** used in expandable Table or tree Table, toggle if a certain row is expanded. With the second parameter, you can directly set if this row is expanded or collapsed */
  toggleRowExpansion: (row: T, expanded?: boolean) => void;
  /** used in single selection Table, set a certain row selected. If called without any parameter, it will clear selection */
  setCurrentRow: (row?: T) => void;
  /** clear sorting, restore data to the original order */
  clearSort: () => void;
  /** clear filters of the columns whose columnKey are passed in. If no params, clear all filters */
  clearFilter: (columnKeys?: MaybeArray<string>) => void;
  doLayout: () => void;
  sort: (prop: string, order: string) => void;
}

export type ITableProps = IDefineProps<typeof tableProps>;
export type ITableEmits = IDefineEmits<typeof tableEmits>;




/**
 * Type helper to make it easier to define columns
 * @param columns the columns of Table
 */
export function defineTableColumns<T = ExternalParam>(
  columns: ITableColumns<T>
): ITableColumns<T> {
  return columns;
}

/** 表头 */

export type FixHeader = {
  top: number;
  scrollContainer?:string 
}


