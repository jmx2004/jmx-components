<template>
  <div>
    <div class="flex">
      <div>
        <x-trend text="营业额"></x-trend>
      </div>
      <div>
        <x-trend text="销售额" type="down"></x-trend>
      </div>
    </div>
    <div class="flex">
      <div>
        <x-trend>消费者</x-trend>
      </div>
      <div>
        <x-trend type="down">营业额</x-trend>
      </div>
    </div>
    <div class="flex">
      <div>
        <x-trend text="营业额" reverseColor></x-trend>
      </div>
      <div>
        <x-trend text="销售额" type="down" reverseColor></x-trend>
      </div>
    </div>
    <div class="flex">
      <div>
        <x-trend upIcon="CaretTop" text="营业额" reverseColor></x-trend>
      </div>
      <div>
        <x-trend downIcon="CaretBottom" text="销售额" type="down" reverseColor></x-trend>
      </div>
    </div>

  
  </div>
</template>

<script lang='ts' setup>

</script>

<style lang='scss' scoped>
.flex {
  display: flex;
  margin-bottom: 20px;
  div {
    margin-right: 10px;
  }
}

</style>
