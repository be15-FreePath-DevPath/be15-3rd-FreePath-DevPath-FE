export const fetchInterviewRooms = async () => {
    // 일단 더미데이터. 추후 api 연결
    return Promise.resolve({
        data: {
            interviews: [
                {
                    id: 1,
                    title: "객체 지향 프로그래밍_20250405_1548",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "객체 지향 프로그래밍",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 40,
                    createdAt: "2024-12-22T20:30:00"
                },
                // 더미 데이터 계속 추가 가능
            ]
        }
    });
};
