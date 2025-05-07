import api from '@/api/axios.js'

/* 1. 면접방 목록 조회 */
export function fetchInterviewRooms({ page=1, size=10, sortOrder, category, difficulty, evaluation }) {
    const params = { page, size }
    if (sortOrder)             params.sortOrder = sortOrder
    if (category)              params.category = category
    if (difficulty)            params.difficultyLevel = difficulty
    if (evaluation)            params.evaluationStrictness = evaluation

    return api.get('/interview-room/filter', { params })
}


/* 2. 면접방 상세 조회 */
export function fetchInterviewDetail(interviewRoomId) {
    return api.get(`/interview-room/${interviewRoomId}`);
}

/* 3. 면접방 생성 → 첫 질문 포함 */
export function fetchInterviewProgressStart(category, difficulty, strictness) {
    return api.post('/interview-room', {
        interviewCategory: category,
        difficultyLevel: difficulty,
        evaluationStrictness: strictness,
    });
}

/* 4. 면접 진행 중 다음 질문 + 평가 받기 */
export function fetchNextQuestion(roomId, questionIndex, answer) {
    return api.post(`/interview-room/${roomId}/interview`, {
        interviewIndex: questionIndex,
        userAnswer: answer,
    });
}

/* 5. 면접방 재실행 (새 면접방 생성) */
export function reexecuteInterviewRoom(roomId, strictness) {
    return api.post(`/interview-room/${roomId}/reexecute?strictness=${strictness}`);
}


/* 6. 면접방 삭제 */
export function deleteInterviewRoom(roomId) {
    return api.delete(`/interview-room/${roomId}`);
}

/* 7. 면접방 정보 수정 */
export function updateInterviewInfo(roomId, title, memo) {
    return api.patch(`/interview-room/${roomId}`, {
        interviewRoomTitle: title,
        interviewRoomMemo: memo
    });
}

