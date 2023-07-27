<template>
  <div class="mt-24">
    <button v-if="userStore.access !== ''" class="bg-red-700" @click="userStore.resetUser()">
      <span class="flex">
        <span class="select-none mr-2">Выйти из системы</span>
        <KeyIcon class="h-6 w-6"/>
      </span>
    </button>
    <span v-else>
          <button class="mr-24 bg-stone-700" @click="modalStore.openLogin()">
      <span class="flex">
        <span class="mr-2 select-none">Авторизация</span>
        <KeyIcon class="h-6 w-6"/>
      </span>
    </button>
    <button class="bg-stone-700" @click="modalStore.openRegister()">
      <span class="flex">
        <span class="mr-2 select-none">Регистрация</span>
        <UserIcon class="h-6 w-6"/>
      </span>
    </button>
    </span>
  </div>

  <LoginForm v-if="modalStore.isLoginOpen"/>
  <RegisterForm v-if="modalStore.isRegisterOpen"/>
</template>

<script setup>
import { KeyIcon, UserIcon } from '@heroicons/vue/24/solid/index.js';
import { useModalStore } from '@stores/modal-reducer.js';

import LoginForm from '../../components/form/LoginForm.vue';
import RegisterForm from '../../components/form/RegisterForm.vue';
import { useUserStore } from '@stores/user-reducer.js';

const modalStore = useModalStore();
const userStore = useUserStore();
</script>