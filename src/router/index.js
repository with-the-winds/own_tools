/*
 * @Date: 2023-06-27 09:33:02
 * @LastEditors: with-the-winds
 * @LastEditTime: 2023-06-27 09:56:25
 * @Description: 头部注释
 * @FilePath: \own_tools\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/color/RGBToHex',
    name: 'RGBToHex',
    component: () => import('../views/ColorConversion.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
