<template>
    <transition name="fade">
      <div
          v-if="storeNotification.showNotification"
          :class="`absolute top-12 right-0 m-2 p-4 bg-gray-200 border-l-8 rounded-md ${storeNotification.status === 200 ? 'border-emerald-500' : 'border-red-500'} shadow-md z-0`"
      >
        <div class="ml-2">
          <p class="text-sm text-gray-800">{{ storeNotification.message }}</p>
          <p class="text-sm text-gray-800">{{ storeNotification.countdown }}</p>
        </div>
      </div>
    </transition>
</template>

<script setup>
import { useNotificationStore } from '@stores/notification.js';

const storeNotification = useNotificationStore();
</script>