<template>
  <div v-if="accessLevel >= item.access"
       :class="`${baseClasses} cursor-pointer duration-300 hover:opacity-60 hover:bg-emerald-950 opacity-100`"
       @click="goTo(item.route)">
    <component :is="item.icon" :class="`${baseIcon} color-access`"/>
    <h1 class="select-none">{{ item.title }}</h1>
  </div>
  <div v-else :class="`${baseClasses} opacity-40`">
    <component :is="item.icon" :class="`${baseIcon} color-stone-700`"/>
    <h1 class="select-none">{{ item.title }}</h1>
  </div>
</template>

<script setup>
import { router } from '../../routes.js';

const props = defineProps({
  item: Object,
  accessLevel: Number,
});

function goTo(route) {
  router.push(route);
}

const baseClasses = 'flex flex-col justify-center items-center ease-in p-4 rounded-lg';
const baseIcon = 'h-48 w-48'
</script>
