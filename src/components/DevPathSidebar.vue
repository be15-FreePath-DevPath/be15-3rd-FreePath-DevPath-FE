<template>
  <div class="dev-path-sidebar">
    <div class="top-side-bar">
      <LogoGroup class="logo-group-instance"></LogoGroup>
    </div>
    <div class="frame">
      <div class="text">
        <div class="text2">게시판</div>
      </div>
      <SideBarItem text="게시판" class="side-bar-item-instance"></SideBarItem>
      <SideBarItem
          text="자유 게시판"
          class="side-bar-item-instance2"
      ></SideBarItem>
      <SideBarItem
          text="직무 정보 게시판"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="프로젝트 매칭 게시판"
          class="side-bar-item-instance"
      ></SideBarItem>
    </div>
    <div class="frame">
      <div class="text">
        <div class="div">채팅</div>
      </div>
      <SideBarItem text="채팅" class="side-bar-item-instance"></SideBarItem>
      <SideBarItem
          text="참여 중인 채팅방"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="참여 대기 중인 채팅방"
          class="side-bar-item-instance"
      ></SideBarItem>
    </div>
    <div class="frame">
      <div class="text">
        <div class="text2">개발자 역량 강화</div>
      </div>
      <SideBarItem text="CS 퀴즈" class="side-bar-item-instance"></SideBarItem>
      <SideBarItem
          text="CS 퀴즈 응시"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="CS 퀴즈 결과"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="모의 면접"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="모의 면접 목록"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="모의 면접 실행"
          class="side-bar-item-instance"
      ></SideBarItem>
    </div>
    <div class="frame">
      <div class="text">
        <div class="div">마이페이지</div>
      </div>
      <SideBarItem
          text="마이페이지"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="회원 정보 조회"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="회원 정보 수정"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="채팅 차단 목록 조회"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="개발자 성향 테스트"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="개발자 성향 테스트 응시"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="개발자 성향 테스트 결과"
          class="side-bar-item-instance"
      ></SideBarItem>
    </div>
    <div class="frame">
      <div class="text">
        <div class="div">관리자</div>
      </div>
      <SideBarItem text="CS 퀴즈" class="side-bar-item-instance"></SideBarItem>
      <SideBarItem
          text="CS 퀴즈 목록"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="CS 퀴즈 등록"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem text="IT 기사" class="side-bar-item-instance"></SideBarItem>
      <SideBarItem
          text="IT 기사 목록"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="IT 기사 등록"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="회원 신고"
          class="side-bar-item-instance"
      ></SideBarItem>
      <SideBarItem
          text="회원 신고 검토 목록"
          class="side-bar-item-instance"
      ></SideBarItem>
    </div>
  </div>
</template>
<script>
import LogoGroup from "../components/LogoGroup/LogoGroup.vue";
import SideBarItem from "../components/SideBarItem.vue";

export default {
  name: "DevPathSidebar",
  components: {
    LogoGroup,
    SideBarItem,
  },
  props: {},
  data() {},
};
</script>
<style scoped>
.dev-path-sidebar,
.dev-path-sidebar * {
  box-sizing: border-box;
}
.dev-path-sidebar {
  border-style: solid;
  border-color: var(--black-10, rgba(28, 28, 28, 0.1));
  border-width: 0px 1px 0px 0px;
  padding: var(--20, 20px) var(--16, 16px) var(--20, 20px) var(--16, 16px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  width: 270px;
  height: 1024px;
  position: relative;
}
.top-side-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  width: 238px;
  position: relative;
}
.frame {
  padding: 0px 0px var(--12, 12px) 0px;
  display: flex;
  flex-direction: column;
  gap: var(--4, 4px);
  align-items: flex-start;
  justify-content: flex-start;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.text {
  border-radius: var(--8, 8px);
  padding: var(--4, 4px) var(--12, 12px) var(--4, 4px) var(--12, 12px);
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: flex-start;
  justify-content: center;
  align-self: stretch;
  flex-shrink: 0;
  position: relative;
}
.text2 {
  color: var(--black-40, rgba(28, 28, 28, 0.4));
  text-align: left;
  font-family: var(--14-regular-font-family, "Inter-Regular", sans-serif);
  font-size: var(--14-regular-font-size, 14px);
  line-height: var(--14-regular-line-height, 20px);
  font-weight: var(--14-regular-font-weight, 400);
  position: relative;
  align-self: stretch;
}
.side-bar-item-instance {
  flex-shrink: 0 !important;
  height: 28px !important;
}
.side-bar-item-instance2 {
  background: var(--black-5, rgba(28, 28, 28, 0.05)) !important;
  flex-shrink: 0 !important;
  height: 28px !important;
}
.div {
  color: var(--black-40, rgba(28, 28, 28, 0.4));
  text-align: left;
  font-family: var(--14-regular-font-family, "Inter-Regular", sans-serif);
  font-size: var(--14-regular-font-size, 14px);
  line-height: var(--14-regular-line-height, 20px);
  font-weight: var(--14-regular-font-weight, 400);
  position: relative;
  align-self: stretch;
}
</style>
