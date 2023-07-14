<script setup>
import { useUserStore } from './stores/user-reducer.js'
const store = useUserStore()
</script>

<template>
  <h2 class="absolute right-3 top-1">Уровень доступа: {{ store.access }}</h2>
  <router-view></router-view>
</template>
