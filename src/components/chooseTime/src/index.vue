<template>
  <div style="display: flex;">
    <div style="margin-right: 20px">
      <el-time-select
        v-model="startTime"
        style="width: 240px"
        :placeholder="startPlaceholder"
        :start="startTimeStart"
        :step="startStep"
        :end="startTimeEnd"
        :max-time="endTime || undefined"
        v-bind="($attrs.startOptions as Record<string, any>) || {}"
      />
    </div>
    <div>
      <el-time-select
        v-model="endTime"
        style="width: 240px"
        :placeholder="endPlaceholder"
        :start="endTimeStart"
        :step="endStep"
        :end="endTimeEnd"
        :min-time="startTime || undefined"
        :disabled="endTimeDisabled"
        v-bind="($attrs.endOptions as Record<string, any>) || {}"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

let props = defineProps({
  startPlaceholder: { type: String, default: '请选择开始时间' },
  startTimeStart: { type: String, default: '08:00' },
  startStep: { type: String, default: '00:30' },
  startTimeEnd: { type: String, default: '24:00' },
  endPlaceholder: { type: String, default: '请选择结束时间' },
  endTimeStart: { type: String, default: '08:00' },
  endStep: { type: String, default: '00:30' },
  endTimeEnd: { type: String, default: '24:00' },
})

let emits = defineEmits(['startChange','endChange'])
let startTime = ref<string>('')
let endTime = ref<string>('')
let endTimeDisabled = ref(true)

watch(startTime, val => {
  if (!val) {
    endTime.value = ''
    endTimeDisabled.value = true
  } else {
    endTimeDisabled.value = false
    emits('startChange', val)
  }
})

watch(endTime, val => {
  if (val) {
    emits('endChange', { startTime: startTime.value, endTime: val })
  }
})


</script>

<style lang='scss' scoped>

</style>