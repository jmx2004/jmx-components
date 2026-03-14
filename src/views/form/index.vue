<template>
  <div>
    <x-form label-width="100px" :options="options"></x-form>

  </div>
</template>

<script lang='ts' setup>
import type { FormOptions } from '../../components/form/src/types/types';

let options: FormOptions[] = [
  {
    type: 'input',
    value: '',
    label: '用户名',
    prop: 'username',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur'
      },
      {
        min: 2,
        max: 6,
        required: true,
        message: '用户名2-6位之间',
        trigger: 'blur'
      },
    ]
  },
  {
    type: 'input',
    value: '',
    label: '密码',
    prop: 'password',
    rules: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      },
      {
        min: 6,
        max: 15,
        required: true,
        message: '用户名6-15位之间',
        trigger: 'blur'
      },
    ],
    attrs: {
      showPassword: true
    }
  }
] 
</script>

<style lang='scss' scoped>

</style>