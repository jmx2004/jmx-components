<template>
  <x-table 
    :data="tableData" 
    :options="options"
    isEditRow
    v-model:editRowIndex="editRowIndex"
    elementLoadingText="加载中..."
    elementLoadingBackground="rgba(0,0,0,.8)"
    :elementLoadingSvg="svg"
    elementLoadingSvgViewBox="-10, -10, 50, 50"
    @confirm="confirm"
  >
    <template #date="{scope}">
      <el-icon-timer></el-icon-timer>
      {{ scope.row.date }}
    </template>
    <template #name="{scope}">
      <el-popover effect="light" trigger="hover" placement="top" width="auto">
        <template #default>
          <div>name: {{ scope.row.name }}</div>
        </template>
        <template #reference>
          <el-tag>{{ scope.row.name }}</el-tag>
        </template>
      </el-popover>
    </template>
    <template #action="{scope}">
      <el-button size="small" type="primary" @click="edit(scope)">编辑</el-button>
      <el-button size="small" type="danger">删除</el-button>
    </template>
    <!-- <template #editCell="{scope}">
      <div style="display: flex;">
        <el-button size="small" type="primary">确认</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </template> -->
    <template #editRow="{scope}">
      <el-button size="small" type="primary">确认</el-button>
      <el-button size="small" type="danger">取消</el-button>
    </template>
  </x-table>
</template>

<script lang='ts' setup>
import type { TableOptions } from '../../components/table/src/types';
import { ref } from 'vue'

interface TableData {
  date: string,
  name: string,
  address: string

}
const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`

// 表格数据
let tableData = ref<TableData[]>([])
setTimeout(() => {
  tableData.value = [{
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
}, 0)

let editRowIndex = ref<string>('')
// 表格配置
let options: TableOptions[] = [
  {
    label: '日期',
    prop: 'date',
    align: 'center',
    slot: 'date',
    editable: true
  },
  {
    label: '姓名',
    prop: 'name',
    align: 'center',
    slot: 'name',
  },
  {
    label: '地址',
    prop: 'address',
    align: 'center',
    editable: true
  },
  {
    label: '操作',
    prop: 'option',
    align: 'center',
    action: true
  }
]
let edit = (scope: any) => {
  editRowIndex.value = 'edit'
}

let confirm = (scope: any) => {
  console.log('父组件', scope);
}
</script>

<style lang='scss' scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>