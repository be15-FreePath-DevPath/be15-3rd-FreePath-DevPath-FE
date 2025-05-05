<script setup>

import PostItem from "@/features/board/components/PostItem.vue";

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});
</script>

<template>
  <PostItem
      v-for="(post, index) in posts"
      :key="index"
      :id="post.id"
      :text="post.text"
      :date="post.date"
      :user="post.user"
      :category="category"
  />
</template>

<style scoped>
</style>