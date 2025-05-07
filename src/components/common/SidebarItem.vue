<template>
  <div class="sidebar-item-wrapper">
    <img
        v-if="isActive"
        :src="selectedIcon"
        alt="selected"
        class="selected-indicator"
    />
    <router-link
        :to="to"
        class="sidebar-item"
        :class="{ active: isActive }"
    >
      {{ text }}
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import selectedIcon from '@/assets/images/common/sidebar/selectedIcon.png'

const props = defineProps({
  text: String,
  to: String
})

const route = useRoute()

const isActive = computed(() => {
  const path = route.path

  // 게시판
  if ([
    '/board/free', '/board/job', '/board/project'
  ].includes(props.to)) {
    if (path.startsWith('/board/') && path !== '/board/write') {
      const categoryMap = {
        1: '자유 게시판',
        2: '직무 정보 게시판',
        3: '프로젝트 매칭 게시판'
      }
      const postCategoryId = Number(route.query.categoryId || route.params.categoryId)
      return props.text === categoryMap[postCategoryId] || path === props.to
    }
    if (path === '/board/write') {
      const from = route.query.from
      return (
          (from === 'free' && props.text === '자유 게시판') ||
          (from === 'job' && props.text === '직무 정보 게시판') ||
          (from === 'project' && props.text === '프로젝트 매칭 게시판')
      )
    }
  }

  // 채팅
  if (props.to === '/chatting') return path === '/chatting'
  if (props.to === '/chatting/pending') return path === '/chatting/pending'

  // CS퀴즈
  if (props.to === '/csquiz') return path.startsWith('/csquiz')

  // 모의면접
  if (props.to === '/interview/list') {
    return path === '/interview/list' || /^\/interview\/\d+$/.test(path)
  }
  if (props.to === '/interview/run') {
    return path === '/interview/run' || path.startsWith('/interview/progress')
  }

  // 마이페이지
  if (props.to === '/mypage/info') return path === '/mypage/info'
  if (props.to === '/mypage/edit') return path === '/mypage/edit'
  if (props.to === '/mypage/block') return path === '/mypage/block'
  if (props.to === '/mypage/devti/solve') {
    return path === '/mypage/devti/solve' || path === '/mypage/devti/test'
  }
  if (props.to === '/mypage/devti/result') return path === '/mypage/devti/result'

  // 관리자
  if (props.to.startsWith('/admin/csquiz')) return path.startsWith('/admin/csquiz')
  if (props.to.startsWith('/admin/news')) return path.startsWith('/admin/news')
  if (props.to.startsWith('/report/check')) return path.startsWith('/report/check')

  // 기본
  return path === props.to
})
</script>

<style scoped>
.sidebar-item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.selected-indicator {
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
}

.sidebar-item {
  box-sizing: border-box;
  padding: 6px 12px 6px 54px;
  border-radius: 6px;
  font-size: 14px;
  color: #1c1c1c;
  text-decoration: none;
  display: block;
  width: 100%;
  transition: background 0.2s;
}

.sidebar-item:hover {
  background-color: rgba(28, 28, 28, 0.05);
}

.sidebar-item.active {
  background-color: rgba(28, 28, 28, 0.1);
  font-weight: 500;
}
</style>
