<!--
 * @Author: hzm
 * @Date: 2022-08-23 12:55:31
 * @Description: 
-->

<template>
  <div ref="containerRef">
    <children :key="key"></children>
  </div>
</template>

<script lang="ts" setup name="QueryFormWrapper">
import { useResizeObserver } from '@vueuse/core';
import { ElRow, ElCol, ElIcon } from 'element-plus';
import { ref, useSlots, VNode,h, resolveComponent } from 'vue';

const props = defineProps({
  showLength: {
    type: Number,
    default: 0,
  },
});

const containerRef = ref(null);
const $slots = useSlots?.()?.default?.()??[];
const slots = useSlots();
const key = ref(0);
const spanInfo = ref({
  span: 6,
  layout: 'horizontal',
});
const itemLength = ref(0);
const totalSpan = ref(0);
const totalSize = ref(0);
const showLength = ref(1);
const firstRowFull = ref(false);
const currentSpan = ref(0);
// 是否收起
const collapsed = ref(true);
const emits = defineEmits(['onCollapse']);

useResizeObserver(containerRef, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  spanInfo.value = getSpanConfig('horizontal', width);
  key.value += 1;
});

const CONFIG_SPAN_BREAKPOINTS:{[key in string ]:number}  = {
  xs: 513,
  sm: 513,
  md: 785,
  lg: 992,
  xl: 1057,
  xxl: Infinity,
};
/** 配置表单列变化的容器宽度断点 */
const BREAKPOINTS = {
  vertical: [
    [513, 1, 'vertical'],
    [785, 2, 'vertical'],
    [1057, 3, 'vertical'],
    [Infinity, 4, 'vertical'],
  ],
  default: [
    [513, 1, 'vertical'],
    [701, 2, 'vertical'],
    [1062, 3, 'horizontal'],
    [1352, 3, 'horizontal'],
    [Infinity, 4, 'horizontal'],
  ],
};
type SpanConfig =
     number | {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
        [key:string]:number
    };
type FormLayout = 'horizontal' | 'vertical';

/**
 * 合并用户和默认的配置
 * 后期支持自定义用到
 *
 * @param layout
 * @param width
 */

const getSpanConfig = (
  layout: FormLayout,
  width: number,
  span?: SpanConfig
): { span: number; layout: FormLayout } => {
  if (span && typeof span === 'number') {
    return {
      span,
      layout,
    };
  }
  const spanConfig = span
    ? ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].map((key) => [
        CONFIG_SPAN_BREAKPOINTS[key],
        24 / span[key],
        'horizontal',
      ])
    : BREAKPOINTS[layout || 'default'];

  const breakPoint = (spanConfig || BREAKPOINTS.default).find(
    (item: [number, number, FormLayout]) => width < item[0] + 16 // 16 = 2 * (ant-row -8px margin)
  );
  return {
    span: 24 / breakPoint[1],
    layout: breakPoint[2],
  };
};

/** 处理dom
 * 1、判断第一行是否沾满
 * 2、是否需要显示收起展开
 * 3、判断哪些需要隐藏
 * 4、默认第一行
 * 5、可以配置colSize 当前占几列 */

function resetSpan() {
  itemLength.value = 0;
  totalSpan.value = 0;
  totalSize.value = 0;
  currentSpan.value = 0;
}
//
function handelDom() {
  resetSpan();
  let curTotalSpan = 0;
  let curTotalSize = 0;
  let curItemLength = 0;
  const processedDoms = $slots.map((formItem, index) => {
    const colSize =
      formItem?.props?.['col-size'] || formItem?.props?.['colSize'] || 1;
    const colSpan = Math.min(spanInfo.value.span * (colSize || 1), 24);
    curTotalSpan += colSpan;
    curTotalSize += colSize;
    curItemLength += 1;
    if (index === 0) {
      /**判读第一行是否直接沾满 */
      firstRowFull.value = colSpan === 24 && !formItem?.props?.hidden;
    }
    /**判断当前item是否需要隐藏 */
    let hidden: boolean =
      formItem?.props?.hidden ||
      //如果收起了
      (collapsed.value &&
        (firstRowFull.value ||
          //如果 超过显示长度 且 总长度超过了 24
          curTotalSize > showLength.value - 1) &&
        !!index &&
        curTotalSpan >= 24);

    // 显示几个formItem
    if (props.showLength) {
      hidden = collapsed.value && curItemLength > props.showLength;
    }

    return {
      formItem,
      hidden,
      colSpan,
    };
  });
  totalSpan.value = curTotalSpan;
  totalSize.value = curTotalSize;
  itemLength.value = curItemLength;
  return processedDoms;
}

