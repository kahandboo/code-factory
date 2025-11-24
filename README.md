# 🎮 Mystery Arcade: 망가진 카지노에서 탈출하라

Vanilla JavaScript로 구현한 레트로 감성의 웹 기반 아케이드 게임입니다.  
프레임워크 없이 SPA 구조와 CSS 애니메이션만으로 몰입감 있는 게임 경험을 설계했습니다.

## 📖 프로젝트 개요

콘솔 기반 미니게임을 **웹 기반 인터랙티브 경험**으로 재해석한 프로젝트입니다.  
"망가진 카지노에서 탈출한다"는 스토리라인을 중심으로, 2개의 미니게임과 멀티 엔딩을 연결했습니다.

**핵심 도전 과제:**
- 프레임워크 없이 SPA 구조 직접 설계 (View Router 패턴)
- 도메인 로직과 뷰의 완전한 분리
- 사용자 행동을 유도하는 UX 설계 (감정 3단계 사이클)

## 📝 개발 과정 상세 기록

설계 의도, 트러블슈팅, 화면별 구현 과정을 일자별로 정리했습니다:  
👉 **[프로젝트 개발 로그 (Notion)](https://sepia-elk-8e1.notion.site/294ba9b2e24f800d8787e73f97806f4b)**

**주요 내용:**
- View Router 패턴 설계 과정
- DOM 애니메이션 성능 최적화 시행착오
- 감정 3단계 사이클 UX 설계
- 승리/패배 화면 레이아웃 의사결정 과정

## 🎯 핵심 기능

### 1. 🏎️ 자동차 경주 게임 (Racing Car)
**Windows 95 감성의 레트로 UI**
- 원색 팔레트(빨강, 노랑, 파랑, 초록)와 도트 폰트로 90년대 게임 경험 재현
- 실시간 순위 갱신과 전광판 텍스트로 경주의 긴장감 시각화
- 차량별 독립적인 애니메이션 타이밍으로 경주의 역동성 표현
- 승리 시 "CONGRATULATIONS" 파도타기 애니메이션으로 성취감 극대화
- 패배 시 "BAD LUCK" 글리치 효과와 심장 박동 버튼으로 재도전 유도

### 2. 🎱 로또 게임 (Lotto)
**사이버펑크 테마의 몰입형 연출**
- 마젠타-민트 컬러로 미래적 분위기 조성
- 자동 번호 생성 버튼으로 입력 편의성 강화
- 당첨 여부 확인 과정을 프로그레스 바와 볼 애니메이션으로 시각화

### 3. 🗺️ 인터랙티브 맵 시스템
**NPC 대화와 아이템 수집으로 연결된 게임 세계**
- 관리자/의문의 남자와의 대화를 통한 스토리 전개
- 자판기에서 구매한 아이템으로 숨겨진 오브젝트 해금
- 키보드(WASD/방향키) 및 터치 조작으로 자유로운 맵 탐험
- 플레이어 선택에 따라 갈리는 **Normal Ending**과 **True Ending**

## 🏗️ 아키텍처 설계

### 💻 Tech Stack
- **Languages**: JavaScript (ES6+), HTML5, CSS3
- **Style**: Custom CSS (Flexbox, Grid, Keyframe Animations)
- **Fonts**: Pixel Art Fonts (`Press Start 2P`, `VT323`, `NeoDunggeunmo`)

### 📐 설계 원칙

**1. View Router 패턴 기반 SPA**
- 각 게임 진입 파일(`Lotto.js`, `RacingCar.js`)은 화면 전환의 중재자(Mediator) 역할만 담당
- Screen 모듈은 콜백 함수로 데이터를 전달받아 독립적으로 렌더링
- 페이지 새로고침 없이 `BettingScreen` → `GameScreen` → `ResultScreen` 전환

```javascript
// Lotto.js
function showResultScreen(resultData) {
  renderResultScreen(screen, resultData, onPlayAgain, onNewBetting);
}

function onPlayAgain(gameData) {
  renderLottoScreen(screen, gameData, showResultScreen);
}
```

**2. 도메인 로직과 뷰의 분리**
- **Domain**: `Lotto`, `PurchaseAmount`, `Player` 등 순수 JS 클래스로 비즈니스 로직 구현
- **View**: `renderBettingScreen`, `renderRaceScreen` 등 렌더링 함수는 도메인 객체를 주입받아 사용
- Screen은 도메인에 의존하지만, 도메인은 Screen을 알지 못함 (의존성 역전)

**3. 싱글톤 패턴 기반 상태 관리**
- `Player` 클래스를 export하여 전역 상태로 관리
- `localStorage`와 연동하여 게임 진행 상황(코인, 아이템, 히스토리) 영속화
- 전역 변수의 위험성을 인지했지만, 프로젝트 규모상 개발 생산성을 우선

## 📂 디렉토리 구조

```bash
root/
├── map.html              # 메인 맵 진입점
├── lotto.html            # 로또 게임 진입점
├── racing-car.html       # 자동차 경주 게임 진입점
├── css/
│   ├── map-screen.css
│   ├── lotto/            # 로또 게임 스타일
│   └── racingCar/        # 자동차 게임 스타일
└── src/
    ├── Map.js            # 메인 맵 화면 컨트롤러
    ├── Lotto.js          # 로또 게임 화면 컨트롤러
    ├── RacingCar.js      # 자동차 경주 게임 화면 컨트롤러
    ├── data/             # 스토리 대화 데이터 (dialogues.js)
    ├── games/            # 비즈니스 로직 (Lotto, racingCar)
    ├── models/           # 상태 관리 (Player)
    ├── screens/          # 화면 렌더링 로직 (SPA Views)
    │   ├── mapScreen.js  # 맵 이동 및 상호작용
    │   ├── racing/       # 자동차 경주 게임 화면
    │   └── lotto/        # 로또 게임 화면
    └── utils/            # 유틸리티 (converter.js)
```

## 🚀 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/kahandboo/mystery-arcade.git
cd mystery-arcade
```

### 2. 로컬 서버 실행
Live Server(VS Code 확장) 사용.

### 3. 브라우저에서 실행
`http://localhost:8000/map.html` 접속

**권장 환경:** Chrome 최신 버전, 화면 해상도 1920x1080 이상

## 🎨 주요 기술적 도전

### 성능 최적화
- 아스키 아트 애니메이션 시도 → 100개 이상 노드의 리플로우로 프레임 드랍 발생
- 정적 아스키 아트로 타협하고 CSS 애니메이션 중심으로 전환
- `CSS transform`과 레이어 분리로 GPU 가속 활용

### UX 설계
- 승리 화면: "CONGRATULATIONS" 강조 → 당첨금 카운팅 (감정 우선 설계)
- 패배 화면: "BAD LUCK" + 빨간 심장 박동 버튼 (재도전 유도)
- 버튼 위계: 중앙 네온 버튼 vs 우하단 회색 EXIT 버튼 (시선 유도)

## 🔮 향후 개선 계획

- [ ] Jest를 활용한 단위 테스트 도입 (리팩토링 안정성 확보)
- [ ] Canvas API 학습 후 아스키 아트 애니메이션 재도전
- [ ] Web Audio API를 활용한 배경음악/효과음 추가
- [ ] 반응형 디자인 적용 (모바일 최적화)
