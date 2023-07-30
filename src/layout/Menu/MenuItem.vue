<template>
  <div v-if="accessLevel >= item.access"
       :class="`${baseClasses} cursor-pointer duration-300 hover:opacity-40 opacity-100`"
       @click="goTo(item.route)">
    <component :is="item.icon" :class="`${baseIcon} color-access`"/>
    <h1 class="select-none">{{ item.title }}</h1>
  </div>
  <div v-else @mouseover="showPopup = true"
       @mouseleave="showPopup = false" :class="`${baseClasses} opacity-40 select-none`" >
    <component :is="item.icon" :class="`${baseIcon} color-stone-700`"/>
    <h1 class="select-none">{{ item.title }}</h1>
    <div v-if="showPopup" class="absolute bg-white p-2 px-4 rounded">
     <p class="text-black">Необходимый уровень доступа: {{item.access === 3 ? 'Admin' : 'Confirmed'}}</p>
    </div>
  </div>
</template>

<script setup>
import { router } from '../../routes.js';
import { ref } from 'vue';

const showPopup = ref(false);

const props = defineProps({
  item: Object,
  accessLevel: Number,
});

function goTo(route) {
  router.push(route);
}

const baseClasses = 'flex flex-col justify-center items-center ease-in p-4 rounded-lg';
const baseIcon = 'w-40'
</script>
