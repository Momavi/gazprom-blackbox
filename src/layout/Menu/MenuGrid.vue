<template>
  <div class="grid grid-cols-2 grid-rows-2 place-content-center place-items-center h-3/4">
    <MenuItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
    />
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue';
import { EnvelopeIcon, FolderOpenIcon, ListBulletIcon } from '@heroicons/vue/24/solid/index.js';

const items = [
  {
    title: 'Файловое хранилище',
    icon: FolderOpenIcon,
    access: false,
  },
  {
    title: 'Почта',
    icon: EnvelopeIcon,
    access: false,
  },
  {
    title: 'Лента',
    icon: ListBulletIcon,
    access: true,
  },
];
</script>
