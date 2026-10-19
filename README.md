# careerlog

이력서와 포트폴리오를 한 페이지에서 탭으로 전환하며 볼 수 있는 정적 웹사이트입니다.
회사 지원 시 URL 하나로 공유하는 것을 목표로 합니다.

## 구성

좌측 사이드바에서 아래 항목을 선택해 볼 수 있습니다. 모든 내용을 페이지에서 바로 읽을 수 있습니다.

- **About** — 소개와 핵심 역량, 사용 기술
- **Experience** — 경력 타임라인
- **Portfolio** — 주요 프로젝트 6건의 상세
- **Education** — 학력과 대학원 프로젝트 (인하대학교 대학원을 누르면 게재 논문과 연구과제가 모달로 열립니다)
- **Awards & Activities** — 수상 및 교육 이수

## 기술 스택

Vite · React · TypeScript · Tailwind CSS

서버가 필요 없는 정적 사이트로 빌드되며, GitHub Actions를 통해 GitHub Pages에 배포됩니다.

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # dist/ 정적 빌드
npm run preview  # 빌드 결과 확인
```

콘텐츠는 `src/content/` 의 데이터 파일에 정의되어 있습니다. 경력이나 프로젝트를 추가할 때는
컴포넌트가 아니라 이 데이터 파일을 수정하면 됩니다.

`#/resume` 는 모든 탭을 한 문서로 이은 화면입니다. 여기서 Ctrl+P 로 인쇄하면 전체 이력서를 PDF로 저장할 수 있습니다.

## 참고

이 저장소는 공개 배포를 전제로 하며, 연락처 등 개인 식별 정보는 포함하지 않습니다.
지원 서류 원본과 개인 자료(`apply/`, `reference/`)는 로컬에만 두고 `.gitignore` 로 제외합니다.

프로젝트 규칙과 작업 가이드는 [CLAUDE.md](CLAUDE.md) 를 참고하세요.
