<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserInput from "@/features/user/components/UserInput.vue";
import UserItNewsSubWhite from "@/features/user/components/UserItNewsSub.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Sign Up"
        subtitle="회원 정보를 입력해주세요"
    >
      <!-- 기본 슬롯 (입력 폼들) -->
      <UserInput label="로그인 ID" placeholder="로그인 ID를 입력해주세요" />
      <UserInput label="비밀번호" placeholder="비밀번호를 입력해주세요" />
      <UserInput label="비밀번호 확인" placeholder="비밀번호를 재입력해주세요" />
      <UserInput label="이름" placeholder="이름을 입력해주세요" />
      <UserInput label="이메일" placeholder="이메일을 입력해주세요" />
      <UserInput label="닉네임" placeholder="닉네임을 입력해주세요" />
      <UserItNewsSubWhite />

      <!-- 버튼 슬롯 -->
      <template #button>
        <UserButtonPurple text="회원가입 하기" goTo="/user/login" />
      </template>
    </UserForm>
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
