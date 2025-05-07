// 공통 axios 인스턴스 사용 (토큰, 쿠키, 인터셉터 포함)
import api from "@/api/axios.js";

// 신고 목록 조회
export const getReportList = async () => {
    try {
        const response = await api.get('/report/check');
        return response.data;
    } catch (error) {
        console.error('신고 목록 조회 실패:', error);
        throw error;
    }
};

// 신고 반려/삭제 처리
// @param reportCheckId - 처리할 신고건의 reportCheckId (URL path variable)
// @param formData - ReportDetailView에서 생성하여 전달한 FormData 객체 (checkReason, checkResult, postId/commentId 포함)
export const processReportCheck = async (reportCheckId, formData) => {
    try {
        console.log("api.js - processReportCheck: Received reportCheckId =", reportCheckId);
        console.log("api.js - processReportCheck: Received formData object =", formData); // FormData 객체는 여기서도 내용 확인 어려움

        // Axios 인스턴스의 post 메소드를 사용하여 요청을 보냅니다.
        // 세 번째 인자로 설정 객체를 전달하여 기본 헤더를 오버라이드합니다.
        const response = await api.post(
            `/report/check/${reportCheckId}`, // 첫 번째 인자: 요청 URL
            formData,                         // 두 번째 인자: 요청 본문 (FormData 객체)
            {                                 // 세 번째 인자: 요청 설정 객체
                headers: {
                    // 'Content-Type' 헤더를 undefined로 설정하면,
                    // Axios가 data (FormData 객체)의 타입을 보고 자동으로 Content-Type을 결정합니다.
                    'Content-Type': undefined
                    // 다른 기본 헤더 (예: Authorization)는 그대로 유지됩니다.
                }
            }
        );

        console.log("api.js - processReportCheck: API response received", response);

        // TODO: 백엔드 응답 구조 확인 후 실제 데이터 경로 반환
        return response.data; // 또는 필요한 응답 데이터 부분 (response.data.data 등) 반환
    } catch (error) {
        console.error(`신고 처리 API 호출 실패 (ID: ${reportCheckId}):`, error);
        throw error; // 에러를 그대로 throw 하여 호출하는 곳에서 상세 처리가 가능하도록 함
    }
};
