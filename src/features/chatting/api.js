import api from '@/api/axios.js'


export const getChatting = chattingRoomId => api.get(`/chatting/list/${chattingRoomId}`);

export const getChattingRoomList = () => api.get('/chatting/list');

export const getChattingPendingList = () => api.get('/chatting/waitingChattingRoom');

export const getUserBlocked = () => api.get('/chatting/block');

export const deleteBlockUser = (userId) => api.delete(`/chatting/block/${userId}`);

// 그룹 채팅방 생성
export const createGroupChattingRoom = (boardId, chattingRoomTitle) => {
    return api.post('/chatting/create/group', {
        boardId,
        chattingRoomTitle
    })
}