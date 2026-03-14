<template>
  <x-calendar 
  displayEventEnd
  :events="events"
  :eventContent="eventContent"
  @dateClick="dateClick"
  @eventClick="eventClick"
  ></x-calendar>
</template>

<script lang='ts' setup>
import { type DateClickArg } from '@fullcalendar/interaction';
import { type EventItem } from '../../components/calendar/src/types';
import type { EventClickArg, EventContentArg } from '@fullcalendar/core/index.js';
import  { ref } from 'vue';

let events  = ref<EventItem[]>([
  {
    title: '购物',
    start: '2026-03-05 08:00',
    end: '2026-03-05 12:00',
    editable: true
  },
  {
    title: '敲代码',
    start: '2026-03-04 10:00',
    end: '2026-03-04 22:00'
  }
])
let dateClick = (info: DateClickArg) => {
  events.value.push({
    start: info.dateStr + ' 12:00',
    end: info.dateStr + ' 18:00',
    title: '学习'
  })
}

let eventClick = (info: EventClickArg) => {
  console.log(info);
}

let eventContent = (arg: EventContentArg) =>  {
  let el = document.createElement('div')
  let timeTextArr = arg.timeText.split('-')
  let start = timeTextArr[0]!.replace('上午', '').replace('下午', '').replace('时', '')
  let end = timeTextArr[1]!.replace('上午', '').replace('下午', '').replace('时', '')
  el.innerHTML = `
    <div>开始时间: ${start}</div>
    <div>结束时间: ${end}</div>
    <div>标题: ${arg.event._def.title}</div> 
  `
  return {
    domNodes: [el]
  }
}


</script>

<style lang='scss' scoped>

</style>