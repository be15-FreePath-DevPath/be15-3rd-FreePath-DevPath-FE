<script setup>
import MainInfoPaging from "@/features/main/components/MainInfoPaging.vue";
import MainContentBoard from "@/features/main/components/MainContentBoard.vue";
import { onMounted, ref } from 'vue';

const newBreadCrumbItems = ref(['메인페이지']);
const emit = defineEmits(['updateBreadCrumb']);

onMounted(() => {
  emit('updateBreadCrumb', newBreadCrumbItems.value);
});

// 테스트 값
// 자유게시판: 개발자 일상, 고민, 사담 등
const freeBoardItems = [
  {
    date: "2025.04.24 17:10",
    user: "야근탈출러",
    userImage: "src/assets/images/main/user.png",
    title: "요즘 개발 너무 지쳐요… 다들 어떻게 재충전하시나요?"
  },
  {
    date: "2025.04.24 17:00",
    user: "백엔드꿈나무",
    userImage: "src/assets/images/main/user.png",
    title: "스터디 모임 끝나고 혼술하면서 코드 보는 나란 사람..."
  },
  {
    date: "2025.04.24 16:55",
    user: "코딩하는고냥이",
    userImage: "src/assets/images/main/user.png",
    title: "DevTI 너무 정확하다!!!!!!"
  },
  {
    date: "2025.04.24 16:45",
    user: "이직준비생J",
    userImage: "src/assets/images/main/user.png",
    title: "포폴에 뭘 넣어야 임팩트 있을까요? 조언 부탁드려요"
  },
  {
    date: "2025.04.24 16:35",
    user: "퇴근하고싶다",
    userImage: "src/assets/images/main/user.png",
    title: "직장인 개발자분들 체력관리 어떻게 하세요?"
  },
  {
    date: "2025.04.24 16:30",
    user: "구글링장인",
    userImage: "src/assets/images/main/user.png",
    title: "개발자들이 쓴 재밌는 책 추천 받아요📚"
  },
  {
    date: "2025.04.24 16:20",
    user: "야매디자이너",
    userImage: "src/assets/images/main/user.png",
    title: "피그마 쓰다보면 진짜 프론트 고마워짐"
  },
  {
    date: "2025.04.24 16:10",
    user: "그만좀망해",
    userImage: "src/assets/images/main/user.png",
    title: "디버깅하다 울었어요ㅋㅋㅋ 누구 위로해줘요"
  },
  {
    date: "2025.04.24 16:00",
    user: "열정맨",
    userImage: "src/assets/images/main/user.png",
    title: "오늘도 커밋했어요🔥 여러분도 파이팅!"
  },
  {
    date: "2025.04.24 15:50",
    user: "어제의나",
    userImage: "src/assets/images/main/user.png",
    title: "면접에서 자존감 떨어졌어요… 위로 한마디만ㅠ"
  },
  {
    date: "2025.04.24 15:40",
    user: "낭만코더",
    userImage: "src/assets/images/main/user.png",
    title: "퇴근하고 별 보며 코딩하는 낭만 아시는 분?"
  },
  {
    date: "2025.04.24 15:30",
    user: "debugguy",
    userImage: "src/assets/images/main/user.png",
    title: "버그를 보고도 못 고치는 나, 괜찮을까요…?"
  },
  {
    date: "2025.04.24 15:20",
    user: "키보드워리어",
    userImage: "src/assets/images/main/user.png",
    title: "새 키보드 샀어요. 만족감 미쳤다ㅋㅋ"
  },
  {
    date: "2025.04.24 15:10",
    user: "혼코딩중",
    userImage: "src/assets/images/main/user.png",
    title: "요즘 코딩하면서 외로움 많이 느껴요ㅠㅠ"
  },
  {
    date: "2025.04.24 15:00",
    user: "밤샘러버",
    userImage: "src/assets/images/main/user.png",
    title: "밤샘하면서 개발하는 사람들 있나요?"
  }
];


