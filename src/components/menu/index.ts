import menu from './src/index.vue'
import type{ App } from 'vue'
import infiniteMenu from './menu'
// 让这个组件可以通过use的形式使用
export default {
  install(app: App) {
    app.component('x-menu',menu)
    app.component('x-infinite-menu',infiniteMenu)
  }
}
