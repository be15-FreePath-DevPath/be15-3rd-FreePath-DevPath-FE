<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserInput from "@/features/user/components/UserInput.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
import MagnifyingGlass from "@/assets/images/user/magnifying_glass.png";
import UserExtraService from "@/features/user/components/UserExtraService.vue";

</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Let's find your ID"
        subtitle="로그인 ID를 찾아드릴게요"
    >
      <!-- 기본 슬롯 (입력 폼들) -->
      <UserInput label="이메일" placeholder="DevPath에서 사용하는 이메일" />

      <!-- 버튼 슬롯 -->
      <template #button>
        <UserButtonPurple
            text="로그인 ID 찾기"
            goTo="/"
            :icon="MagnifyingGlass"
        />
      </template>
    </UserForm>
    <UserExtraService
        topText="비밀번호도 잊으셨나요?"
        :links="['비밀번호 재설정']"
        :urls="['/user/resetPw']"
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
