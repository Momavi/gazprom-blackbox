<template>
  <div class="mt-24">
    <button class="mr-24 bg-stone-700" @click="modalStore.openLogin()">
      <span class="flex">
        <span class="mr-2">Авторизация</span>
        <KeyIcon class="h-6 w-6"/>
      </span>
    </button>
    <button class="bg-stone-700" @click="modalStore.openRegister()">
      <span class="flex">
        <span class="mr-2">Регистрация</span>
        <UserIcon class="h-6 w-6"/>
      </span>
    </button>
  </div>

  <LoginForm v-if="modalStore.isLoginOpen"/>
  <RegisterForm v-if="modalStore.isRegisterOpen"/>
</template>

<script setup>
import { KeyIcon, UserIcon } from '@heroicons/vue/24/solid/index.js';
import { useModalStore } from '@stores/modal-reducer.js';

import LoginForm from '../../components/form/LoginForm.vue';
import RegisterForm from '../../components/form/RegisterForm.vue';

const modalStore = useModalStore();
</script>