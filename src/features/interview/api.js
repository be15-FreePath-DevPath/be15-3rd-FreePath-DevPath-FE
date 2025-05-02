export const fetchInterviewRooms = async ({ page = 1, sortOrder = 'desc', category, difficulty, evaluation } = {}) => {
    const allInterviews = [
                {
                    id: 1,
                    title: "운영체제_20241221_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "운영체제",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 46,
                    createdAt: "2024-12-21T10:30:00"
                },
                {
                    id: 2,
                    title: "운영체제_20241222_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "운영체제",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 54,
                    createdAt: "2024-12-22T10:30:00"
                },
                {
                    id: 3,
                    title: "운영체제_20241223_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "운영체제",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 70,
                    createdAt: "2024-12-23T10:30:00"
                },
                {
                    id: 4,
                    title: "자료구조 & 알고리즘_20241224_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "자료구조 & 알고리즘",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 60,
                    createdAt: "2024-12-24T10:30:00"
                },
                {
                    id: 5,
                    title: "자료구조 & 알고리즘_20241225_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "자료구조 & 알고리즘",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 81,
                    createdAt: "2024-12-25T10:30:00"
                },
                {
                    id: 6,
                    title: "자료구조 & 알고리즘_20241226_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "자료구조 & 알고리즘",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 93,
                    createdAt: "2024-12-26T10:30:00"
                },
                {
                    id: 7,
                    title: "데이터베이스_20241227_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "데이터베이스",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 76,
                    createdAt: "2024-12-27T10:30:00"
                },
                {
                    id: 8,
                    title: "데이터베이스_20241228_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "데이터베이스",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 44,
                    createdAt: "2024-12-28T10:30:00"
                },
                {
                    id: 9,
                    title: "데이터베이스_20241229_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "데이터베이스",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 78,
                    createdAt: "2024-12-29T10:30:00"
                },
                {
                    id: 10,
                    title: "네트워크_20241230_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "네트워크",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 40,
                    createdAt: "2024-12-30T10:30:00"
                },
                {
                    id: 11,
                    title: "네트워크_20241231_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "네트워크",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 61,
                    createdAt: "2024-12-31T10:30:00"
                },
                {
                    id: 12,
                    title: "네트워크_20250101_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "네트워크",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 45,
                    createdAt: "2025-01-01T10:30:00"
                },
                {
                    id: 13,
                    title: "디자인 패턴_20250102_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "디자인 패턴",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 55,
                    createdAt: "2025-01-02T10:30:00"
                },
                {
                    id: 14,
                    title: "디자인 패턴_20250103_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "디자인 패턴",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 60,
                    createdAt: "2025-01-03T10:30:00"
                },
                {
                    id: 15,
                    title: "디자인 패턴_20250104_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "디자인 패턴",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 85,
                    createdAt: "2025-01-04T10:30:00"
                },
                {
                    id: 16,
                    title: "객체 지향 프로그래밍_20250105_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "객체 지향 프로그래밍",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 72,
                    createdAt: "2025-01-05T10:30:00"
                },
                {
                    id: 17,
                    title: "객체 지향 프로그래밍_20250106_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "객체 지향 프로그래밍",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 63,
                    createdAt: "2025-01-06T10:30:00"
                },
                {
                    id: 18,
                    title: "객체 지향 프로그래밍_20250107_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "객체 지향 프로그래밍",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 91,
                    createdAt: "2025-01-07T10:30:00"
                },
                {
                    id: 19,
                    title: "보안_20250108_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "보안",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 48,
                    createdAt: "2025-01-08T10:30:00"
                },
                {
                    id: 20,
                    title: "보안_20250109_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "보안",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 58,
                    createdAt: "2025-01-09T10:30:00"
                },
                {
                    id: 21,
                    title: "보안_20250110_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "보안",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 75,
                    createdAt: "2025-01-10T10:30:00"
                },
                {
                    id: 22,
                    title: "CI/CD_20250111_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "CI/CD",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 53,
                    createdAt: "2025-01-11T10:30:00"
                },
                {
                    id: 23,
                    title: "CI/CD_20250112_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "CI/CD",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 66,
                    createdAt: "2025-01-12T10:30:00"
                },
                {
                    id: 24,
                    title: "CI/CD_20250113_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "CI/CD",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 78,
                    createdAt: "2025-01-13T10:30:00"
                },
                {
                    id: 25,
                    title: "시스템 설계_20250114_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "시스템 설계",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 70,
                    createdAt: "2025-01-14T10:30:00"
                },
                {
                    id: 26,
                    title: "시스템 설계_20250115_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "시스템 설계",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 67,
                    createdAt: "2025-01-15T10:30:00"
                },
                {
                    id: 27,
                    title: "시스템 설계_20250116_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "시스템 설계",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 84,
                    createdAt: "2025-01-16T10:30:00"
                },
                {
                    id: 28,
                    title: "클라우드 & 인프라_20250117_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "클라우드 & 인프라",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 60,
                    createdAt: "2025-01-17T10:30:00"
                },
                {
                    id: 29,
                    title: "클라우드 & 인프라_20250118_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "클라우드 & 인프라",
                    difficulty: "medium",
                    evaluation: "normal",
                    score: 75,
                    createdAt: "2025-01-18T10:30:00"
                },
                {
                    id: 30,
                    title: "클라우드 & 인프라_20250119_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "클라우드 & 인프라",
                    difficulty: "hard",
                    evaluation: "strict",
                    score: 88,
                    createdAt: "2025-01-19T10:30:00"
                },
            ]

    // 필터 적용
    let filtered = allInterviews.filter(interview => {
        return (!category || interview.category === category)
            && (!difficulty || interview.difficulty === difficulty)
            && (!evaluation || interview.evaluation === evaluation)
    })

    // 정렬 적용 (점수 기준)
    filtered.sort((a, b) => {
        if (sortOrder === 'asc') return a.score - b.score
        else return b.score - a.score
    })

    // 페이징 처리 (페이지당 10개 고정)
    const itemsPerPage = 10
    const start = (page - 1) * itemsPerPage
    const paginated = filtered.slice(start, start + itemsPerPage)

    const totalItems = filtered.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    return Promise.resolve({
        data: {
            interviews: paginated,
            pagination: {
                currentPage: page,
                totalItems,
                totalPages
            }
        }
    })
}

