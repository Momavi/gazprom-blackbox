<template>
  <div>
    <div v-if="userStore.access >= 1">
      <input v-model="newPost" class="mb-5 px-4 py-1 rounded-xl" placeholder="Ваш пост..."/>
      <div>
        <button class="bg-stone-700" @click="addPost">Отправить пост</button>
      </div>
    </div>
    <div class="flex place-content-center mt-10">
      <Post v-for="post in posts" :key="post.id" :post="post"/>
    </div>
  </div>
</template>

<script setup>
import Post from './Post.vue';
import { useUserStore } from '@stores/user-reducer.js';
import { ref } from 'vue';

const userStore = useUserStore();
const newPost = ref('')
const posts = ref([])

function addPost() {
  this.posts.unshift({ id: Date.now(), content: this.newPost, comments: [] });
  this.newPost = '';
}
;
</script>