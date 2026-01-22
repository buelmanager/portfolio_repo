# 원철희 포트폴리오 웹사이트

> Mobile & Kiosk Developer의 개인 포트폴리오 웹사이트입니다.

## 프로젝트 소개

이 프로젝트는 **Claude Code + MCP**를 활용하여 기획부터 디자인, 개발까지 풀스택으로 제작된 개인 포트폴리오 웹사이트입니다. PWA(Progressive Web App)를 지원하여 모바일 기기에서도 앱처럼 설치하여 사용할 수 있습니다.

---

## 기술 스택

### 프론트엔드 핵심 기술

| 기술 | 설명 |
|------|------|
| **HTML5** | 시맨틱 마크업, PWA 메타 태그, 접근성 고려 |
| **CSS3** | CSS Variables, Flexbox, Grid Layout, 애니메이션 |
| **JavaScript (ES6+)** | 바닐라 JS, 클래스 기반 모듈화, 비동기 처리 |

### PWA (Progressive Web App)

| 구성요소 | 파일 | 설명 |
|---------|------|------|
| **Service Worker** | `sw.js` | 오프라인 캐싱, 네트워크 요청 관리 |
| **Web App Manifest** | `manifest.json` | 앱 메타정보, 아이콘, 테마 설정 |
| **캐싱 전략** | Cache-First | 빠른 로딩, 오프라인 지원 |

### 아키텍처 패턴

```
portfolio_repo/
├── index.html          # 메인 HTML (SPA 구조)
├── styles.css          # 전체 스타일시트 (CSS Variables 기반)
├── script.js           # UI 인터랙션 & 애니메이션
├── renderer.js         # JSON → HTML 동적 렌더링 엔진
├── data.json           # 콘텐츠 데이터 (CMS 역할)
├── sw.js               # Service Worker (PWA)
├── manifest.json       # PWA 설정
└── images/             # 이미지 리소스
    ├── hero/           # 히어로 섹션 이미지
    ├── icons/          # PWA 아이콘 (다양한 사이즈)
    ├── splash/         # iOS 스플래시 스크린
    └── projects/       # 프로젝트 스크린샷
```

---

## 상세 기술 설명

### 1. JSON 기반 콘텐츠 관리 시스템

`data.json` 파일에서 모든 콘텐츠를 관리하여 코드 수정 없이 내용 업데이트가 가능합니다.

```json
{
  "profile": { ... },      // 프로필 정보
  "contact": { ... },      // 연락처
  "skills": [ ... ],       // 기술 스택
  "experiences": [ ... ],  // 경력사항
  "projects": [ ... ]      // 프로젝트 목록
}
```

**장점:**
- 콘텐츠와 코드 분리
- 쉬운 유지보수
- 재사용 가능한 템플릿 구조

### 2. 동적 렌더링 엔진 (`renderer.js`)

클래스 기반의 `PortfolioRenderer`가 JSON 데이터를 읽어 동적으로 HTML을 생성합니다.

```javascript
class PortfolioRenderer {
    async loadData() { ... }     // JSON 데이터 로드
    render() { ... }             // 전체 렌더링
    renderNavigation() { ... }   // 네비게이션 생성
    renderHero() { ... }         // 히어로 섹션
    renderProjects() { ... }     // 프로젝트 카드
    initSliders() { ... }        // 이미지 슬라이더
}
```

### 3. CSS 설계 시스템

**CSS Variables를 활용한 디자인 토큰:**

```css
:root {
    /* 색상 팔레트 - Beige/Cream + Dark Brown */
    --bg-primary: #f5f1eb;
    --text-primary: #2d2622;
    --accent-primary: #8b6914;
    --gold: #8b6914;

    /* 그림자 시스템 */
    --shadow-sm: 0 2px 10px rgba(45, 38, 34, 0.08);
    --shadow-md: 0 4px 30px rgba(45, 38, 34, 0.12);

    /* 트랜지션 */
    --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    /* Border Radius */
    --radius-md: 16px;
    --radius-lg: 24px;
}
```

### 4. 인터랙션 & 애니메이션 (`script.js`)

