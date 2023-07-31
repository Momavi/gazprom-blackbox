<template>
  <div v-if="userStore.accessLevel >= 1">
    <form @submit.prevent="addPost">
      <div class="mb-2">
        <input v-model.trim="newPost" class="mb-5 px-4 py-1 rounded-xl bg-gray-600" placeholder="Что происходит?"/>
      </div>
      <div>
        <button class="bg-gray-600" type="submit">Твитнуть</button>
      </div>
    </form>
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
import { useNotificationStore } from '@stores/notification.js';
import { onMounted, ref } from 'vue';
import { makeRequest } from '../../utility/request.js';

const userStore = useUserStore();
const notificationStore = useNotificationStore();

const newPost = ref('');
const posts = ref([]);

async function getPost() {
  try {
    posts.value = await makeRequest('get', '/api/posts');
  } catch {
    await handleApiError();
  }
}

async function addPost() {
  try {
    posts.value = await makeRequest('post', `/api/posts/`, null, {
      userId: userStore.id,
      message: newPost.value,
    });
    notificationStore.setData(200, 'Пост добавлен');
    newPost.value = '';
  } catch {
    await handleApiError();
  }
}

async function addComment(post, newComment) {
  try {
    post.comments.push(await makeRequest('post', `/api/posts/post/comment`, null, {
      userId: userStore.id,
      postId: post.id,
      message: newComment,
    }));
    notificationStore.setData(200, 'Коммент добавлен');
  } catch {
    await handleApiError();
  }
}

async function deletePost(post) {
  try {
    posts.value = await makeRequest('delete', `/api/posts/${ post.id }`);
    notificationStore.setData(200, 'Пост удален');
  } catch {
    await handleApiError();
  }
}

async function deleteComment(post, comment) {
  try {
    await makeRequest('delete', `/api/posts/${ post.id }/comments/${ comment.id }`);
    const postId = posts.value.findIndex(item => item.id === post.id);
    const indexToRemove = post.comments.findIndex(item => item.id === comment.id);
    notificationStore.setData(200, 'Комментарий удален');
    posts.value[postId].comments.splice(indexToRemove, 1);
  } catch {
    await handleApiError();
  }
}

async function handleApiError() {
  notificationStore.setData(400, 'Произошла ошибка');
}

onMounted(() => {
  getPost();
});
</script>