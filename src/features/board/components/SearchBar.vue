<template>
  <div class="search-bar">
    <input v-model="keyword" placeholder="검색어를 입력하세요" @keyup.enter="search"/>

    <button @click="toggleFilter">필터</button>

    <transition name="fade-expand">
      <div class="filters" v-show="showFilters">
        <label>
          <input
              type="checkbox"
              :checked="filters.title"
              @change="handleCheckboxChange('title')"
          /> 제목
        </label>
        <label>
          <input
              type="checkbox"
              :checked="filters.content"
              @change="handleCheckboxChange('content')"
          /> 내용
        </label>
        <label>
          <input
              type="checkbox"
              :checked="filters.user"
              @change="handleCheckboxChange('user')"
          /> 작성자
        </label>

        <div class="date-range">
          <label>시작일 <input type="date" v-model="filters.startDate" /></label>
          <label>종료일 <input type="date" v-model="filters.endDate" /></label>
        </div>
      </div>
    </transition>

    <button @click="search">🔍검색</button>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useToast } from 'vue-toastification'; // Toast 라이브러리

const toast = useToast(); // toast 인스턴스

const emit = defineEmits(['search']);

const keyword = ref('');
const showFilters = ref(false);
const filters = reactive({
  title: true,
  content: false,
  user: false,
  startDate: '',
  endDate: '',
});

const toggleFilter = () => {
  showFilters.value = !showFilters.value;
};

// 체크박스 단일 선택 로직
const handleCheckboxChange = (key) => {
  if (key === 'content') {
    // 내용 선택 시: 제목, 작성자, 날짜 초기화
    filters.title = false;
    filters.user = false;
    filters.startDate = '';
    filters.endDate = '';
    filters.content = !filters.content;
    return;
  }

  // 내용이 이미 선택돼 있으면 해제
  if (filters.content) filters.content = false;

  // 제목 선택 시 → 작성자 해제
  if (key === 'title') {
    filters.title = !filters.title;
    if (filters.title && filters.user) filters.user = false;
  }

  // 작성자 선택 시 → 제목 해제
  if (key === 'user') {
    filters.user = !filters.user;
    if (filters.user && filters.title) filters.title = false;
  }
};

watch(
    () => [filters.startDate, filters.endDate],
    ([start, end]) => {
      if (start || end) {
        // 날짜 선택 시 내용 필터는 무조건 해제
        filters.content = false;
      }
    }
);

// 날짜 차이 28일 초과 여부 검사
const isDateRangeTooLong = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffInMs = endDate - startDate;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays > 28;
};

const search = () => {
  const { startDate, endDate } = filters;

  if (startDate && endDate) {
    if (new Date(startDate) > new Date(endDate)) {
      toast.error('시작일이 종료일보다 늦을 수 없습니다.');
      return;
    }

    if (isDateRangeTooLong(startDate, endDate)) {
      toast.warning('검색 기간은 최대 4주(28일) 이내여야 합니다.');
      return;
    }
  } else if (startDate || endDate) {
    toast.warning('시작일과 종료일을 모두 선택해야 합니다.');
    return;
  }

  emit('search', {
    keyWord: filters.title ? keyword.value : undefined,
    nickname: filters.user ? keyword.value : undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
  });

};


</script>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: 20px 0;
  background-color: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 0 4px #ccc;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}

.date-range {
  display: flex;
  gap: 12px;
}

/* 검색 바 애니메이션 */
.fade-expand-enter-active,
.fade-expand-leave-active {
  transition: all 0.3s ease;
}
.fade-expand-enter-from,
.fade-expand-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
.fade-expand-enter-to,
.fade-expand-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