// 직무게시판: 백엔드(Java, Spring), 코드 리뷰, 기술 토론 등
const jobBoardItems = [
  {
    date: "2025.04.24 17:05",
    user: "javadev_99",
    userImage: "src/assets/images/main/user.png",
    title: "Spring Bean 생성 시점에 대한 궁금증 있어요"
  },
  {
    date: "2025.04.24 17:00",
    user: "엔티티지옥",
    userImage: "src/assets/images/main/user.png",
    title: "JPA 양방향 매핑 진짜 꼭 필요한가요?"
  },
  {
    date: "2025.04.24 16:55",
    user: "스프링레인저",
    userImage: "src/assets/images/main/user.png",
    title: "@Transactional 안 먹는 경우 왜 발생할까요?"
  },
  {
    date: "2025.04.24 16:50",
    user: "DB는내친구",
    userImage: "src/assets/images/main/user.png",
    title: "Index 설계 시 고려할 점 조언 부탁드려요"
  },
  {
    date: "2025.04.24 16:45",
    user: "REST러버",
    userImage: "src/assets/images/main/user.png",
    title: "REST API 설계 시 가장 자주 하는 실수는?"
  },
  {
    date: "2025.04.24 16:40",
    user: "bean스프린터",
    userImage: "src/assets/images/main/user.png",
    title: "DI 컨테이너가 IoC의 전부는 아닌 거죠?"
  },
  {
    date: "2025.04.24 16:35",
    user: "시큐리티고인물",
    userImage: "src/assets/images/main/user.png",
    title: "Spring Security 인증 흐름 한 번에 정리해봄"
  },
  {
    date: "2025.04.24 16:30",
    user: "newbieweb",
    userImage: "src/assets/images/main/user.png",
    title: "MVC vs MVVM 개념 차이 쉽게 설명 가능할까요?"
  },
  {
    date: "2025.04.24 16:25",
    user: "람다의정석",
    userImage: "src/assets/images/main/user.png",
    title: "Java Stream map과 flatMap 직관적으로 정리"
  },
  {
    date: "2025.04.24 16:20",
    user: "쿼리매니아",
    userImage: "src/assets/images/main/user.png",
    title: "Native Query vs JPQL 어떤 상황에서 쓰세요?"
  },
  {
    date: "2025.04.24 16:15",
    user: "배치짱",
    userImage: "src/assets/images/main/user.png",
    title: "Spring Batch로 대용량 처리할 때 팁 공유해요"
  },
  {
    date: "2025.04.24 16:10",
    user: "스프링부트부트",
    userImage: "src/assets/images/main/user.png",
    title: "SpringBoot 3.0 마이그레이션 팁 모음"
  },
  {
    date: "2025.04.24 16:05",
    user: "오류콜렉터",
    userImage: "src/assets/images/main/user.png",
    title: "500 오류 로그만으로 원인 파악하는 팁 있을까요?"
  },
  {
    date: "2025.04.24 16:00",
    user: "비동기러버",
    userImage: "src/assets/images/main/user.png",
    title: "WebClient와 RestTemplate 병행 사용 괜찮을까요?"
  },
  {
    date: "2025.04.24 15:55",
    user: "테스트의달인",
    userImage: "src/assets/images/main/user.png",
    title: "단위 테스트와 통합 테스트 구분하는 기준?"
  }
];


</script>

<template>
  <div class="content-frame">
    <div class="content">
      <div class="main-info">
        <div class="main-info-board">
          <MainInfoPaging />
        </div>
      </div>

      <!-- 자유게시판 -->
      <MainContentBoard title="자유게시판" :boardItems="freeBoardItems" />

      <!-- 직무게시판 -->
      <MainContentBoard title="직무게시판" :boardItems="jobBoardItems" />
    </div>
  </div>
</template>

<style scoped>
.content-frame {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 27px 46px 0 27px;
  overflow: hidden;
}

.content {
  width: 1116px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  row-gap: 29px;
}

.main-info {
  width: 1110px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-info-board {
  width: 100%;
  height: 384px;
  border-radius: 16.5px;
  background-color: #F7F9FB;
}
</style>
