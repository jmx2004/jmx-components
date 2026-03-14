<template>
  <el-table 
    :data="tableData" 
    v-loading="isLoading"
    :element-loading-text="elementLoadingText"
    :element-loading-spinner="elementLoadingSpinner"
    :element-loading-background="elementLoadingBackground"
    :element-loading-svg="elementLoadingSvg"
    :element-loading-svg-view-box="elementLoadingSvgViewBox"
    @row-click="rowClick"
  >
    <template v-for="(item, index) in tableOptions" :key="index">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :width="item.width"
      >
        <template #default="scope">
          <template v-if="scope.row.rowEdit">
            <el-input size="small" v-model="scope.row[item.prop]"></el-input>
          </template>
          <template v-else>
            <template v-if="(scope.$index + scope.column.id) === currentEdit">
              <div style="display: flex;">
                <el-input size="small" v-model="scope.row[item.prop]"></el-input>
                <div @click="clickEditCell">
                  <slot name="editCell" :scope="scope" v-if="$slots.editCell"></slot>
                  <div class="icons" v-else>
                    <el-icon-check class="check" @click.stop="check(scope)"></el-icon-check>
                    <el-icon-close class="close" @click.stop="close(scope)"></el-icon-close>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <span v-else>{{ scope.row[item.prop!] }}</span>
              <component :is="`el-icon-${toLine(editIcon)}`" @click.stop="clickEdit(scope)" class="edit" v-if="item.editable"></component>
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <el-table-column
      :label="actionOptions!.label"
      :align="actionOptions!.align"
      :widht="actionOptions!.width"
    >
    <template #default="scope">
      <slot name="editRow" v-if="scope.row.rowEdit"></slot>
      <slot name="action" :scope="scope" v-else></slot>
    </template>

    </el-table-column>
  </el-table>
</template>

<script lang='ts' setup>
import { ref, computed, type PropType, onMounted, watch } from 'vue';
import type { TableOptions } from './types';
import { toLine } from '../../../utils';
import cloneDeep from 'lodash/cloneDeep'
let props = defineProps({
  // 表格的配置
  options: {
    type: Array as PropType<TableOptions[]>,
    required: true
  },
  // 表格数据
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  // 加载文案
  elementLoadingText: {
    type: String,
  },
  // 加载图标名
  elementLoadingSpinner: {
    type: String
  },
  // 加载背景颜色
  elementLoadingBackground: {
    type: String
  },
  // 加载svg的配置
  elementLoadingSvg: {
    type: String
  },
  elementLoadingSvgViewBox: {
    type: String
  },
  // 可编辑单元格显示图标
  editIcon: {
    type: String,
    default: 'edit'
  },
  // 是否可以编辑行
  isEditRow: {
    type: Boolean,
    default: false
  },
  // 编辑行按钮的标识
  editRowIndex: {
    type: String,
    default: ''
  }
})
// 分发事件
let emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex'])

// 过滤操作选项之后配置
let tableOptions = computed(() => props.options.filter(item => !item.action))

// 找出操作项的配置
let actionOptions = computed(() => props.options.find(item => item.action))

// 表格是否在加载中
let isLoading = computed(() => !props.data || props.data.length == 0)

// 当前点击的单元格
let currentEdit = ref<string>('')

// 拷贝一份表格的数据
let tableData = ref<any[]>(cloneDeep(props.data))

// 拷贝一份按钮的标识
let cloneEditRowIndex = ref<string>(props.editRowIndex)

// 监听父组件传递过来的数据
watch(() => props.data, val => {
  tableData.value = cloneDeep(val)
  tableData.value.map(item => {
    // 代表当前是否是可编辑的状态
    item.rowEdit = false
  })
}, {deep: true})

// 监听父组件传递过来的标识
watch(() => props.editRowIndex, val => {
  if(val) cloneEditRowIndex.value = val
})
onMounted(() => {
  tableData.value.map(item => {
    // 代表当前是否是可编辑的状态
    item.rowEdit = false
  })

})

// 点击编辑突变
let clickEdit = (scope: any) => {
  // 唯一的标识
  currentEdit.value = scope.$index + scope.column.id
  console.log(scope.row)
  console.log(currentEdit.value);
}

let clickEditCell = () => {
  currentEdit.value = ''
}
// 点击勾
let check = (scope: any) => {
  currentEdit.value = ''
  emits('confirm', scope)

}

// 点击叉
let close = (scope: any) => {
  currentEdit.value = ''
  emits('cancel', scope)
}

// 点击每一行的事件
let rowClick = (row: any, column: any) => {
  // 判断当前点击的是否是操作项的内容
  if(column.label === actionOptions.value!.label) {
    // 编辑行的操作
    if(props.isEditRow && cloneEditRowIndex.value === props.editRowIndex){
      // 当前点击的按钮是做可编辑操作
      row.rowEdit = !row.rowEdit
      // 重置其他数据的isEditRow
      tableData.value.map(item => {
        if(item !== row) item.irowEdit = false
      })
      // 重置按钮的标识
      if(!row.rowEdit) emits('update:editRowIndex','')
    }
  }
}


</script>

<style lang='scss' scoped>
.edit{
  width: 1em;
  height: 1em;
  position: relative;
  top:2px;
  left: 4px;
  cursor: pointer;;
}
.icons {
  display: flex;
  position: relative;
  top: 5px;
  svg{
    cursor: pointer;
    width: 1em;
    height: 1em;
    margin-left: 8px;
  }
  .check {
    color: red;
  }
  .close {
    color: green;
  }
}

</style>