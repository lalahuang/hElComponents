<!--
 * @Author: hzm
 * @Date: 2022-09-14 15:26:48
 * @Description: 
-->

## 需要实现的功能

1. json配置 ts代码提示
2. form-item 直接配置组件，使用v-model统一接口
3. label 支持



## 使用实例

```htm

<h-form 
    v-model="formData"
    :columns="columns"
    <!-- 支持form额外props -->

>

</h-form>



<script>
const formData=ref({})
const columns=ref(
    [
        {
            label:"测试标题",
            labelDes:"测试标题描述",
            prop:"test",//form-item prop属性
            component:"el-input",
            componentProps:{//自动支持 component 属性
                
            },

        }
    ]
)

</script>




```






