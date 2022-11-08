


## 安装

`pnpm  install h-components-next`

## 快速开始


### 完整引入

由于 `h-components-next` 依赖于 `element-plus`,需要提前引入`element-plus`
```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import HComponentsNext from 'h-components-next'
import 'element-plus/dist/index.css'
import 'h-components-next/dist/index.css'

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus).use(HComponentsNext)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <h-table>I am HTable</h-table>
</template>
<script >
  import { HTtable } from 'h-components-next'
  import  'h-components-next/theme/hTable.css'
  export default {
    components: { HTtable },
  }
</script>
```
