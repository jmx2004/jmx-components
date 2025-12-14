<template>
  <x-choose-area @change="changeArea"></x-choose-area>
</template>

<script lang='ts' setup>
import xChooseArea from '../../components/chooseArea/src/index.vue'
let changeArea = (val: any) => {
  console.log(val)
}
</script>

<style lang='scss' scoped>

</style>