<template>
  <div class="relative border-gray-800 bg-gray-700 w-1/2 p-6 mb-10 rounded-xl shadow-lg text-white">
    <div class="flex justify-items-stretch justify-between items-center">
      <div class="flex">
        <UserCircleIcon class="h-6 w-6 mr-2"/>
        <p class="text-left">{{ post.user.name }}</p>
      </div>

      <button v-if="userStore.id === post.user.id" class="bg-red-600 h-8 text-center p-1 rounded text-white select-none"
              @click="deletePost(post)"><TrashIcon class="h-6 w-6"/>
      </button>
    </div>

    <div class="border-b border-gray-600 mb-6 mt-2"></div>
    <p class="text-left">{{ post.message }}</p>
    <div class="border-b border-gray-600 mb-2 mt-6"></div>

    <div class="flex cursor-pointer select-none" @click="showCommentInput = !showCommentInput">
      <ChatBubbleBottomCenterIcon class="h-6 w-6 mb-2 mr-2"/>
      <p>{{ post.comments.length }} комментариев</p>
    </div>
    <input v-if="showCommentInput" class="px-4 py-2 rounded-xl bg-gray-600 text-white placeholder-gray-400 w-full"
           v-model="newComment"
           placeholder="Комментарий" @keydown.enter="sendAddComment(post)"/>
    <div v-if="showCommentInput">
      <div class="border-b border-gray-600 mb-2 mt-6"></div>
      <div v-for="(comment, index) in post.comments" :key="index" class="mb-4">
        <div class="flex justify-between my-1">
          <div class="flex">
            <UserCircleIcon class="h-6 w-6 mr-2"/>
            <p class="text-left">{{ comment.user.name }}</p>
          </div>
          <button v-if="userStore.id === comment.user.id" class="bg-red-600 h-8 text-center p-1 rounded text-white select-none"
                  @click="deleteComment(post, comment)"><TrashIcon class="h-6 w-6"/>
          </button>
        </div>
        <div>
          <p class="text-left">{{ comment.message }}</p>
        </div>
        <div class="border-b border-gray-600 mb-2 mt-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@stores/user-reducer.js';
import { UserCircleIcon, ChatBubbleBottomCenterIcon, TrashIcon } from '@heroicons/vue/24/solid/index.js';

const newComment = ref('');
const showCommentInput = ref(false);
const userStore = useUserStore();

const props = defineProps({
  post: Object,
  deletePost: Function,
  deleteComment: Function,
  addComment: Function,
});

function sendAddComment(post) {
  props.addComment(post, this.newComment)
  this.newComment = ''
}
</script>
