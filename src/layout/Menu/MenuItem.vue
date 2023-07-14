<template>
  <div :class="itemClass">
    <component :is="item.icon" :class="iconClass"/>
    <h1 class="select-none">{{ item.title }}</h1>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: Object,
});

const itemClass = computed(() => {
  const baseClasses = 'flex flex-col opacity-40 justify-center items-center ease-in p-4 rounded-lg';

  return props.item.access
      ? `${baseClasses} cursor-pointer duration-300 hover:opacity-60 hover:bg-emerald-950 opacity-100`
      : baseClasses;
});

const iconClass = computed(() => `h-48 w-48 ${props.item.access ? 'color-access' : 'color-stone-700'}`);
</script>
