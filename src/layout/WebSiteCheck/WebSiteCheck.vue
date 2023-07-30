<template>
  <div class="flex flex-col justify-center align-middle items-center">
    <div class="mb-6 w-1/2 flex">
      <input v-model="url" type="text" placeholder="Адрес на проверку" class="px-4 py-2 rounded-xl bg-gray-600 border-2 border-gray-400 text-white placeholder-gray-400 w-full"/>
    </div>
    <div class="mb-6">
      <button @click="sendUrl" class="bg-gray-600">Отправить</button>
    </div>
    <p v-if="error">{{ error }}</p>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const url = ref('');
const response = ref(null);
const error = ref(null);

const sendUrl = () => {
  error.value = null;
  response.value = null;

  if (!url.value) {
    error.value = 'Поле не может быть пустым';
    return;
  }

  try {
    new URL(url.value);
  } catch (_) {
    error.value = 'Необходимо ввести действительный URL';
    return;
  }

  axios.post('/api/web_parser', { url: url.value }).then(res => {
    response.value = res.data;
  }).catch(error => {
    console.error(error);
    response.value = 'An error occurred.';
  });
};
</script>
