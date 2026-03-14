<template>
  <div>
    <el-form :validate-on-rule-change="false" :model="model" :rules="rules" v-bind="$attrs">
      <el-form-item 
        v-for="(item,index) in options" 
        :key="index"
        :label="item.label"
        :prop="item.prop">
        <component 
          v-bind="item.attrs" 
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"></component>
      </el-form-item>
    </el-form>

  </div>
</template>

<script lang='ts' setup>
import { ref, type PropType, onMounted } from 'vue';
import type { FormOptions } from './types/types';
import cloneDeep from 'lodash/cloneDeep'
let props = defineProps({
  // 表单的配置项
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  }
})

let model = ref<any>({})
let rules = ref<any>({})

onMounted(() => {
  let m: any = {}
  let r: any = {}
  props.options.map((item: FormOptions) => {
    m[item.prop!] = item.value
    r[item.prop!] = item.rules
  })
  model.value = cloneDeep(m)
  rules.value = cloneDeep(r)
})
</script>

<style lang='scss' scoped>

</style>