/**是否显示收缩 展开按钮 */
function needCollapseRender() {
  if (
    totalSpan.value + spanInfo.value.span <= 24 ||
    Number(totalSize.value) + 1 <= showLength.value ||
    itemLength.value === props.showLength
  ) {
    return false;
  }
  return true;
}
/** 计算操作区域是否需要偏移 */
const offset = () => {
  const offsetSpan = (currentSpan.value % 24) + spanInfo.value.span;
  return 24 - offsetSpan;
};

/** */
function renderELRow() {
  //   if (!checkUseLegal()) return false;
  //   const elRow = resolveComponent('ElRow');
  //   const elCol = resolveComponent('ElCol');
  const cols: VNode[] = [];
  const doms = handelDom();
  let curspan = 0;
  doms.forEach((formItem, index) => {
    if (!formItem.hidden) {
      // 当前dom占不下 需要换行， 当前行剩余的大小也计算在内
      if (24 - (curspan % 24) < formItem.colSpan) {
        curspan += 24 - (curspan % 24);
      }
      curspan += formItem.colSpan;
    }
    cols.push(
      h(
        ElCol,
        {
          span: formItem.colSpan,
          display: formItem.hidden ? 'hidden' : '',
        },
        () => formItem.formItem
      )
    );
  });
  currentSpan.value = curspan;

  return h(ElRow, {}, () => [
    ...cols,
    h(
      ElCol,
      {
        offset: offset(),
        span: spanInfo.value.span,
      },
      () => {
        return renderHandelItem();
      }
    ),
  ]);
}

/**
 * 渲染操作按钮
 */
function renderHandelItem() {
  return h(
    'div',
    {
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '18px',
      },
    },
    {
      default() {
        return [
          slots?.handleArea?.(), //用户button
          needCollapseRender() ? renderCollapsed() : '',
        ];
      },
    }
  );
}
/**
 * 展开 收缩操作
 */
function renderCollapsed() {
  //   const elIcon = resolveComponent('el-icon');
  const arrowDownBold = resolveComponent('ArrowDownBold');
  return h(
    'div',
    {
      onClick: () => {
        // 回调
        emits('onCollapse', !collapsed.value);
        collapsed.value = !collapsed.value;
      },
      style: {
        marginLeft: '8px',
      },
    },
    [
      h(
        'span',
        {
          style: {
            fontSize: '14px',
            color: 'var(--el-color-primary)',
            cursor: 'pointer',
          },
        },
        collapsed.value ? '展开' : '收起'
      ),
      h(
        ElIcon,
        {
          style: {
            width: '14px',
            height: '14px',
            color: 'var(--el-color-primary)',
            verticalAlign: 'middle',
            transition: '0.3s all',
            transform: `rotate(${collapsed.value ? 0 : 0.5}turn)`,
            cursor: 'pointer',
            marginLeft: '4px',
          },
        },
        () => h(arrowDownBold)
      ),
    ]
  );
}

function checkUseLegal() {
// @ts-ignore
  if (!$slots.length || $slots.some((item) => item.type.name != 'ElFormItem')) {
    console.warn('子组件必须为ElFormItem');
    return false;
  }
  return true;
}
const children = () => renderELRow();
</script>

<style scoped></style>
