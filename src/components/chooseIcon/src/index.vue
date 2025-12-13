<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <div class="choose-icon-dialog-body-height">
    <el-dialog :title="title" v-model="visibleProxy">
      <el-scollbar class="container">
        <div class="item" v-for="(item, index) in Object.keys(ElIcons)" :key="index"
        @click="clickItem(item)">
          <div class="text">
            <!-- 动态组件 -->
            <component :is='`el-icon-${toLine(item)}`'></component>
          </div>
          <div class="icon">
            {{ item }}
          </div>
        </div>
      </el-scollbar>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import * as ElIcons from '@element-plus/icons-vue'
import { computed } from 'vue'
import { toLine } from '../../../utils'
import { useCopy } from '../../../hooks/useCopy';
//  props：使用 modelValue（Vue3 规范）
const props = defineProps<{
  title: string
  modelValue: boolean
}>()

// emits：update:modelValue
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// v-model 代理（核心）
const visibleProxy = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val)
})

// 按钮点击打开弹窗
const handleClick = () => {
  visibleProxy.value = true
}
// 点击图标
let clickItem = (item: String) => {
  console.log(item);
  let text = `<el-icon-${toLine(item)} />`
  // 复制文本
  useCopy(text)
  visibleProxy.value = false

}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}
.text {
  font-size: 14px;
}
.icon{
  flex: 1

}
svg {
  width: 2em;
  height: 2em;
}
</style>