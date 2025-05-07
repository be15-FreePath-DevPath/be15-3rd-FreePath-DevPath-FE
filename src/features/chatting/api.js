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

export const getChattingRoomJoinUsers = (chattingRoomId) => api.get(`/chatting/list/${chattingRoomId}/users`)

export const getWaitingRoom = (chattingRoomId) => api.get(`/chatting/waitingRoom/${chattingRoomId}`);

export const putGroupChattingAccept = (payload) => api.put('/chatting/waitingRoom/respond',payload);


export const updateGroupChattingRoom = (payload) => api.put('/chatting/update/group',payload);

export const putChattingRoomJoin = (chattingRoomId) => api.put(`/chatting/list/${chattingRoomId}`);

export const postUserBlock = (userId) => api.post(`/chatting/block/${userId}`);