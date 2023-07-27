<script setup>
import { Bars4Icon } from '@heroicons/vue/24/solid/index.js';
import Notification from './components/Notification.vue';
import { router } from './routes.js';

import { useUserStore } from '@stores/user-reducer.js';
import { useNotificationStore } from '@stores/notification.js';
import { onMounted } from 'vue';

const userStore = useUserStore();
let notificationStore = useNotificationStore();

onMounted(async () => {
  if ( localStorage.getItem('token') ) {
    const response = await fetch('/api/users/reauth', {
      headers: { 'Authorization': `Bearer ${ localStorage.getItem('token') }` },
    });
    if (response.ok) {
      const data = await response.json();
      userStore.setUser(data)
      notificationStore.setData(200, data.message);
    } else {
      console.error('Response status:', response.status);
    }
  }
})



</script>

<template>
  <Bars4Icon v-if="$route.path !== '/'" class="h-12 w-12 absolute left-3 top-3 cursor-pointer hover:opacity-80 transition"
             @click="router.push('/')"/>
  <h2 class="absolute right-3 top-1">Уровень доступа: {{ userStore.access ? userStore.access : 'Неизвестный' }}</h2>
  <h2 v-if="userStore.name" class="absolute right-3 top-6">Пользовать: {{ userStore.name }}</h2>
  <Notification/>
  <transition name="fade">
    <div key="$route.fullPath">
      <router-view></router-view>
    </div>
  </transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>