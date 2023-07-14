import { createRouter, createWebHistory } from 'vue-router'

import Menu from './layout/Menu/Menu.vue';

export const router= createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Menu
    },
  ]
})