<script setup>
import {reactive, onMounted, computed, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {deletePost, fetchPostDetail, reportPost, updatePost} from '@/features/board/api.js';
import CommentList from "@/features/comment/components/CommentList.vue";
import PagingBar from "@/components/common/PagingBar.vue";
import InteractionBar from "@/features/interaction/components/InteractionBar.vue";
import PostDescriptionBar from "@/features/board/components/PostDescriptionBar.vue";
import {fetchCommentList} from "@/features/comment/api.js";
import {createChattingRoom, postChattingJoin} from "@/features/chatting/api.js";

const emit = defineEmits(['updateBreadCrumb'])

onMounted(() => {
  if (!postCategory.value) {
    emit('updateBreadCrumb', ['마이페이지', '회원 정보 조회'])
  } else {
    emit('updateBreadCrumb', ['게시판', postCategory.value])
  }
})


// 게시글 정보
const postDescription = reactive({
  category: '',
  title: '',
  author: '',
  createdAt: '',
  content: ''
});

const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const postCategory = computed(() => route.query.category || '');

// 댓글 정보
const comments = ref([]);
const writer = ref(0);

const errorMessage = ref('');

const pagination = reactive({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0
});

onMounted(async () => {

  // 게시글 정보 불러오기
  try {
    const response = await fetchPostDetail(postId);
    const data = response.data;

    if (data.success && data.data?.postDetailDto) {
      const dto = data.data.postDetailDto;
      postDescription.category = postCategory;
      postDescription.title = dto.boardTitle;
      postDescription.author = dto.nickname;
      postDescription.createdAt = dto.boardCreatedAt;
      postDescription.content = dto.boardContents;
      writer.value = dto.userId;
    } else {
      errorMessage.value = data.message || '게시글 정보를 불러올 수 없습니다.';
      console.error('유효하지 않은 게시글 응답:', data);
    }
  } catch (error) {
    //error.response && error.response.data && error.response.data.message
    errorMessage.value = error.response?.data?.message || '게시글 조회 중 오류가 발생했습니다.';
    console.error('게시글 상세 조회 실패:', error);
  }

  // 댓글 정보 불러오기
  try {
    const commentRes = await fetchCommentList(postId);
    const commentData = commentRes.data;

    if (commentData.success && Array.isArray(commentData.data)) {
      comments.value = commentData.data;
    } else {
      errorMessage.value = commentData.message || '댓글 정보를 불러올 수 없습니다.';
      console.error('댓글 응답이 유효하지 않습니다:', commentData);
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || '댓글 조회 중 오류가 발생했습니다.';
    console.error('댓글 조회 실패:', error);
  }
});

const handleDeletePost = async () => {
  if (!confirm('정말 게시글을 삭제하시겠습니까?')) return;
  try {
    await deletePost(postId);
    alert('삭제되었습니다.');
    router.back();
  } catch (e) {
    const msg = e?.response?.data?.message || '게시글 삭제 중 오류가 발생했습니다.';
    alert(msg);
  }
};

const handleModifyPost = () => {
  router.push({
    path: `/board/edit/${postId}`,
    query: { category: postCategory.value },
    state: {
      title: postDescription.title,
      content: postDescription.content,
      category: postCategory.value
    }
  })
}

const handleReportPost = async () => {
  if (!confirm('이 게시글을 신고하시겠습니까?')) return;
  try {
    await reportPost(postId);
    alert('신고가 접수되었습니다.');
  } catch (e) {
    const msg = e?.response?.data?.message || '게시글 신고 중 오류가 발생했습니다.';
    alert(msg);
  }
};

const handleChatting = async() => {
  try{
    const response = await createChattingRoom(writer.value);
    const queryRoomId = response.data.data.chattingRoomId;
    console.log('채팅방 id ',queryRoomId);
    await router.replace({ path: '/chatting', query: { queryRoomId: queryRoomId } });
  }catch(e){
    const msg = e?.response?.data?.message || '채팅방 이동 실패.';
    alert(msg);
  }
}

const handleChattingByComment = async(userId) => {
  try{
    const response = await createChattingRoom(userId);
    const queryRoomId = response.data.data.chattingRoomId;
    console.log('채팅방 id ',queryRoomId);
    await router.replace({ path: '/chatting', query: { queryRoomId: queryRoomId } });
  }catch(e){
    const msg = e?.response?.data?.message || '채팅방 이동 실패.';
    alert(msg);
  }
}

const handleGroupChattingJoin = async () => {
  try{
    await postChattingJoin(postId);
    alert('그룹채팅방 참여 요청을 보냈습니다!');
  }catch(e){
    const msg = e?.response?.data?.message || '그룹채팅방 참여 요청 실패';
    alert(msg);
  }
}

</script>

<template>
  <div v-if="errorMessage" class="error-box">
    {{ errorMessage }}
  </div>

  <template v-else>
    <PostDescriptionBar
        :postDescription="postDescription"
        @delete="handleDeletePost"
        @modify="handleModifyPost"
        @report="handleReportPost"
        @chat="handleChatting"
    />
    <InteractionBar @groupChattingJoin = "handleGroupChattingJoin" :postCategory="postCategory"/>
    <CommentList :comments="comments" @routeChat="handleChattingByComment"/>
    <PagingBar v-bind="pagination"/>
  </template>
</template>

<style scoped>
</style>
