// 可配置表单

import type { RuleItem } from "./rule";

// 表单的每一项的配置选项
export interface FormOptions {
  // 表单项显示的元素
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' | 'date-picker' |  'input' | 'input-number' | 'radio' | 'radio-group' | 'radio-button' | 'rate' | 'select' | 'option' | 'slider' | 'switch' | 'time-picker' | 'time-select' | 'tansfer' | 'upload',
  // 表单项的值
  value: any,
  //表单项的label
  label?: string,
  // 表单项的标识
  prop?: string,
  // 表单项的验证规则
  rules?: RuleItem[],
  // 表单项的占位符
  placeholder?: string,
  // 表单元素特有的属性 
  attrs?: {
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,

  }
}