<template>
  <div class="fixed z-99 inset-0 overflow-y-auto" aria-labelledby="modal-title"
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
                Регистрация
              </h3>
              <div class="mt-2">
                <form @submit.prevent="submitForm">
                  <input type="text" v-model="email" placeholder="Почта"
                         class="w-full px-3 py-2 placeholder-gray-400 text-gray-100 rounded-lg focus:outline-none mb-2"/>
                  <input type="text" v-model="username" placeholder="Имя пользователя"
                         class="w-full px-3 py-2 placeholder-gray-400 text-gray-100 rounded-lg focus:outline-none"/>
                  <input type="password" v-model="password" placeholder="Пароль"
                         class="w-full mt-2 px-3 py-2 placeholder-gray-400 text-gray-100 rounded-lg focus:outline-none"/>
                  <input type="password" v-model="passwordAgain" placeholder="Повторите пароль"
                         class="w-full mt-2 px-3 py-2 placeholder-gray-400 text-gray-100 rounded-lg focus:outline-none"/>
                  <button type="submit" class="w-full py-2 mt-2 rounded-lg bg-blue-500 text-white">Зарегистрироваться
                  </button>
                </form>
                <p class="text-red-500">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-stone-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button type="button" @click="modalStore.closeRegister()"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-100 hover:opacity-70 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useModalStore } from '@stores/modal-reducer';
import { useNotificationStore } from '@stores/notification.js';
import { useUserStore } from '@stores/user-reducer.js';
import { validateEmail } from '../../utility/validateEmail.js';

const modalStore = useModalStore();
const notificationStore = useNotificationStore();
const userStore = useUserStore();

const email = ref('');
const username = ref('');
const password = ref('');
const passwordAgain = ref('');
const error = ref('');

async function submitForm() {
  error.value = '';

  if ( !validateEmail(email.value) ) {
    error.value = 'Введите почту.';
    return;
  }

  if ( !username.value.trim() ) {
    error.value = 'Введите имя пользователя.';
    return;
  }

  if ( !password.value.trim() ) {
    error.value = 'Введите пароль.';
    return;
  }

  if ( !passwordAgain.value.trim() ) {
    error.value = 'Введите пароль еще раз.';
    return;
  }

  await axios.post('/api/users/register',
      {
        email: email.value,
        name: username.value,
        password: password.value,
      },
  ).then(async (resp) => {
    await axios.post('/api/users/login',
        {
          email: email.value,
          password: password.value,
        },
    ).then(resp => {
      userStore.setUser(resp.data);
      notificationStore.setData(200, resp.data.message);
      localStorage.setItem('token', resp.data.token);
      modalStore.closeLogin();
    }).catch((err) => {
      try {
        if ( err.response.status === 429 ) {
          console.log(error, err.response);
          error.value = err.response.data;
        } else {
          error.value = err.response.data.message;
        }
      } catch ( err ) {
        error.value = 'Внутренняя ошибка сервера';
      }
    });
    modalStore.closeRegister();
    notificationStore.setData(200, resp.data.message);
  }).catch((err) => {
    if ( err.response.status === 429 ) {
      console.log(error, err.response);
      error.value = err.response.data;
    } else {
      error.value = err.response.data.message;
    }
  });
}
</script>
