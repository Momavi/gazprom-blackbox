<template>
  <div class="border-2 border-stone-400 w-fit p-4 rounded-2xl">
    <p class="mb-5">{{ post.content }}</p>
    <div v-for="comment in post.comments" :key="comment.id">
      <p>{{ comment.content }}</p>
    </div>
    <input class="mb-5 px-4 py-1 rounded-xl" v-model="newComment" placeholder="Комментарий" />
    <div>
      <button class="bg-stone-700" @click="addComment">Add comment</button>

    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data() {
    return {
      newComment: ''
    }
  },
  methods: {
    addComment() {
      this.post.comments.push({ id: Date.now(), content: this.newComment })
      this.newComment = ''
    }
  }
}
</script>
