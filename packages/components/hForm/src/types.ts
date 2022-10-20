import type { Mutable, UnknownObject } from "../../../../types/common";
import type { ColProps, FormItemProps } from "element-plus";
import { Component, ExtractPropTypes } from "vue";

export const hFormProps = {
  modelVaue: {
    type: Object,
    default: () => {},
  },
  columns: {
    type: Array,
    default: () => [],
  },
};

export interface FormColumn<T = any>
  extends Mutable<Partial<Omit<FormItemProps, "prop">>>,
    Partial<Omit<ColProps, "tag">> {
  /** component name */
  component?: string | Component;
  /** props for component */
  props?: UnknownObject;
  /** sub-form */
  // children?: IFormColumns<FormColumnChildren<T>>;
  /** max number of sub-form */
  // max?: number;
  /** keys of model that passed to form */
  prop: ColumnProp<T>;
}

export const hFormItemProps = {
  modelVaue: {
    type: Object,
    default: () => {},
  },
  item: {
    type: Object,
    default: () => {},
  },
  labelDes: {
    type: String,
    default: "",
  },
};

export type HFormProps = ExtractPropTypes<typeof hFormProps>;
