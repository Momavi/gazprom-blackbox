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
import { EnvelopeIcon, FolderOpenIcon, ListBulletIcon, IdentificationIcon } from '@heroicons/vue/24/solid/index.js';

const items = [
  {
    title: 'Файловое хранилище',
    icon: FolderOpenIcon,
    route: '',
    access: 3,
  },
  {
    title: 'Почта',
    icon: EnvelopeIcon,
    route: '',
    access: 1,
  },
  {
    title: 'Система пропусков',
    icon: IdentificationIcon,
    route: 'Identification',
    access: 2,
  },
  {
    title: 'Лента',
    icon: ListBulletIcon,
    route: 'Posts',
    access: 0,
  },
];
</script>
