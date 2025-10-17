# 자동 리뷰 스튜디오 프로토타입

이 리포지토리는 저작권 안전한 AI 기반 영상 리뷰 편집 SaaS "자동 리뷰 스튜디오"의 인터랙티브 프로토타입입니다.

## 실행 방법

1. 정적 서버(예: `python -m http.server`)로 리포지토리 루트를 호스팅합니다.
2. 브라우저에서 `http://localhost:8000/index.html`에 접속하면 애플리케이션이 로드됩니다.
3. `window.__GEMINI_API_KEY__` 값을 브라우저 콘솔에서 설정하면 실제 Gemini API를 사용할 수 있습니다. 설정하지 않으면 준비된 예시 응답이 표시됩니다.

## 주요 기능

- 템플릿 기반 프로젝트 설정 및 인용 비율 모니터링
- 텍스트 중심의 세그먼트 편집(추가/삭제/드래그 재배치/더블클릭 수정)
- 유튜브 미리보기와 실시간 하이라이트 싱크
- 인용 클립 트리밍, 시각 효과 토글, 분할
- 유튜브 URL 자막 자동 변환 및 텍스트/영상 업로드 모의 처리
- Gemini SDK를 활용한 나레이션 다듬기, B-roll 추천, 쇼츠 스크립트, 챕터 생성
- Tailwind 기반 다크/라이트 테마 토글과 3단 대시보드 레이아웃

## 기술 스택

- React 18 (CDN importmap)
- TypeScript 소스 + 수동 번들링된 ESM (`dist/`)
- Tailwind CSS CDN, lucide-react, react-youtube, @google/genai
