<template>
  <div>
    <x-choose-time  @startChange="startChange" @endChange="endChange"></x-choose-time>
    <br/>
    <br/>
    <x-choose-date @startChange="dateStartChange" @endChange="dateEndChange"></x-choose-date>

  </div>
</template>

<script lang='ts' setup>
interface endValue {
  startTime: string,
  endTime: string
}
interface endDate {
  startDate: Date,
  endDate: Date

}
let startChange = (val: string) => {
  console.log(val);
}
let endChange = (val: endValue) => {
  console.log(val);
}
let dateStartChange = (val: Date) => {
  console.log(val);
}
let dateEndChange = (val: endDate) => {
  console.log(val);
}

// let startOptions = {
//   size: 'large',
//   clearable: false

// }


</script>

<style lang='scss' scoped>

</style>