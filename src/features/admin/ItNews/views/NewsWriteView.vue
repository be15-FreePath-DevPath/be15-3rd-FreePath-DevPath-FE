<script setup>
import {ref, computed, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import NewsForm from '@/features/admin/ItNews/components/NewsForm.vue'
import { saveNews } from '@/features/admin/ItNews/api.js'  // 실제 뉴스 등록 API import


const newBreadCrumbItems = ref(['관리자페이지', 'IT 기사 목록' ,'IT 기사 등록']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
});


const router = useRouter()

const newsForm = ref({
  title: '',
  content: '',
  link: '',
  mailingDate: ''
})

// isValid computed property에 mailingDate 필드도 포함하여, 모든 필드가 채워졌을 때만 등록 버튼 활성화
const isValid = computed(() =>
    newsForm.value.title.trim() !== '' &&
    newsForm.value.content.trim() !== '' &&
    newsForm.value.mailingDate.trim() !== ''  // mailingDate가 비어있지 않도록 체크
)

const goToList = () => {
  router.push('/admin')  // 뉴스 목록 페이지로 이동
}

const handleSubmit = async () => {
  const payload = {
    title: newsForm.value.title,
    content: newsForm.value.content,
    link: newsForm.value.link,  // link 값도 전달
    mailingDate: newsForm.value.mailingDate  // mailingDate 값도 전달
  };

  try {
    const response = await saveNews(payload);
    console.log('뉴스 등록 성공:', response);
    alert('뉴스 등록 완료!');
    goToList();  // 목록 페이지로 이동
  } catch (error) {
    console.error('뉴스 등록 실패:', error);
    alert('뉴스 등록 실패');
  }
};
</script>

<template>
    <div class="create-wrapper">
      <NewsForm v-model="newsForm" :isReadOnly="false" />
      <div class="button-area">
        <button @click="goToList">목록</button>
        <button :disabled="!isValid" @click="handleSubmit">등록</button> <!-- isValid가 true일 때만 활성화 -->
      </div>
    </div>
</template>

<style scoped>
.create-wrapper {
  width: 1116px;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.page-title {
  font-size: 36px;
  font-weight: 700;
}

.button-area {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

button {
  width: 130px;
  height: 56px;
  background-color: #e9e9e9;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #1c1c1c;
  color: white;
}
</style>
