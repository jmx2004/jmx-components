<template>
  <el-input 
    v-model="input" 
    style="width: 240px" 
    placeholder="Please input">

  </el-input>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
let input = ref<string>()
input.value = input.value?.trim()
let emits = defineEmits(['trimInput'])
emits('trimInput', input.value)
</script>

<style lang='scss' scoped>

</style>