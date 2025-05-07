<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'

import likedIcon from '@/assets/images/board/BigHeartStraightRed.png'
import unlikedIcon from '@/assets/images/board/BigHeartStraight.png'
import bookmarkedIcon from '@/assets/images/board/BookmarkSimpleBlack.png'
import unbookmarkedIcon from '@/assets/images/board/BookmarkSimple.png'

import {
  hasUserLikedBoard,
  countLikesByBoardId,
  like,
  unlike,
  hasUserBookmarkedPost,
  bookmark,
  unbookmark
} from '@/features/interaction/api.js'

// 스토어 및 라우터
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast({ position: 'top-center', timeout: 2000 })

// 게시글 ID
const route = useRoute()
const postId = route.params.id

// 상태값
const isLiked = ref(false)
const likeCount = ref(0)
const isBookmarked = ref(false)

// 초기 상태 조회
onMounted(async () => {
  try {
    // 좋아요 개수는 누구나 조회 가능
    const countRes = await countLikesByBoardId(postId)
    likeCount.value = countRes.data.data

    // 로그인 사용자만 좋아요/북마크 여부 조회
    if (authStore.isAuthenticated) {
      const [likeRes, bookmarkRes] = await Promise.all([
        hasUserLikedBoard(postId),
        hasUserBookmarkedPost(postId)
      ])
      isLiked.value = likeRes.data.data
      isBookmarked.value = bookmarkRes.data.data
    }
  } catch (err) {
    console.error('초기 상태 조회 실패:', err)
    toast.error('초기 상태 조회 중 오류 발생')
  }
})

// 좋아요 토글
const toggleLike = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning('로그인이 필요합니다.')
    router.push('/user/login')
    return
  }

  const payload = { boardId: parseInt(postId), commentId: null }

  try {
    if (isLiked.value) {
      await unlike(payload)
      likeCount.value--
      toast.info('좋아요를 취소했습니다.')
    } else {
      await like(payload)
      likeCount.value++
      toast.success('좋아요를 눌렀습니다!')
    }
    isLiked.value = !isLiked.value
  } catch (err) {
    console.error('좋아요 처리 실패:', err)
    toast.error('좋아요 처리 중 오류가 발생했습니다.')
  }
}

// 북마크 토글
const toggleBookmark = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning('로그인이 필요합니다.')
    router.push('/user/login')
    return
  }

  const payload = { boardId: parseInt(postId) }

  try {
    if (isBookmarked.value) {
      await unbookmark(payload)
      toast.info('북마크를 해제했습니다.')
    } else {
      await bookmark(payload)
      toast.success('북마크에 추가했습니다!')
    }
    isBookmarked.value = !isBookmarked.value
  } catch (err) {
    console.error('북마크 처리 실패:', err)
    toast.error('북마크 처리 중 오류가 발생했습니다.')
  }
}
</script>



<template>
  <div class="post-action-bar">
    <div class="left-actions" @click="toggleLike">
      <img :src="isLiked ? likedIcon : unlikedIcon" alt="좋아요" class="icon" />
      <span class="like-count">{{ likeCount }}</span>
    </div>
    <div class="right-actions" @click="toggleBookmark">
      <img :src="isBookmarked ? bookmarkedIcon : unbookmarkedIcon" alt="북마크" class="icon" />
    </div>
  </div>
</template>

<style scoped>
.post-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 12px;
  border-bottom: 2px solid #eee;
}

.left-actions,
.right-actions {
  display: flex;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  object-fit: contain;
}

img[alt="북마크"][src*="BookmarkSimpleBlack"] {
  transform: scale(1.2);
}



.like-count {
  margin-left: 6px;
  font-size: 1em;
  font-weight: 500;
  color: #333;
}
</style>
