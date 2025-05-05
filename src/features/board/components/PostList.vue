<script setup>

import PostItem from "@/features/board/components/PostItem.vue";

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
});

console.log(props.posts);
</script>

<template>
  <PostItem
      v-for="(post, index) in posts"
      :key="index"
      :id="post.id"
      :text="post.text"
      :date="post.date"
      :user="post.user"
  />
</template>

<style scoped>
</style>