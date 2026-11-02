# MyAI(마이아이)

기술 학습 문서를 모은 정적 사이트입니다. AI 사용방법, Git 사용방법, 제품 기획과 운영, AI Map, Marketing, Platform 배포와 서비스, 비즈니스를 제공합니다. 비즈니스 문서는 일반 정보이며 법률·세무 자문이 아닙니다.

- 배포: https://linjingzhu.github.io/tech-jeongsu/
- GitHub Pages는 `stable` 브랜치의 루트 파일을 그대로 배포합니다. 서버 빌드는 없으며, 문서를 고친 뒤 `node tools/build-site.mjs`로 만든 페이지를 함께 커밋합니다.
- 상단의 한 / EN 버튼은 같은 문서의 다른 언어 주소로 이동하며 선택을 브라우저에 저장합니다.
- 헤더 중앙의 검색창은 현재 언어의 문서 제목·본문·코드와 AI Map 도구·가이드·뉴스를 검색합니다. 일치하는 모든 결과를 스크롤해 볼 수 있으며, 문서 결과는 해당 섹션으로, 외부 자료는 새 탭으로 연결됩니다. Ctrl/Cmd+K로 검색창에 이동하고 방향키·Enter·Escape로 조작합니다.
- 왼쪽 내부 목차는 현재 문서의 제목으로 이동합니다. 모바일에서는 상단 목차 버튼으로 엽니다.
- 오른쪽 눈금은 문서 길이에 따라 표시되며 현재 위치를 강조합니다. 클릭이나 방향키로 이동할 수 있습니다. 퍼센트는 표시하지 않습니다.
- 코드 블록은 복사를 지원하고, 표와 다이어그램은 좁은 화면에서도 읽을 수 있도록 표시합니다.

## 페이지 구조

문서마다 고유 주소가 있고, 본문이 미리 HTML로 들어 있습니다. 한국어는 사이트 루트, 영어는 `en/` 아래에 있습니다. 예: `git/03-worktree/`, `en/git/03-worktree/`. 이전의 `#content/…` 주소로 들어오면 새 주소로 자동 이동합니다.

페이지, `sitemap.xml`, `robots.txt`, `.nojekyll`은 `node tools/build-site.mjs`가 만듭니다. 설정을 채우면 `ads.txt`와 `CNAME`도 만듭니다. 생성된 파일을 직접 고치지 말고 Markdown, `tools/site/template.html`, `site.config.json`을 고친 뒤 다시 빌드합니다. `node tools/build-site.mjs --check`와 테스트가 빌드 누락을 잡습니다.

`.nojekyll`이 있어 GitHub Pages가 Jekyll 변환 없이 파일을 그대로 배포합니다. 검색이 Markdown 원문을 불러오려면 필요합니다. 그 대신 `.ai/`, `.claude/`처럼 점으로 시작하는 폴더도 공개 주소로 열립니다. 이 폴더에는 비밀 정보를 두지 않습니다. `robots.txt`의 차단은 개인 도메인 루트로 옮긴 뒤에만 적용됩니다.

AI Map의 도구 목록, 카테고리, 가이드, 뉴스 화면은 원본 `linjingzhu/ai-map`과 내용이 같습니다. 그래서 검색 제외(`noindex`)로 두고 사이트맵에서도 뺍니다. 설정 파일의 `noindexPrefixes`가 이 범위를 정합니다.

## 콘텐츠 수정

한국어 Markdown은 `content/`, 영문은 동일한 경로의 `content/en/`에 있습니다. 제목 계층과 Mermaid 노드·연결은 두 언어에서 동일하게 유지합니다. 문서 목록은 `assets/app.js`의 `DOCS`, 번역된 메뉴와 인터페이스 문구는 `assets/i18n.js`에서 관리합니다. 사이트 소개, 개인정보처리방침, 문의 페이지는 `content/site/`에 있습니다. 수정한 뒤에는 빌드를 다시 실행합니다.

AI Map 원본은 `assets/ai-map-data.js`, 영문은 `assets/ai-map-data.en.js`입니다. 두 파일의 ID, URL, 날짜, 순서와 필드 구조를 함께 유지해야 합니다. 번역이 가격·기능 정보의 최신성을 보증하지는 않습니다.

## 로컬 확인

저장소의 상위 폴더에서 정적 HTTP 서버를 열고 `/tech-jeongsu/` 경로로 접속합니다. 개인 도메인으로 옮긴 뒤에는 저장소 루트에서 서버를 열면 됩니다. `file://`로 열면 검색용 Markdown을 가져올 수 없습니다.

링크 점검: `node tools/check-links.mjs`는 문서와 AI Map 데이터의 외부 링크를 모두 열어 보고, 없어진 주소를 파일과 줄 번호와 함께 보여 줍니다. 401·403·429는 로그인이나 봇 차단일 수 있어 "손으로 확인"으로 따로 표시합니다. 네트워크가 막힌 환경에서는 대부분 403으로 나오므로 일반 인터넷이 되는 컴퓨터에서 실행합니다.

자동 검증: `node --test tests/content.test.cjs tests/search.test.cjs tests/site.test.cjs`. 한·영 대응, AI Map 항목 보존, 로컬 자산, Mermaid 연결, 검색 결과와 섹션 연결, 생성 페이지의 최신 여부와 메타데이터를 확인합니다. 화면 변경 후에는 별도로 데스크톱·태블릿·모바일에서 메뉴, 목차, 검색, 언어 전환을 확인합니다.

검색은 서버로 검색어를 보내지 않습니다. 첫 검색 때 현재 언어의 Markdown 문서를 최대 네 개씩 불러와 브라우저 메모리에 색인을 만들며, 언어별로 재사용합니다. 문서 일부를 불러오지 못하면 검색 결과에 안내와 재시도 버튼을 표시합니다.

실행 라이브러리는 버전을 고정해 `assets/vendor/`에 보관합니다. 폰트는 Google Fonts의 Noto Sans KR와 JetBrains Mono를 사용하며 시스템 폰트를 대체 글꼴로 둡니다.

사이트 스타일이나 동작 파일을 배포할 때는 `tools/site/template.html`의 해당 자산 URL에 붙은 `v` 값을 갱신하고 다시 빌드합니다. GitHub Pages의 캐시가 이전 CSS와 JavaScript를 유지하는 동안에도 같은 배포의 파일을 불러오기 위한 표시입니다.

## 애드센스 신청 전 운영자가 할 일

코드로 할 수 있는 준비는 끝났습니다. 계정과 도메인이 필요해 운영자만 할 수 있는 일(개인 도메인 연결, 연락처, 애드센스 사이트 추가, 동의 메시지, Search Console, 내용 검토, 심사 중 유지)과 각 항목의 진행 상태는 [`.ai/reports/OWNER_ACTIONS.md`](../.ai/reports/OWNER_ACTIONS.md) 한 곳에서 관리합니다.
