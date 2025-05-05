<script setup>

import MyPageBoard from "@/features/mypage/components/MyPageBoard.vue";
import MyPageProfile from "@/features/mypage/components/MyPageProfile.vue";
import MyPageButtonBlue from "@/features/mypage/components/MyPageButtonBlue.vue";
import MyPageButtonWhite from "@/features/mypage/components/MyPageButtonWhite.vue";
import MyPageContent from "@/features/mypage/components/MyPageContent.vue";

</script>

<template>
  <div class="content-frame">
    <MyPageBoard title="내 프로필">
      <MyPageProfile />
    </MyPageBoard>
    <MyPageBoard title="개발자 MBTI">
      <MyPageButtonBlue />
    </MyPageBoard>
    <MyPageBoard title="채팅">
      <MyPageButtonWhite />
    </MyPageBoard>
    <MyPageBoard>
      <MyPageContent />
    </MyPageBoard>
  </div>

</template>

<style scoped>
.content-frame {
  width: 940px;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  padding: 28px;
  box-sizing: border-box;
  justify-content: flex-start;
  margin: 0 auto;
}
</style>