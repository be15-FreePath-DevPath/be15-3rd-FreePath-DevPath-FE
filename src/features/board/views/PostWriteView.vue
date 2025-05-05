<template>
  <div class="post-write-view">
    <!-- 입력 바 -->
    <PostInputBar
        v-model:category="category"
        v-model:title="title"
        v-model:content="content"
    />

    <!-- 등록/취소 바 -->
    <PostRegistBar
        :category="category"
        :title="title"
        v-model:createChat="createChat"
        v-model:chatTitle="chatTitle"
        @register="onRegister"
        @cancel-click="onCancel"
    />
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import PostInputBar from "@/features/board/components/PostInputBar.vue"
import PostRegistBar from "@/features/board/components/PostRegistBar.vue"

const router = useRouter()

const category = ref('')
const title = ref('')
const content = ref('')
const createChat = ref(false)
const chatTitle = ref('')

watch(category, (newCat) => {
  if (newCat !== '프로젝트 매칭 게시판') {
    createChat.value = false
    chatTitle.value = ''
  }
})

function onRegister() {
  const payload = {
    category: category.value,
    title: title.value,
    content: content.value,
    chatRoom: createChat.value
        ? {title: chatTitle.value || title.value}
        : null
  }
  console.log('register payload:', payload)
  router.back()
}

function onCancel() {
  router.back()
}
</script>

<style scoped>

</style>
