<template>
  <p v-if="showError" class="text-red-600">У вас нет доступа, авторизуйтесь</p>
  <div v-if="!file.length" class="flex flex-col items-center justify-center">
    <div v-if="!showHomeFolder" class="flex align-middle place-items-center">
      <div @click="homeFolder"
           class="rounded overflow-hidden w-12 shadow-lg p-3 mr-3 bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
        <div>
          <ArrowLeftIcon class="h-6 w-6"/>
        </div>
      </div>
      <p class="p-3 pb-1 text-2xl font-bold border-b-2 border-gray-700">/{{ openFolderName }}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-4">
      <div
          v-for="file in folder"
          :key="file.name"
          class="rounded overflow-hidden shadow-lg p-3 bg-gray-800 hover:bg-gray-700 transition cursor-pointer"
          @click="file.type === 'directory' ? openFolder(file.name) : openFile(file.name)"
      >
        <div class="flex items-center">
          <FolderIcon v-if="file.type === 'directory'" class="h-6 w-6"/>
          <DocumentIcon v-else class="h-6 w-6"/>
          <span class="ml-2">{{ file.name }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div @click="homeFolder"
         class="rounded overflow-hidden w-12 shadow-lg p-3 mb-3 bg-gray-800 hover:bg-gray-700 transition cursor-pointer">
      <div>
        <ArrowLeftIcon class="h-6 w-6"/>
      </div>
    </div>
    <div class="rounded overflow-hidden shadow-lg p-3 bg-gray-800">
      <p class="text-2xl font-bold">{{ openFolderName ? `/${ openFolderName }/` : null }}{{ openFileName }}</p>
      <div class="border-b border-gray-700 mb-6 mt-2"></div>
      <div class="text-start">
        <p v-for="(text, index) in file" :key="index">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { FolderIcon, DocumentIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid/index.js';
import { onMounted, ref } from 'vue';
import { makeRequest } from '../../utility/request.js';

const openFolderName = ref('');
const folder = ref([]);
const openFileName = ref('');
const file = ref([]);
let showError = ref(false);
const showHomeFolder = ref(true);

async function created() {
  folder.value = await makeRequest('get', '/api/files', showError);
}

async function openFolder(folderName) {
  folder.value = await makeRequest('get', `/api/files/folder/${folderName}`, showError);
  openFolderName.value = folderName;
  showHomeFolder.value = false;
}

async function openFile(fileName) {
  let response;
  if (openFolderName.value.length) {
    response = await makeRequest('post', `/api/files/fileinfolder`, showError, { pathToFile: `files/${openFolderName.value}/${fileName}` });
  } else {
    response = await makeRequest('get', `/api/files/file/${fileName}`, showError);
  }
  openFileName.value = fileName;
  if (response.length) {
    file.value = response;
  } else {
    file.value = [''];
  }
  showHomeFolder.value = false;
}

async function homeFolder() {
  await created();
  file.value = [];
  openFolderName.value = '';
  openFolderName.value = '';
  showHomeFolder.value = true;
}

onMounted(created);

</script>
