<template>
  <div id="calendar">

  </div>
</template>

<script lang='ts' setup>
import { Calendar, type EventContentArg,type EventClickArg } from '@fullcalendar/core';
import { onMounted, ref, type PropType } from 'vue';
import daygrid from '@fullcalendar/daygrid'
import interaction, { type DateClickArg } from '@fullcalendar/interaction'
import type { EventItem } from './types';
import {watch} from 'vue'
let props = defineProps({
  // 语言
  local: {
    type: String,
    default: 'zh-cn'
  },
  // 视图模式
  initalView: {
    type: String,
    default: 'dayGridMonth'
  },
  // 按钮文字
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        prevYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月'
      }
    }

  },
  // 头部工具栏
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next'
      }
    }
  },
  // 底部工具栏
  footerToolbar: {
    type: Object,
    default: () => {
      return {

      }
    }
  },
  // 事件源
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => []
  },
  // 日历显示结束时间
  displayEventEnd: {
    type: Boolean,
    default: false
  },
  // 自定义渲染日历内容
  eventContent: {
    type: Function
  }
})

// 分发事件
let emits = defineEmits(['dateClick', 'eventClick'])
// 日历实例
let calender = ref<Calendar>()
// 渲染日历的方法
let renderCalendar = () => {
  let el = document.getElementById('calendar')
  if (el) {
    calender.value = new Calendar(el, {
      // 日历插件
      plugins: [daygrid, interaction],
      locale: props.local,
      initialView: props.initalView,
      buttonText: props.buttonText,
      headerToolbar: props.headerToolbar,
      footerToolbar: props.footerToolbar,
      eventSources: [
        {
          // 渲染日历的事件
          events(e, callback) {
            if(props.events.length) callback(props.events)
            else callback([])
          }
        }
      ],
      // 点击日历上的某一天
      dateClick(info: DateClickArg) {
        emits('dateClick', info)
      },
      eventClick(info: EventClickArg) {
        emits('eventClick', info)
      },
      displayEventEnd: props.displayEventEnd,
      eventContent: props.eventContent
    })
    calender.value.render()

  }

}
onMounted(() => {
  renderCalendar()
})

// 监听父组件传递的事件源
watch(() => props.events, () => {
  renderCalendar()

}, {deep: true})
</script>

<style lang='scss' scoped>

</style>