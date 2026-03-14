import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // ✅ 移除 Vue 3 不存在的 preserveWhitespace
          // ✅ 保留核心：禁用自动解析未知组件，避免生成 resolveComponent
          isCustomElement: (tag) => false,
          // Vue 3 替代 preserveWhitespace 的配置（可选，控制空格压缩）
          whitespace: 'condense'
        }
      }
    }),
    vueJsx(),
    dts()
  ],
  // 保留模块上下文，避免打包后丢失
  resolve: {
    preserveSymlinks: true
  },
  build: {
    // 临时禁用压缩（调试用，上线前改为 'esbuild'）
    minify: false,
    rollupOptions: {
      // 外部化 Vue，避免打包冲突
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        // ✅ preserveModules 移到 rollup output 下（符合类型定义）
        preserveModules: true,
        // 可选：指定模块根目录，优化打包结构
        preserveModulesRoot: 'packages'
      }
    }
  }
})