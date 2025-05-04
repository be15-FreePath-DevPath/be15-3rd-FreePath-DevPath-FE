<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserInput from "@/features/user/components/UserInput.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
import FourLeafClover from "@/assets/images/user/four_leaf_clover.png"
import UserExtraService from "@/features/user/components/UserExtraService.vue";

</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Sign in"
        subtitle="로그인을 해주세요"
    >
      <!-- 기본 슬롯 (입력 폼들) -->
      <UserInput label="로그인 ID" placeholder="로그인 ID를 입력해주세요" />
      <UserInput label="비밀번호" placeholder="비밀번호를 입력해주세요" />

      <!-- 버튼 슬롯 -->
      <template #button>
        <UserButtonPurple
            text="로그인 하기"
            goTo="/"
            :icon="FourLeafClover"
        />
      </template>
    </UserForm>
    <UserExtraService
        topText="혹시 기억이 나지 않으신가요?"
        :links="['아이디 찾기', '비밀번호 재설정']"
        :urls="['/user/findId', '/user/resetPw']"
    />
  </div>
</template>

<style scoped>
.content-frame {
  width: 100%;
  height: 956px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
}
</style>
