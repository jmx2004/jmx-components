import { createApp } from 'vue'
import './styles/base.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import { toLine } from './utils'

// import xUI from './components'
// @ts-ignore 忽略TS类型检查（解决找不到声明文件的报错）
import xUI from '../lib/jmx-element-components.mjs'
import '../lib/jmx-element-components.css'

const app = createApp(App)

// 全局注册图标
for(let i in Icons) {
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}

app.use(router).use(ElementPlus).use(xUI)
app.mount('#app')