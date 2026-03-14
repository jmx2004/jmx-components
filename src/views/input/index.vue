<template>
  <x-input @trimInput="trimInput"></x-input>
</template>

<script lang='ts' setup>
let trimInput = (val: String) => {
  console.log(val)

}

</script>

<style lang='scss' scoped>

</style>