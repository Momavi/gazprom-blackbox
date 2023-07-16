import { createRouter, createWebHistory } from 'vue-router'

import Menu from './layout/Menu/Menu.vue';
import Identification from './layout/Identification/Identification.vue'
import Posts from './layout/List/Posts.vue'

export const router= createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Menu
    },
    {
      path: '/Identification',
      component: Identification
    },
    {
      path: '/Posts',
      component: Posts,
    }
  ]
})