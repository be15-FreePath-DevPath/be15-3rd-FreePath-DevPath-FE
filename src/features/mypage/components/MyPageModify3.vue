<script setup>

import MyPageBoardLarge from "@/features/mypage/components/MyPageBoardLarge.vue";
import MyPageInput from "@/features/mypage/components/MyPageInput.vue";
import MyPageButtonUpdate from "@/features/mypage/components/MyPageButtonUpdate.vue";
</script>

<template>
  <MyPageBoardLarge title="비밀번호 수정">
    <MyPageInput label="이메일" placeholder="DevPath에서 사용하는 이메일"/>
    <template #withButton>
      <MyPageInput label="새 이메일" placeholder="새 비밀번호를 입력해주세요"/>
      <MyPageButtonUpdate/>
    </template>
  </MyPageBoardLarge>
</template>

<style scoped>

</style>