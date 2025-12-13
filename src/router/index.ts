import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"
import Home from '../views/Home.vue'
const routes: RouteRecordRaw[] = [
  {
    path:'/',
    component: Home

  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
export default router