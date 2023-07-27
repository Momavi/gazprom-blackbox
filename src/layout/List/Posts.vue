<template>
  <div v-if="userStore.accessLevel >= 1">
    <div class="mb-2">
      <input v-model="newPost" class="mb-5 px-4 py-1 rounded-xl bg-gray-600" placeholder="Что происходит?"
             @keydown.enter="addPost"/>
    </div>
    <div>
      <button class="bg-gray-600" @click="addPost">Твитнуть</button>
    </div>
  </div>
  <div class="flex flex-col place-items-center mt-10 p-10 rounded-xl">
    <Post v-for="post in posts" :key="post.id"
          :post="post"
          :deletePost="deletePost"
          :addComment="addComment"
          :deleteComment="deleteComment"
    />
  </div>
</template>

<script setup>
import Post from './Post.vue';
import { useUserStore } from '@stores/user-reducer.js';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const userStore = useUserStore();
const newPost = ref('');
const posts = ref([]);

async function addPost() {
  await axios.post('/api/posts/',
      {
        userId: userStore.id,
        message: newPost.value,
      },
  ).then(resp => {
    posts.value = resp.data;
  });
  newPost.value = '';
}

async function getPost() {
  await axios.get('/api/posts',
  ).then(resp => {
    posts.value = resp.data;
  });
}

async function addComment(post, newComment) {
  console.log(post, newComment);
  await axios.post('/api/posts/post/comment',
      {
        userId: userStore.id,
        postId: post.id,
        message: newComment,
      },
  ).then(resp => {
    post.comments.push(resp.data);
    newComment = '';
  });
}

async function deletePost(post) {
  await axios.delete(`/api/posts/${ post.id }`,
  ).then(resp => {
    posts.value = resp.data;
  });
}

async function deleteComment(post, comment) {
  await axios.delete(`/api/posts/${ post.id }/comments/${ comment.id }`,
  ).then(() => {
    let postId = posts.value.findIndex(item => item.id === post.id);
    let indexToRemove = post.comments.findIndex(item => item.id === comment.id);

    posts.value[postId].comments.splice(indexToRemove, 1);
  });
}

onMounted(() => {
  getPost();
});
</script>