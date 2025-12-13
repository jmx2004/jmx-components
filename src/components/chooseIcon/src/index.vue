<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <el-dialog :title="title" v-model="visibleProxy">111</el-dialog>
</template>

<script lang='ts' setup>
import { computed } from 'vue'

//  props：使用 modelValue（Vue3 规范）
const props = defineProps<{
  title: string
  modelValue: boolean
}>()

// emits：update:modelValue
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// v-model 代理（核心）
const visibleProxy = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

// 按钮点击打开弹窗
const handleClick = () => {
  visibleProxy.value = true
}

</script>

<style scoped>

</style>