| 기능 | 설명 |
|------|------|
| **Custom Cursor** | 마우스 커서 커스터마이징 |
| **Scroll Progress** | 스크롤 진행률 표시 |
| **Intersection Observer** | 스크롤 기반 요소 애니메이션 |
| **Parallax Effect** | 시차 스크롤 효과 |
| **Magnetic Button** | 마그네틱 버튼 효과 |
| **Image Modal** | 프로젝트 이미지 라이트박스 |
| **Touch Swipe** | 모바일 터치 스와이프 지원 |

### 5. PWA 기능 (`sw.js`)

**Service Worker 캐싱 전략:**

```javascript
// Cache-First 전략
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
```

**지원 기능:**
- 오프라인 접속 지원
- 홈 화면 설치 (Add to Home Screen)
- 빠른 로딩 (캐시 우선)
- iOS/Android 앱 아이콘 및 스플래시 스크린

---

## 반응형 디자인

| 브레이크포인트 | 대상 디바이스 |
|---------------|--------------|
| Desktop | 1400px+ |
| Tablet | 768px - 1399px |
| Mobile | ~767px |

**모바일 최적화 기능:**
- 햄버거 메뉴 네비게이션
- 터치 친화적 UI 요소
- 적응형 이미지 그리드
- 스와이프 제스처 지원

---

## 외부 라이브러리 & CDN

| 라이브러리 | 용도 | 버전 |
|-----------|------|------|
| **Google Fonts** | 웹 폰트 | - |
| - Playfair Display | 영문 제목 폰트 | - |
| - Noto Sans KR | 한글 본문 폰트 | - |
| - Space Grotesk | 영문 본문 폰트 | - |
| - Syne | 영문 강조 폰트 | - |
| **Font Awesome** | 아이콘 | 6.4.0 |

---

## 주요 기능

### 섹션 구성

1. **Hero** - 프로필 소개, 주요 기술 하이라이트
2. **About** - 상세 소개, 스킬 목록, 연락처
3. **Experience** - 타임라인 형식 경력사항
4. **Projects** - 이미지 슬라이더가 포함된 프로젝트 카드
5. **Contact** - 연락처 정보, 소셜 링크

### UI/UX 특징

- 커스텀 마우스 커서
- 부드러운 스크롤 & 페이지 전환
- 스크롤 기반 요소 애니메이션
- 이미지 슬라이더 (자동재생, 터치 지원)
- 이미지 모달 (키보드 네비게이션)
- Back to Top 버튼

---

## 설치 및 실행

### 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/buelmanager/portfolio_repo.git

# 디렉토리 이동
cd portfolio_repo

# 로컬 서버 실행 (Python)
python -m http.server 8000

# 또는 Live Server (VS Code Extension) 사용
```

### 배포

정적 호스팅 서비스에 바로 배포 가능합니다:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

---

## 콘텐츠 수정 방법

`data.json` 파일을 수정하여 포트폴리오 내용을 업데이트할 수 있습니다.

### 프로젝트 추가 예시

```json
{
  "title": "새 프로젝트",
  "category": "Mobile App",
  "year": "2026.1",
  "duration": "2주",
  "github": "https://github.com/...",
  "description": "프로젝트 설명",
  "images": [
    "images/projects/new/1.png",
    "images/projects/new/2.png"
  ],
  "tech": ["Flutter", "Firebase"],
  "featured": true
}
```

---

## 브라우저 지원

| 브라우저 | 지원 |
|---------|------|
| Chrome | ✅ |
| Firefox | ✅ |
| Safari | ✅ |
| Edge | ✅ |
| Mobile Browsers | ✅ |

---

## 개발 도구

- **Claude Code + MCP** - AI 기반 코드 생성 및 개발 워크플로우 자동화
- **VS Code** - 코드 에디터
- **Git** - 버전 관리

---

## 라이선스

© 2025 원철희. All Rights Reserved.

---

## 연락처

- **Email**: buelmanager@gmail.com
- **Phone**: 010-6557-7258
- **Location**: Seoul, South Korea
