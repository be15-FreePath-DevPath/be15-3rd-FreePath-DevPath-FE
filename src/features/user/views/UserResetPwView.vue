<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserInput from "@/features/user/components/UserInput.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
import UserExtraService from "@/features/user/components/UserExtraService.vue";
import Vector from "@/assets/images/user/vector.png";

</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="New password"
        subtitle="비밀번호를 재설정 합니다"
    >
      <!-- 기본 슬롯 (입력 폼들) -->
      <UserInput label="이메일" placeholder="DevPath에서 사용하는 이메일" />
      <UserInput label="로그인 ID" placeholder="로그인 ID를 입력해주세요" />
      <UserInput label="새 비밀번호" placeholder="새 비밀번호를 입력해주세요" />
      <UserInput label="새 비밀번호 확인" placeholder="새 비밀번호를 재입력해주세요" />

      <!-- 버튼 슬롯 -->
      <template #button>
        <UserButtonPurple
            text="비밀번호 재설정"
            goTo="/"
            :icon="Vector"
        />
      </template>
    </UserForm>
    <UserExtraService
        topText="로그인 ID도 잊으셨나요?"
        :links="['로그인 ID 찾기']"
        :urls="['/user/findLoginId']"
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
