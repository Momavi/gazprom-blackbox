<template>
  <div class="grid grid-cols-2 grid-rows-2 place-content-center place-items-center h-3/4">
    <MenuItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :accessLevel="userStore.accessLevel"
    />
  </div>
</template>

<script setup>
import MenuItem from './MenuItem.vue';
import { EnvelopeIcon, FolderOpenIcon, ListBulletIcon, GlobeAltIcon } from '@heroicons/vue/24/solid/index.js';
import { useUserStore } from '@stores/user-reducer.js';
const userStore = useUserStore();

const items = [
  {
    title: 'Лента',
    icon: ListBulletIcon,
    route: 'Posts',
    access: 1,
  },
  {
    title: 'Почта',
    icon: EnvelopeIcon,
    route: 'Mail',
    access: 2,
  },
  {
    title: 'Файловое хранилище',
    icon: FolderOpenIcon,
    route: 'Files',
    access: 3,
  },
];
</script>
