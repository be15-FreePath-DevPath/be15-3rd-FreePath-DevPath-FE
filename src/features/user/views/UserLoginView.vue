<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserExtraService from "@/features/user/components/UserExtraService.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserWhiteButton from "@/features/user/components/UserButtonWhite.vue";
</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Welcome back to DevPath"
        subtitle="다시 와주셨군요!"
    >
      <UserWhiteButton
          general="일반 로그인"
          google="구글 로그인"
          generalUrl="/user/login/general"
          googleUrl=""
      />
    </UserForm>
    <UserExtraService
        topText="아직 회원이 아니신가요?"
        :links="['회원가입 하러 가기']"
        :urls="['/user/signup']"
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
