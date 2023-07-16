<template>
  <div>
    <ul>
      <li v-for="file in files" :key="file.id">{{ file.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      files: []
    }
  },
  async created() {
    const response = await axios.get('http://localhost:9090/files')
    this.files = response.data
  }
}
</script>
