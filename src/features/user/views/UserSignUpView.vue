<script setup>
import UserForm from "@/features/user/components/UserForm.vue";
import UserExtraService from "@/features/user/components/UserExtraService.vue";
import UserLogo from "@/features/user/components/UserLogo.vue";
import UserButtonWhite from "@/features/user/components/UserButtonWhite.vue";
import {signupGoogleTemp} from "@/features/user/api.js";

</script>

<template>
  <div class="content-frame">
    <UserLogo />
    <UserForm
        title="Welcome to DevPath"
        subtitle="처음 방문하시나요?"
    >
      <UserButtonWhite
          general="일반 회원가입"
          google="구글 회원가입"
          generalUrl="/user/signup/general"
          @click-google="signupGoogleTemp"
      />
    </UserForm>
    <UserExtraService
        topText="이미 가입한 회원이신가요?"
        :links="['로그인 하러 가기']"
        :urls="['/user/login']"
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
