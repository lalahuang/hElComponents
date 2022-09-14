import { ExtractPropTypes } from "vue";

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

export type HFormProps = ExtractPropTypes<typeof hFormProps>;
