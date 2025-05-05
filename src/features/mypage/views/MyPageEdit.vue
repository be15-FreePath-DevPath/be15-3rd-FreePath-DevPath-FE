<script setup>

import MyPageBoardLarge from "@/features/mypage/components/MyPageBoardLarge.vue";
import MyPageInput from "@/features/mypage/components/MyPageInput.vue";
import MyPageItNewsSub from "@/features/mypage/components/MyPageItNewsSub.vue";
import MyPageButtonUpdate from "@/features/mypage/components/MyPageButtonUpdate.vue";
</script>

<template>
  <div class="frame">
      <MyPageBoardLarge title="내 정보 수정">
        <MyPageInput label="새 닉네임 " placeholder="새 닉네임을 입력해주세요" />
        <template #withButton>
          <MyPageItNewsSub />
          <MyPageButtonUpdate />
        </template>
      </MyPageBoardLarge>
      <MyPageBoardLarge title="이메일 수정">
        <template #withButton>
          <MyPageInput label="새 이메일" placeholder="새 이메일을 입력해주세요" />
          <MyPageButtonUpdate />
        </template>
      </MyPageBoardLarge>
      <MyPageBoardLarge title="비밀번호 수정">
        <MyPageInput label="이메일" placeholder="DevPath에서 사용하는 이메일" />
        <template #withButton>
          <MyPageInput label="새 이메일" placeholder="새 비밀번호를 입력해주세요" />
          <MyPageButtonUpdate />
        </template>
      </MyPageBoardLarge>
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