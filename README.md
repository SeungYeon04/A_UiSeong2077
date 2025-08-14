# ⚔️ 의성 2077: 고운사 수호자

**LLM 텍스트 어드벤처 웹게임**  
*의성 Us:Code 청년 아카데미 메인 프로젝트*
  
> ⚔️ 의성 2077: 고운사 수호자 프로젝트 URL: https://a-ui-seong2077.vercel.app/  
> 🪴 서브 프로젝트 URL: https://uscode3dfood.netlify.app/  
  
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 🎮 **고운사를 지켜라!** 불에 타 힘이 약해진 고운사를 공격하는 괴물들을 물리치고 의성의 보물을 수호하세요.

## 🌟 프로젝트 소개

**의성 2077**은 경상북도 의성의 고운사를 배경으로 한 LLM 기반 텍스트 어드벤처 게임입니다. 플레이어는 고운사의 수호자가 되어 불을 지르고 사찰을 공격하는 악마들을 물리치며, 의성의 문화유산을 보호하는 임무를 수행합니다.

### 🎯 게임 특징
- **스토리 중심**: 한국 전통 문화와 현대 판타지가 결합된 독창적인 스토리
- **LLM 연동**: AI 기반 동적 대화와 선택지 시스템
- **시각적 요소**: Tailwind CSS로 구현된 아름다운 UI/UX
- **반응형 디자인**: 모든 디바이스에서 최적화된 게임 경험

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/SeungYeon04/A_UiSeong2077.git
cd A_UiSeong2077

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 게임을 즐기세요!

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## 🎮 게임 플레이

### 주요 시스템
- **캐릭터 관리**: 플레이어 캐릭터의 능력치와 장비 관리
- **스토리 진행**: 선택지에 따른 분기 스토리와 다양한 엔딩
- **전투 시스템**: 전략적 전투와 스킬 활용
- **인벤토리**: 아이템 수집과 관리
- **퀘스트**: 다양한 미션과 도전 과제

### 게임 화면
- **홈 화면**: 게임 시작 및 설정
- **게임 화면**: 메인 게임 플레이
- **인벤토리**: 아이템 및 장비 관리
- **상태창**: 캐릭터 정보 및 능력치

## 🛠️ 기술 스택

### Frontend
- **React 18**: 최신 React 기능과 Hooks 활용
- **TypeScript**: 타입 안정성과 개발 생산성 향상
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크
- **Zustand**: 가벼운 상태 관리 라이브러리

### 개발 도구
- **Vite**: 빠른 개발 서버와 빌드 도구
- **ESLint + Prettier**: 코드 품질 및 스타일 통일
- **Git**: 버전 관리 및 협업

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── game/           # 게임 관련 컴포넌트
│   ├── AuthCheck.tsx   # 인증 확인
│   ├── GoogleLogin.tsx # Google 로그인
│   └── ThemeToggle.tsx # 테마 토글
├── pages/              # 페이지 컴포넌트
│   ├── home.tsx        # 홈 페이지
│   ├── game.tsx        # 게임 페이지
│   └── login.tsx       # 로그인 페이지
├── stores/             # 상태 관리
│   ├── useGameStore.ts # 게임 상태
│   ├── useUserStore.ts # 사용자 상태
│   └── useThemeStore.ts # 테마 상태
├── services/           # API 서비스
│   ├── authService.ts  # 인증 서비스
│   └── gameApiService.ts # 게임 API
└── types/              # TypeScript 타입 정의
```

## 🎨 주요 기능

### 🔐 인증 시스템
- Google OAuth 2.0 로그인
- 사용자 세션 관리
- 보안된 게임 접근

### 🎮 게임 엔진
- LLM 기반 동적 스토리 생성
- 선택지 기반 스토리 분기
- 실시간 게임 상태 업데이트

### 🎨 UI/UX
- 다크/라이트 테마 지원
- 반응형 디자인
- 접근성 고려

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 Fork하세요
2. 새로운 기능 브랜치를 만드세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성하세요

## 📋 개발 로드맵

### Phase 1 (현재)
- [x] 기본 게임 구조 구현
- [x] 인증 시스템 구축
- [x] UI/UX 기본 설계

### Phase 2 (계획)
- [ ] LLM 연동 완성
- [ ] 스토리 콘텐츠 확장
- [ ] 사운드 및 음악 추가

### Phase 3 (계획)
- [ ] 모바일 앱 개발
- [ ] 멀티플레이어 기능
- [ ] 소셜 기능 추가

## 👥 팀원

| 역할 | 이름 | GitHub |
|------|------|--------|
| 🐍 **Python 백엔드, AI연동** | 송찬영 | - |
| 🎨 **웹디자인, 인트로, 렌딩페이지** | 이승연 | [@SeungYeon04](https://github.com/SeungYeon04) |
| ⚛️ **React 프론트, 웹소켓** | 옥승현 | [@SeungHyun](https://github.com/SeungHyunOK) |

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

## 🙏 감사의 말

- **의성 Us:Code 청년 아카데미** - 프로젝트 기회 제공
- **고운사** - 게임 배경 및 스토리 영감
- **React 팀** - 훌륭한 프레임워크 제공

## 📞 문의

프로젝트에 대한 문의사항이 있으시면:
- [Issues](https://github.com/SeungYeon04/A_UiSeong2077/issues)에 등록해주세요
- 팀원들에게 직접 연락해주세요

---

<div align="center">

**의성 2077**로 고운사를 지켜주세요! 🏛️⚔️

*Made with ❤️ by Us:Code Team*

</div>
