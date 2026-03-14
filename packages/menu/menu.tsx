import { defineComponent, useAttrs } from 'vue' 
import type { PropType } from 'vue'
import type { MenuItem } from './types'
// 也可以移除 toLine 导入（因为不用处理图标名了）
// import { toLine } from '../../utils'

export default defineComponent({
  props: {
    // 导航菜单的数据
    data: {
      type: Array as PropType<MenuItem[]>,
      required: true
    },
    // 默认选中菜单
    defaultActive: {
      type: String,
      default: ''
    },
    // 是否是路由模式
    router: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {  // 移除无用的 ctx 参数
    // 封装一个渲染无限层级菜单的方法
    const renderMenu = (data: MenuItem[]) => {
      return data.map((item: MenuItem) => {
        // 🔥 完全删除图标相关代码（核心修复）
        // 处理sub-menu的插槽
        const slots = {
          title: () => {
            return (
              <>
                {/* 只保留菜单文字 */}
                <span>{item.name}</span>
              </>
            )
          }
        }

        // 递归渲染children
        if (item.children && item.children.length) {
          return (
            <el-sub-menu index={item.index} v-slots={slots}>
              {renderMenu(item.children)}
            </el-sub-menu>
          )
        }

        // 正常渲染普通菜单（只保留文字）
        return (
          <el-menu-item index={item.index}>
            <span>{item.name}</span>
          </el-menu-item>
        )
      })
    }

    const attrs = useAttrs()
    return () => {
      return (
        <el-menu
          class="menu-icon-svg"
          default-active={props.defaultActive}
          router={props.router}
          {...attrs}
        >
          {renderMenu(props.data)}
        </el-menu>
      )
    }
  }
})