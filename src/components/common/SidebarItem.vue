<template>
  <div class="sidebar-item-wrapper">
    <!-- 선택된 항목일 경우 왼쪽에 표시될 검정 rectangle -->
    <img
        v-if="isActive"
        :src="selectedIcon"
        alt="selected"
        class="selected-indicator"
    />

    <!-- 실제 메뉴 항목 -->
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

// 현재 경로가 해당 메뉴와 같으면 active 처리
const isActive = computed(() => {
  if (route.path === '/admin') {
    const tab = route.query.tab;

    // 각 탭과 text에 맞춰서 활성화 처리
    return (
        (tab === 'news' && props.text === 'IT 기사 목록') ||
        (tab === 'quiz' && props.text === 'CS 퀴즈 목록') ||
        (tab === 'report' && props.text === '회원 신고 검토 목록')
    );
  }

  // 기본적인 경로 일치 시 활성화
  return route.path === props.to;
});
</script>

<style scoped>
.sidebar-item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

/* 좌측 검정 rectangle */
.selected-indicator {
  position: absolute;
  left: 0;
  width: 4px;
  height: 100%;
}

/* 기본 항목 스타일 */
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

/* Hover 시 음영 */
.sidebar-item:hover {
  background-color: rgba(28, 28, 28, 0.05);
}

/* Active(선택) 시 더 짙은 음영 */
.sidebar-item.active {
  background-color: rgba(28, 28, 28, 0.1);
  font-weight: 500;
}
</style>
