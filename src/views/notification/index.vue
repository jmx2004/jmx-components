<template>
  <div>
    <!-- <x-notification :value="50"></x-notification>
    <br/>
    <br/>
    <x-notification :value="50" :max="30"></x-notification>
    <br/>
    <br/>
    <x-notification :value="50" isDot></x-notification>
    <br/>
    <br/>
    <x-notification icon="ChatRound" :value="50" isDot></x-notification> -->
    <x-notification :value="50">
      <template #default>
        <x-list @click-item="clickItem" @click-action="clickAction" :list="list" :actions="actions"></x-list>
      </template>
    </x-notification>
  </div>
</template>

<script lang='ts' setup>
import {list ,actions} from './data'
let clickItem = (val: any) =>  {
  console.log(val)

}
let clickAction = (val: any) =>  {
  console.log(val)

}

</script>

<style lang='scss' scoped>

</style>