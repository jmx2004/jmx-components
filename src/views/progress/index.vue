<template>
  <div>
    <x-progress isAnimation :percentage="60">

    </x-progress>
    <x-progress type="circle" isAnimation :percentage="60">

    </x-progress>

  </div>
</template>

<script lang='ts' setup>

</script>

<style lang='scss' scoped>
svg {
  height: 126em;
  width: 126em;

}

</style>