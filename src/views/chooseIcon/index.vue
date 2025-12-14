<template>
  <div>
    <x-choose-icon title="选择图标" v-model="visible">
      选择图标
    </x-choose-icon>
  </div>
  
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import xChooseIcon from '../../components/chooseIcon/src/index.vue'
let visible = ref<boolean>(false)

</script>

<style lang='scss' scoped>

</style>