<template>
  <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <p v-if="showError" class="text-red-600">У вас нет доступа, авторизуйтесь</p>
    <div class="relative py-3 sm:max-w-xl sm:mx-auto" v-if="!showError">
      <p class="text-md text-gray-600 mb-2">
        За раз максимум 100 сообщений ( всего 21 207 сообщений )
      </p>
      <div class="relative px-4 py-10 bg-gray-700 text-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md min-w-md mx-auto">
          <input
              class="px-4 py-2 rounded-xl bg-gray-600 border-2 border-gray-400 text-white placeholder-gray-400 w-full"
              v-model="filterAddress"
              placeholder="Поиск по отправителю" @input="getEmails"/>
          <div class="flex justify-center">
            <p class="text-md mt-4 border-b-2 w-fit">
              {{ emails.length }} сообщений
            </p>
          </div>
          <div class="divide-y divide-gray-200">
            <div v-for="email in emails" :key="email.id" @click="getEmail(email)"
                 class="py-4 cursor-pointer hover:opacity-60 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
              <p class="font-semibold text-gray-300">
                {{ email.address }}
              </p>
              <p class="text-md">
                {{ email.subject }}
              </p>
              <p class="text-md text-gray-300">
                {{ email.sentAt }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-700 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
            class="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-100" id="modal-headline">
                  {{ selectedEmail.subject }}
                </h3>
                <div class="mt-2">
                  <p class="text-md text-gray-500">
                    {{ selectedEmail.address }}
                  </p>
                </div>
                <div class="mt-2">
                  <p class="text-md font-medium text-gray-300">
                    {{ emailBody }}
                  </p>
                </div>
                <div class="mt-4">
                  <p class="text-md text-gray-500">
                    {{ selectedEmail.sentAt }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="closeModal"
                    class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const emails = ref([]);
    const filterAddress = ref('');
    const showModal = ref(false);
    const selectedEmail = ref(null);
    const showError = ref(false);
    const emailBody = ref('');

    const getEmails = async () => {
      try {
        if ( filterAddress.value ) {
          const response = await axios.get('/api/email/', {
            headers: { 'Authorization': `Bearer ${ localStorage.getItem('token') }` },
            params: {
              address: filterAddress.value,
            },
          });
          showError.value = response.status === 401;
          emails.value = response.data;
        } else {
          const response = await axios.get('/api/email/', {
            headers: { 'Authorization': `Bearer ${ localStorage.getItem('token') }` },
          });
          showError.value = response.status === 401;
          emails.value = response.data;
        }
      } catch ( error ) {
        showError.value = error.response.status === 401;
        console.error('Error fetching emails:', error);
      }
    };

    const getEmail = async (email) => {
      await axios.get(`/api/email/body/${ email.id }`, {
        headers: { 'Authorization': `Bearer ${ localStorage.getItem('token') }` },
      }).then((resp) => {
        emailBody.value = resp.data;
        openModal(email);
      }).catch(() => {
        emailBody.value = 'Не удалось получить';
      });
    };

    function openModal(email) {
      selectedEmail.value = email;
      showModal.value = true;
    }

    function closeModal() {
      selectedEmail.value = null;
      showModal.value = false;
    }

    onMounted(async () => {await getEmails();});

    return { emails, showError, emailBody, filterAddress, showModal, selectedEmail, getEmails, getEmail, closeModal };
  },
};
</script>
