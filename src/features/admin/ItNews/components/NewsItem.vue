<script setup>
const { news } = defineProps({
  news: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="news-item">
    <h3>{{ news.title }}</h3>
    <p>{{ news.content }}</p>
    <a :href="news.link" target="_blank">기사 보러가기</a>
    <p v-if="news.mailingDate">보낸 날짜: {{ new Date(news.mailingDate).toLocaleDateString() }}</p>
  </div>
</template>

<style scoped>
.news-item {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
