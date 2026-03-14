<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <el-dialog :title="title" v-model="visibleProxy" append-to-body>
    <!-- 1. 给 scrollbar 加固定高度/最大高度，限制滚动区域 -->
    <el-scrollbar max-height="60vh" class="icon-scrollbar">
      <div class="icon-grid">
        <div
          class="icon-item"
          v-for="item in Object.keys(ElIcons)"
          :key="item"
          @click="clickItem(item)"
        >
          <div class="icon-wrapper">
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div class="icon-name">{{ item }}</div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script lang='ts' setup>
import * as ElIcons from '@element-plus/icons-vue'
import { computed } from 'vue'
import { toLine } from '../../../utils'
import { useCopy } from '../../../hooks/useCopy';

const props = defineProps<{
  title: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const visibleProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleClick = () => {
  visibleProxy.value = true
}

const clickItem = (item: string) => {
  const text = `<el-icon-${toLine(item)} />`
  useCopy(text)
  visibleProxy.value = false
}
</script>

<style lang="scss" scoped>
// 2. 核心修复：给 scrollbar 容器设置正确的 flex 上下文
.icon-scrollbar {
  // 确保 scrollbar 内部是块级，避免默认 flex 拉伸
  .el-scrollbar__wrap {
    display: block !important; // 覆盖默认纵向 flex
    overflow-x: hidden;
    overflow-y: auto;
  }
}

// 3. 网格布局：完美实现多列，替代混乱的 flex
.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px 8px; // 行/列间距
  padding: 4px 0;
}

// 每个图标项
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 90px; // 固定高度，保证对齐
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--el-fill-color-light);
  }
}

// 图标容器：固定大小，确保所有图标对齐
.icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

// 图标样式强制统一
:deep(.el-icon) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2em;
    height: 2em;
  }
}

.icon-name {
  font-size: 12px;
  color: var(--el-text-color-regular);
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>