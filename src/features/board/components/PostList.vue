<script setup>

import PostItem from "@/features/board/components/PostItem.vue";

const { posts } = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <PostItem
      v-for="(post, index) in posts"
      :key="index"
      :text="post.text"
      :date="post.date"
      :user="post.user"
  />
</template>

<style scoped>
</style>