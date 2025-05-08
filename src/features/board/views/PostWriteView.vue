<template>
  <div class="post-write-view">
    <PostInputBar
        v-model:category="category"
        v-model:title="title"
        v-model:content="content"
        @add-used-image="addUsedImage"
    />
    <PostRegistBar
        :category="category"
        :title="title"
        v-model:createChat="createChat"
        v-model:chatTitle="chatTitle"
        @register="onRegister"
        @cancelClick="onCancel"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import PostInputBar from '@/features/board/components/PostInputBar.vue'
import PostRegistBar from '@/features/board/components/PostRegistBar.vue'
import { createPost } from '@/features/board/api.js'
import {createGroupChattingRoom} from "@/features/chatting/api.js";

const router = useRouter()

const emit = defineEmits(['updateBreadCrumb'])
const categoryMap = {
  1: '자유게시판',
  2: '직무 정보 게시판',
  3: '프로젝트 매칭 게시판'
};

const category = ref('')
const title = ref('')
const content = ref('')
const createChat = ref(false)
const chatTitle = ref('')
const usedImageUrls = ref([])

function addUsedImage(url) {
  if (!usedImageUrls.value.includes(url)) {
    usedImageUrls.value.push(url)
  }
}

// 프로젝트 매칭 외 카테고리일 때 채팅 비활성화
watch(category, (newCat) => {
  if (newCat !== '프로젝트 매칭 게시판') {
    createChat.value = false
    chatTitle.value = ''
  }
})

async function onRegister() {
  try {
    const payload = {
      boardCategory: category.value,
      boardTitle: title.value,
      boardContents: content.value,
      vote: null,
      // usedImageUrls: [...usedImageUrls.value]   -> S3 put 요청등을 최소화하기 위해 그냥 임시저장 파일을 영구 저장시켜 사용하기
    }

    const response = await createPost(payload)
    const postId = response.data.data.postId

    // ✅ 채팅방 생성 조건: 프로젝트 매칭 게시판 + 체크박스 ON
    if (category.value === '3' && createChat.value) {
      await createGroupChattingRoom(postId, chatTitle.value || title.value)
    }

    alert('게시글이 등록되었습니다.')

    emit('updateBreadCrumb', ['게시판', categoryMap[category.value]])

    router.push({
      path: `/board/${postId}`,
      query: {
        category: categoryMap[category.value] || '알 수 없음'
      }
    })

  } catch (e) {
    const msg = e?.response?.data?.message || '게시글 등록 중 오류가 발생했습니다.'
    alert(msg)
    console.error(e)
  }
}

function onCancel() {
  router.back()
}
</script>

<style scoped>
.post-write-view {
  padding: 20px;
}
</style>