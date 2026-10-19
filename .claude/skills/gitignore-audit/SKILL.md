---
name: gitignore-audit
description: 저장소 전체 파일을 전수검사하여 .gitignore를 최신화한다. 커밋되면 안 되는 개인정보·자격증명·빌드 산출물이 추적되고 있는지, 반대로 필요한 파일이 실수로 무시되고 있는지 확인하고 규칙을 수정한다. 커밋·푸시·배포 전이나 "gitignore 최신화", "커밋해도 되는지 확인" 요청 시 사용한다.
---

# .gitignore 전수검사

이 저장소는 **공개 배포**를 전제로 한다(GitHub Pages). 한 번 푸시된 파일은 히스토리에 남으므로,
"아직 커밋 안 됐으니 괜찮다"가 아니라 **"푸시되면 되돌릴 수 없다"**를 기준으로 판단한다.

## 1. 전수 열거

세 집합을 모두 확보한다. 하나라도 빠뜨리면 전수검사가 아니다.

```bash
git ls-files                              # 이미 추적 중인 파일
git status --porcelain -uall              # 미추적 파일 (디렉터리로 접히지 않게 -uall)
git status --porcelain --ignored -uall    # 현재 무시되고 있는 파일 ('!!' 접두)
```

`node_modules/` 처럼 항목이 수천 개인 경로는 개수만 세고 넘어간다. 나머지는 **한 줄씩 실제로 본다.**
경로 이름만으로 판단이 서지 않으면 파일을 열어 내용을 확인한다.

## 2. 분류

열거한 모든 경로를 아래 중 하나로 분류한다.

| 분류 | 처리 |
| --- | --- |
| 개인정보·기밀 | 반드시 무시. 이력서 원본, 증명서, 지원 서류, 면접 메모, 광고주 내부 지표, 반명함 등 |
| 자격증명 | 반드시 무시. `.env`, `*.pem`, `*.key`, 서비스 계정 JSON, 토큰이 든 설정 |
| 빌드 산출물 | 무시. `dist/`, `.vite/`, `*.tsbuildinfo` |
| 의존성 | 무시. `node_modules/`. **단 `package-lock.json` 은 커밋한다** (CI의 `npm ci` 가 필요로 함) |
| 에디터·OS | 무시. `.idea/`, `.DS_Store`, `Thumbs.db` |
| 소스·설정 | 커밋. `src/`, `public/`, `index.html`, 설정 파일, `.github/workflows/` |

이 저장소에서 특히 확인할 것:

- `apply/`, `reference/` — 무시되어야 한다. 개인 식별 정보와 지원 서류 원본이 들어 있다.
- `public/` — 무시되면 **안 된다**. 빌드에 포함되는 정적 자산 경로다.
- `.claude/` — 스킬과 설정. 커밋해도 되지만 `.claude/settings.local.json` 은 개인 설정이므로 무시한다.

## 3. 세 가지 실패 유형을 각각 확인

**(a) 무시되어야 하는데 이미 추적 중인 파일**

`.gitignore` 에 규칙을 추가해도 **이미 추적 중인 파일에는 적용되지 않는다.** 이게 가장 흔한 사고다.

```bash
git ls-files -i -c --exclude-standard   # 추적 중인데 무시 규칙에 걸리는 파일
```

한 건이라도 나오면 규칙 추가만으로는 부족하다. 인덱스에서 빼야 한다.

```bash
git rm --cached <path>       # 파일은 남기고 추적만 해제
git rm -r --cached <dir>
```

**이미 푸시된 뒤라면** 인덱스에서 빼도 히스토리에는 남는다. 그 사실을 숨기지 말고 사용자에게 알린다.
자격증명이라면 히스토리 재작성(`git filter-repo`)이 아니라 **키 교체**가 먼저다.

**(b) 커밋되어야 하는데 무시되고 있는 파일**

과도하게 넓은 규칙(`*.pdf`, `assets/`, `public` 같은 것)이 필요한 파일까지 삼키는 경우다.

```bash
git check-ignore -v src/main.tsx public index.html package-lock.json .github/workflows/deploy.yml
```

무엇이든 걸리면 그 규칙이 너무 넓다. 어떤 규칙 몇 행이 걸었는지 `-v` 출력으로 확인해 좁힌다.

**(c) 아직 어느 쪽도 아닌 새 파일**

미추적 파일 중 위 표의 어느 분류에도 확신이 안 서는 것. 추측하지 말고 **사용자에게 묻는다.**

## 4. 수정 및 검증

`.gitignore` 를 고친 뒤 반드시 결과를 눈으로 확인한다. 규칙을 쓴 것과 규칙이 먹는 것은 다르다.

```bash
git status --short                                   # 의도한 것만 올라오는가
git check-ignore -v apply reference node_modules dist # 무시되어야 할 것이 실제로 무시되는가
```

## 5. 보고

다음을 사용자에게 알린다.

- `.gitignore` 에 추가·삭제·수정한 규칙과 그 이유
- **이미 추적 중이라 `git rm --cached` 가 필요한 파일** — 있다면 가장 먼저, 명확하게
- 이미 원격에 푸시된 민감 파일 — 있다면 되돌릴 수 없다는 점과 필요한 후속 조치
- 판단을 보류한 파일과 그 이유

`.gitignore` 수정은 바로 해도 되지만, `git rm --cached` 는 인덱스를 바꾸므로 **실행 전에 확인을 받는다.**
