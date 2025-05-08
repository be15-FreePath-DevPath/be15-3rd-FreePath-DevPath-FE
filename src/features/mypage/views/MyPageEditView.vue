<script setup>

import MyPageModify1 from "@/features/mypage/components/MyPageModify1.vue";
import MyPageModify2 from "@/features/mypage/components/MyPageModify2.vue";
import MyPageModify3 from "@/features/mypage/components/MyPageModify3.vue";
import {onMounted, ref} from "vue";

const newBreadCrumbItems = ref(['마이페이지', '회원 정보 수정']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value)
})
</script>

<template>
  <div class="frame">
    <MyPageModify1 />

    <MyPageModify2 />

    <MyPageModify3 />
  </div>
</template>

<style scoped>
.frame {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 892px;
  margin: 0 auto;
  box-sizing: border-box;
  gap: 28px;
}

</style>