export const fetchInterviewRooms = async ({ page = 1, sortOrder = 'desc', category, difficulty, evaluation } = {}) => {
    const allInterviews = [
                {
                    id: 45,
                    title: "운영체제_20241221_1030",
                    summary: "총평의 미리보기가 보여집니다.",
                    category: "운영체제",
                    difficulty: "easy",
                    evaluation: "generous",
                    score: 100,
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

export const fetchInterviewDetail = async (id) => {
    const dummyData = {
        interviewRoomId: 45,
        userId: 1,
        interviewRoomTitle: '운영체제테스트',
        interviewCategory: '운영체제',
        difficultyLevel: 'easy',
        evaluationStrictness: 'generous',
        interviewRoomStatus: 'completed',
        interviewRoomMemo: '',
        interviewRoomCreatedAt: '2025-04-13T20:05:18',
        interviewRoomScore: 65,
        interviewList: [
            {
                interviewMessage: '[면접 질문] 프로세스와 스레드의 가장 큰 차이점은 무엇인가요?'
            },
            {
                interviewMessage: '프로세스와 스레드는 독립적인 실행 순서이지만 프로세스가 서로 다른 메모리 공간에서 실행되는 반면 동일한 프로세스의 스레드는 공유 메모리 공간에서 실행된다는 점에서 차이가 있습니다. 프로세스란 자체 메모리 공간이 있는 독립 엔티티이고, 스레드는 프로세스 내의 더 가벼운 공유 메모리 단위로 작업의 효율적인 병렬 실행을 가능하게 합니다.'
            },
            {
                interviewMessage: '[답변 평가] 총점: #65\n- 정확성 #15 - 프로세스와 스레드의 차이를 메모리 공간 측면에서 설명한 것은 정확하나, 프로세스와 스레드의 개념을 더 넓게 이해하고 있는지에 대한 언급이 없습니다. 또한 스레드의 특징 중 하나인 독립적인 실행 순서에 대한 설명이 부족합니다.\n- 깊이 #10 - 답변은 프로세스와 스레드의 메모리 공간 차이를 언급했지만, 이러한 차이로 인해 어떤 장단점이 발생하는지, 왜 스레드가 더 가볍고 효율적인지에 대한 깊은 이해가 부족합니다. 더 많은 기술적인 내용이나 예시를 통해 깊이 있는 이해를 보여줄 수 있었을 것입니다.\n- 예시 사용 #5 - 실제 프로세스와 스레드가 어떻게 동작하는지, 어떤 상황에서 어떻게 활용되는지에 대한 구체적인 예시가 없습니다. 예를 들어 멀티스레드 환경에서의 자원 공유 문제나 동기화에 대한 예시를 들었다면 답변이 더 강화되었을 것입니다.\n- 구조 #15 - 답변은 프로세스와 스레드의 차이를 설명한 후, 각각의 특징을 나열하는 형태로 구성되어 있습니다. 그러나 두 개념을 연결하고 통합적으로 설명하지 않고, 단순히 나열식 설명으로 끝나는 부분이 있습니다. 더 좋은 구조로 답변을 전개했다면 평가가 높아졌을 것입니다.\n- 명확성 #20 - 문장은 명확하게 표현되어 있으며, 전반적으로 이해하기 쉽게 작성되어 있습니다. 다만, 전문 용어나 기술적인 용어를 더 많이 사용하고 설명했다면 더 명확하게 전달되었을 것입니다.\n\n총평: 답변은 프로세스와 스레드의 메모리 공간 차이를 언급하며 기본적인 차이점을 설명했지만, 깊이 있는 이해나 실무적인 예시가 부족한 것이 아쉽습니다. 더 많은 기술적인 내용과 구체적인 예시를 통해 답변을 보강하고, 프로세스와 스레드의 차이를 더 다각적으로 설명할 수 있도록 노력해야 할 것입니다.'
            },
            {
                interviewMessage: '[면접 질문] 운영체제에서 멀티태스킹과 멀티프로세싱의 차이는 무엇인가요?'
            },
            {
                interviewMessage: '멀티 태스킹은 하나의 CPU에서 여러 개의 작업을 처리하는 반면, 멀티 프로세싱은 여러 개의 CPU가 각각의 작업을 처리하는 것이라는 차이점이 있습니다.'
            },
            {
                interviewMessage: '[답변 평가] 총점: 45\n- 정확성: 10 - 멀티태스킹과 멀티프로세싱의 기본적인 차이를 언급했지만, 더 구체적인 설명이 필요합니다. 멀티태스킹은 단일 CPU에서 여러 작업을 번갈아가며 처리하는 것을 의미하고, 멀티프로세싱은 여러 개의 CPU가 병렬로 여러 작업을 처리하는 것입니다.\n- 깊이: 5 - 각 개념의 원리나 운영체제에서의 구현 방식에 대한 설명이 없어 깊이 있는 이해를 보여주지 못했습니다.\n- 예시 사용: 0 - 실제 예시나 산업적 측면에서의 활용 사례가 전혀 언급되지 않았습니다.\n- 구조: 10 - 답변의 구조는 간단하고 명확하게 나뉘어져 있지만, 내용이 부족한 점이 있습니다.\n- 명확성: 10 - 문장은 명확하게 표현되었지만, 내용이 부족하여 이해하기 어려운 부분이 있습니다.\n\n총평: 답변은 멀티태스킹과 멀티프로세싱의 기본적인 차이를 언급했지만, 보다 깊이 있는 설명과 실제 예시를 통해 내용을 보강할 필요가 있습니다. 면접에서는 개념 이해뿐만 아니라 그것을 실무에 어떻게 적용하는지에 대한 이해도가 중요합니다. 좀 더 구체적이고 깊이 있는 답변이 요구됩니다. \n\n모범답안: 멀티태스킹은 단일 CPU에서 여러 작업을 번갈아가며 처리하는 것을 의미하며, 시분할 방식으로 작동합니다. 반면 멀티프로세싱은 여러 개의 CPU가 병렬로 여러 작업을 처리하는 것으로, 병렬 처리를 통해 성능을 향상시킵니다. 멀티태스킹은 일반적으로 운영체제 수준에서 구현되고, 멀티프로세싱은 하드웨어 수준에서 이루어집니다.'
            },
            {
                interviewMessage: '[면접 질문] 운영체제에서 메모리 단편화란 무엇이며, 외부 단편화와 내부 단편화의 차이는 무엇인가요?'
            },
            {
                interviewMessage: '사용가능한 메모리가 충분히 존재하지만 할당(사용)이 불가능한 상태를 보고 메모리 단편화가 발생했다고 합니다. 내부 단편화는 프로세스가 필요한 양보다 더 큰 메모리가 할당된 상황, 외부 단편화는 중간중간에 생긴 사용하지 않는 메모리가 많이 존재해서 총 메모리 공간은 충분하지만 실제로 할당할 수 없는 상황입니다.'
            },
            {
                interviewMessage: '[답변 평가] 총점: #45\n- 정확성 #10 - 메모리 단편화에 대한 개념적 설명은 어느 정도 정확하게 이루어졌습니다. 하지만 내부 단편화와 외부 단편화의 구체적인 차이에 대한 설명이 부족하여 정확성 점수가 낮습니다.\n- 깊이 #5 - 답변은 메모리 단편화의 개념적인 면에 초점을 맞추고 있어, 왜 이러한 단편화가 발생하는지, 그 영향은 무엇인지 등에 대한 깊이 있는 설명이 부족합니다.\n- 예시 사용 #0 - 실제 상황이나 예시를 통해 메모리 단편화를 설명하거나, 어떻게 발생하는지 구체적인 예시를 들지 않아서 예시 사용 점수가 낮습니다.\n- 구조 #15 - 답변의 구조는 개념적인 설명 → 내부 단편화와 외부 단편화의 차이로 이어지는 구조로 일관성 있게 이어졌습니다.\n- 명확성 #15 - 문장은 명확하게 표현되었지만, 내부 단편화와 외부 단편화의 차이를 더 명확히 설명하거나 예시를 통해 이해를 돕는 방향으로 보완되었다면 더 좋았을 것입니다.\n총평: 답변은 메모리 단편화의 개념을 어느 정도 이해하고 있지만, 내부 단편화와 외부 단편화의 구체적인 차이와 실제 상황에 대한 예시가 부족한 점이 아쉽습니다. 또한 깊이 있는 설명이 부족하여 개념을 좀 더 심도 있게 이해하고 있는지에 대한 확인이 필요합니다. 개념적인 면에서는 이해하고 있지만, 실무적인 측면과 깊이 있는 이해를 더 강화할 필요가 있습니다. \n모범답안: 메모리 단편화는 메모리 공간이 분산되어 발생하는 현상으로, 외부 단편화는 메모리 할당 및 해제로 인해 발생하는 사용되지 않는 작은 조각들로 인해 실제로 사용할 수 없는 상황을 의미합니다. 반면 내부 단편화는 프로세스가 필요한 메모리보다 더 큰 메모리 덩어리를 할당받아 일부 공간이 낭비되는 상황을 말합니다. 내부 단편화는 주로 고정 크기의 메모리 할당 방식에서 발생하며, 외부 단편화는 가변 크기의 메모리 할당 방식에서 주로 발생합니다.'
            },
            {
                interviewMessage: '[총평]첫 번째 면접에서는 프로세스와 스레드의 차이에 대한 질문에 대한 답변을 평가했습니다. 답변은 프로세스와 스레드의 메모리 공간 차이를 언급하며 기본적인 차이점을 설명했지만, 깊이 있는 이해나 실무적인 예시가 부족한 것이 아쉽습니다. 답변의 구조는 프로세스와 스레드의 특징을 나열하는 형태로 이루어져 있었으나, 두 개념을 연결하고 통합적으로 설명하지 않아서 평가가 낮게 나왔습니다. 또한, 전문 용어나 기술적인 용어를 더 많이 사용하고 설명했다면 더 명확하게 전달되었을 것입니다.\n두 번째 면접에서는 멀티태스킹과 멀티프로세싱에 대한 질문에 대한 답변을 평가했습니다. 답변은 멀티태스킹과 멀티프로세싱의 기본적인 차이를 언급했지만, 깊이 있는 설명과 실제 예시를 통해 내용을 보강할 필요가 있었습니다. 면접에서는 개념 이해뿐만 아니라 그것을 실무에 어떻게 적용하는지에 대한 이해도가 중요하다는 점을 감안할 필요가 있습니다. 좀 더 구체적이고 깊이 있는 답변이 요구됩니다.\n세 번째 면접에서는 메모리 단편화에 대한 질문에 대한 답변을 평가했습니다. 답변은 메모리 단편화의 개념을 어느 정도 이해하고 있지만, 내부 단편화와 외부 단편화의 구체적인 차이와 실제 상황에 대한 예시가 부족한 점이 아쉽습니다. 또한, 깊이 있는 설명이 부족하여 개념을 좀 더 심도 있게 이해하고 있는지에 대한 확인이 필요합니다. 개념적인 면에서는 이해하고 있지만, 실무적인 측면과 깊이 있는 이해를 더 강화할 필요가 있습니다.\n전반적으로, 면접자는 개념에 대한 이해는 어느 정도 있으나, 실무적인 예시나 깊이 있는 설명이 부족한 경향이 있습니다. 논리적인 흐름과 명확한 표현력은 보여주었지만, 실무 경험을 더 많이 고려하고 개념을 실제 상황에 적용하는 방법을 연습해야 할 것입니다.\n현재 실력 요약: 개념적인 이해는 어느 정도 있으나, 실무 경험과 깊이 있는 이해를 더 강화할 필요가 있는 초급 개발자입니다.'
            }
        ],
        reexecutedRooms: [
            {
                interviewRoomId: 46,
                interviewRoomTitle: '운영체제테스트_2504132111',
                interviewRoomCreatedAt: '2025-04-13T21:11:48'
            },
            {
                interviewRoomId: 47,
                interviewRoomTitle: '운영체제테스트_2504132124',
                interviewRoomCreatedAt: '2025-04-13T21:24:00'
            }
        ]
    }

    return Promise.resolve({ data: dummyData })
}
