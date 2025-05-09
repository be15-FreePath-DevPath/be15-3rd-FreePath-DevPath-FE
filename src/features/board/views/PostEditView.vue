<template>
  <div class="post-edit-view">
    <PostInputBar
        v-model:category="category"
        v-model:title="title"
        v-model:content="content"
        :readonlyCategory="true"
        @add-used-image="addUsedImage"
    />
    <PostRegistBar
        :category="category"
        :title="title"
        edit-mode
        @register="onUpdate"
        @cancelClick="onCancel"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostInputBar from '@/features/board/components/PostInputBar.vue'
import PostRegistBar from '@/features/board/components/PostRegistBar.vue'
import { fetchPostDetail, updatePost } from '@/features/board/api.js'

const emit = defineEmits(['updateBreadCrumb'])

const route = useRoute()
const router = useRouter()
const postId = route.params.id
const routeState = history.state // ✅ 전달받은 state 사용

const category = ref('')
const title = ref('')
const content = ref('')
const usedImageUrls = ref([])

const categoryMap = {
  1: '자유게시판',
  2: '직무 정보 게시판',
  3: '프로젝트 매칭 게시판'
}

onMounted(async () => {
  if (routeState?.title && routeState?.content && routeState?.category) {
    // ✅ PostDetailView에서 이동한 경우
    title.value = routeState.title
    content.value = routeState.content
    category.value = routeState.category.toString()
    console.log(category.value)
  } else {
    // ✅ 새로고침 등 직접 접근 시
    try {
      const response = await fetchPostDetail(postId)
      const data = response.data.data.postDetailDto
      category.value = data.boardCategory.toString()
      title.value = data.boardTitle
      content.value = data.boardContents
    } catch (e) {
      alert('게시글 정보를 불러오는 데 실패했습니다.')
      router.back()
      return
    }
  }

  // ✅ BreadCrumb 설정
  emit('updateBreadCrumb', ['게시판', category.value])
})

function addUsedImage(url) {
  if (!usedImageUrls.value.includes(url)) {
    usedImageUrls.value.push(url)
  }
}

async function onUpdate() {
  try {
    if (!title.value.trim() || !content.value.trim()) {
      alert('제목과 내용은 비워둘 수 없습니다.')
      return
    }

    await updatePost(postId, {
      title: title.value,
      content: content.value
    })

    alert('게시글이 수정되었습니다.')

    router.push({
      path: `/board/${postId}`,
      query: {
        category: category.value
      }
    })
  } catch (e) {
    const msg = e?.response?.data?.message || '게시글 수정 중 오류 발생'
    alert(msg)
  }
}

function onCancel() {
  router.back()
}
</script>

<style scoped>
.post-edit-view {
  padding: 20px;
}
</style>
