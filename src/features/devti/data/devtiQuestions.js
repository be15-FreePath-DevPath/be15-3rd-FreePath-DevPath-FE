export const devtiQuestions = [
    // G/S
    {
        id: 1,
        text: '뭔가 신기한 라이브러리를 발견했다! 이 때 너는?',
        type: 'G/S',
        options: [
            { text: '일단 설치하고 돌려봄. 뭐가 되긴 하겠지', value: 'G' },
            { text: '이건 뭐하는 녀석인가… 천천히 탐색 시작', value: 'S' }
        ]
    },
    {
        id: 2,
        text: '빨간 에러 메시지가 주르륵 떴다?!',
        type: 'G/S',
        options: [
            { text: '모르겠고 일단 주석 달고 이리저리 만져본다', value: 'G' },
            { text: '에러 복붙해서 검색창에 인사부터 박는다', value: 'S' }
        ]
    },
    {
        id: 3,
        text: "주말에 갑자기\n프로젝트 욕심이 뿜뿜할 때",
        type: 'G/S',
        options: [
            { text: '`npm init`부터 누르고 보자', value: 'G' },
            { text: '비슷한 거 누가 만들었나 찾아보는 나…', value: 'S' }
        ]
    },

    // A/B
    {
        id: 4,
        text: 'PM 5:59, 상사가 다가와서\n"이거 간단해요" 했을 때',
        type: 'A/B',
        options: [
            { text: '간단하다는 말이 제일 안 간단하더라.\n야근 예약~', value: 'A' },
            { text: '간단하면 내일 해도 되지 않나요?', value: 'B' }
        ]
    },
    {
        id: 5,
        text: '언제 집중이 제일 잘 돼?',
        type: 'A/B',
        options: [
            { text: '밤 11시쯤 조용할 때 갑자기 천재됨', value: 'A' },
            { text: '점심 먹고 한 시간 뒤가 골든타임', value: 'B' }
        ]
    },
    {
        id: 6,
        text: '할 일이 많을 때 너의 스타일은?',
        type: 'A/B',
        options: [
            { text: '낮엔 멍때리고 밤에 몰아쳐서 미친 듯이 함', value: 'A' },
            { text: '나눠서 할당하면 마음이 편해진다.\n제발 그만 미루자', value: 'B' }
        ]
    },

    // T/M
    {
        id: 7,
        text: '새 프로젝트 시작할 때 세팅은?',
        type: 'T/M',
        options: [
            { text: '자동화 템플릿에 세팅 스크립트까지 박아둔 내 과거 칭찬해', value: 'T' },
            { text: '폴더 하나하나 직접 만드는 손맛이 있지~', value: 'M' }
        ]
    },
    {
        id: 8,
        text: '코드 포맷팅이 이상할 때\n너의 반응은?',
        type: 'T/M',
        options: [
            { text: 'Prettier, ESLint, Formatter...\n툴이 다 해줘야지!', value: 'T' },
            { text: '그걸 왜 믿어?\n눈으로 보고 직접 고쳐야 맘이 편함', value: 'M' }
        ]
    },
    {
        id: 9,
        text: '협업 중 “자동화 스크립트 짜자!”\n소리 나왔을 때',
        type: 'T/M',
        options: [
            { text: '오케이~ CI/CD도 넣자. 깃훅도 달자!', value: 'T' },
            { text: '나 그거 어케 쓰는지 몰라... 그냥 내가 할게', value: 'M' }
        ]
    },

    // F/D
    {
        id: 10,
        text: '버그 수정이냐, 신기능 개발이냐\n둘 중 하나만 고른다면?',
        type: 'F/D',
        options: [
            { text: '새로운 기능 넣는 게 더 재밌음!\n화면 바뀌는 거 보면 짜릿해', value: 'F' },
            { text: '에러 잡고 정상 동작될 때 그 쾌감은 못 참지', value: 'D' }
        ]
    },
    {
        id: 11,
        text: '코드 짜면서 언제\n“오 이거 좀 멋진데?” 싶어?',
        type: 'F/D',
        options: [
            { text: 'API 붙이고 첫 화면 동작할 때', value: 'F' },
            { text: '예상 못한 버그 원인 딱 찾아냈을 때', value: 'D' }
        ]
    },
    {
        id: 12,
        text: '코드 리뷰할 때 너의 취향은?',
        type: 'F/D',
        options: [
            { text: '와우 이거 기능 되게 잘 빼놨네~ 기획 찰떡!', value: 'F' },
            { text: '흐음… 이 조건문, 엣지 케이스는 괜찮을까?', value: 'D' }
        ]
    }
]
