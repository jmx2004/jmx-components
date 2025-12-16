<template>
  <div>
    <x-choose-time  @startChange="startChange" @endChange="endChange"></x-choose-time>

  </div>
</template>

<script lang='ts' setup>
interface endValue {
  startTime: string,
  endTime: string
}
let startChange = (val: string) => {
  console.log(val);
}
let endChange = (val: endValue) => {
  console.log(val);
}

// let startOptions = {
//   size: 'large',
//   clearable: false

// }


</script>

<style lang='scss' scoped>

</style>