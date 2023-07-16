<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title"
       role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

      <div
          class="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-stone-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-3xl text-center leading-6 font-medium text-gray-100 mb-6" id="modal-title">
                Авторизация
              </h3>
              <div class="mt-2">
                <form @submit.prevent="submitForm">
                  <input type="text" v-model="username" id="email" name="email" placeholder="Почта" autocomplete="email"
                         class="w-full px-3 py-2 placeholder-gray-400 text-gray-100 rounded-lg focus:outline-none"/>
                  <input type="password" v-model="password" id="password" name="password"
                         autocomplete="current-password" placeholder="Пароль"
                         class="w-full mt-2 px-3 py-2 placeholder-gray-400 text-gray-100 rounded-lg focus:outline-none"/>
                  <button type="submit" class="w-full py-2 mt-2 rounded-lg bg-blue-500 text-white">Войти</button>
                </form>
                <div v-if="usernameError" class="text-red-500">{{ usernameError }}</div>
                <div v-if="passwordError" class="text-red-500">{{ passwordError }}</div>
                <p class="text-red-500">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-stone-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" @click="modalStore.closeLogin"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-100 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useModalStore } from '@stores/modal-reducer';
import { useUserStore } from '@stores/user-reducer.js';
import { useNotificationStore } from '@stores/notification.js';

export default {
  setup() {
    const modalStore = useModalStore();
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();

    const username = ref('');
    const password = ref('');
    const usernameError = ref('');
    const passwordError = ref('');
    const error = ref('');

    async function submitForm() {
      usernameError.value = '';
      passwordError.value = '';

      if ( !username.value.trim() ) {
        usernameError.value = 'Введите почту.';
      }

      if ( !password.value.trim() ) {
        passwordError.value = 'Введите пароль.';
      }

      if ( usernameError.value || passwordError.value ) {
        return;
      }
      await axios.post('/api/users/login',
          {
            email: username.value,
            password: password.value,
          },
      ).then(resp => {
        userStore.setUser(resp.data)
        notificationStore.setData(200, resp.data.message);
        localStorage.setItem('token', resp.data.token);
        modalStore.closeLogin();
      }).catch((error) => {
        console.log(error);
        this.error = error.response.data.message;
      });
    }

    return {
      username,
      password,
      error,
      modalStore,
      usernameError,
      passwordError,
      submitForm,
    };
  },
};
</script>
