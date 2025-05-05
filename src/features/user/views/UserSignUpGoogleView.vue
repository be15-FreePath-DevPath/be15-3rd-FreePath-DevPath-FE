<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserInput from "@/features/user/components/UserInput.vue";
import UserItNewsSubWhite from "@/features/user/components/UserItNewsSub.vue";
import UserButtonPurple from "@/features/user/components/UserButtonPurple.vue";
import fourLeafClover from '@/assets/images/user/four_leaf_clover.png'

</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Sign up"
        subtitle="회원 정보를 입력해주세요"
    >
      <!-- 기본 슬롯 (입력 폼들) -->
      <UserInput label="닉네임" placeholder="닉네임을 입력해주세요" />
      <UserItNewsSubWhite />

      <!-- 버튼 슬롯 -->
      <template #button>
        <UserButtonPurple
            text="회원가입 하기"
            goTo="/user/login"
            :icon="fourLeafClover"
        />
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
