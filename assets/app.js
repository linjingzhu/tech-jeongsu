const DOCS = [
  {
    title: "AI 사용방법",
    items: [
      ["AI 개발 운영 개요", "content/ai/00-overview.md"],
      ["Claude Code + Codex 공동 개발", "content/ai/01-shared-repository.md"],
      ["Session · Agent · Subagent", "content/ai/02-session-agent.md"],
      ["Multi-Agent 역할과 모델 라우팅", "content/ai/03-multi-agent.md"],
      ["스스로 개선되는 개발 프로세스", "content/ai/04-self-improving.md"],
      ["Claude Code를 Git Client처럼 쓰기", "content/ai/05-git-operator.md"],
    ],
  },
  {
    title: "GIT 사용방법",
    items: [
      ["Git 전체 구조", "content/git/00-overview.md"],
      ["Repository · Object · Branch", "content/git/01-repository-object.md"],
      ["HEAD · Checkout · Detached HEAD", "content/git/02-head-checkout.md"],
      ["Worktree 완전 이해", "content/git/03-worktree.md"],
      ["Remote · Fetch · Pull · Push", "content/git/04-remote-sync.md"],
      ["Stash · Restore · Revert · Discard", "content/git/05-recovery.md"],
      ["Merge · Rebase · Cherry-pick", "content/git/06-history-operations.md"],
      ["협업 · Push · PR · Code Review", "content/git/07-collaboration-pr.md"],
      ["GitHub Actions · Hook · Cron", "content/git/08-actions-hook-cron.md"],
      ["Build Directory와 Worktree 용량", "content/git/09-build-directory.md"],
      ["실전 작업 흐름 모음", "content/git/10-practical-workflows.md"],
    ],
  },
  {
    title: "AI Map",
    items: [
      ["AI Map 개요", "content/ai-map/00-overview.md"],
      ["전체 AI 도구", "@ai-map:catalog"],
      ["챗봇 / 어시스턴트", "@ai-map:category:chat"],
      ["코딩 도구 & 에이전트", "@ai-map:category:coding"],
      ["생성형 미디어", "@ai-map:category:media"],
      ["모델 & 모델 허브", "@ai-map:category:models"],
      ["에이전트 프레임워크", "@ai-map:category:frameworks"],
      ["커뮤니티 & 토론", "@ai-map:category:community"],
      ["학습자료 & 뉴스 리소스", "@ai-map:category:resources"],
      ["AI 활용 가이드", "@ai-map:guides"],
      ["AI 소식", "@ai-map:news"],
    ],
  },
  {
    title: "Product Owner",
    items: [
      ["Product Owner 전체 개요", "content/po/00-overview.md"],
      ["PO의 자격과 핵심 역량", "content/po/01-qualification.md"],
      ["PO · PM · Project Manager 차이", "content/po/02-role-comparison.md"],
      ["PO가 알아야 할 지식 지도", "content/po/03-knowledge-map.md"],
      ["문제 발견 · 전략 · Roadmap", "content/po/04-discovery-strategy.md"],
      ["Backlog · 우선순위 · 요구사항", "content/po/05-backlog-prioritization.md"],
      ["Delivery Work Process", "content/po/06-delivery-workflow.md"],
      ["협업 · 회의 · 산출물", "content/po/07-collaboration-artifacts.md"],
      ["성과 측정 · 의사결정 · Metrics", "content/po/08-metrics-decisions.md"],
      ["AI 시대의 Product Owner", "content/po/09-ai-product-owner.md"],
    ],
  },
];

const $ = (id) => document.getElementById(id);
const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
const storage = {
  get(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};
let language = storage.get("jt-language", "ko") === "en" ? "en" : "ko";
const t = (key) => window.UI_TEXT[language][key];
const allPaths = DOCS.flatMap((g) => g.items.map((item) => item[1]));
const groupIcons = ["book", "cube", "layout-grid", "users"];
const icon = (name) => '<img src="./assets/icons/' + name + '.svg" alt="" aria-hidden="true">';
let currentPath = "",
  loadVersion = 0,
  fetchController,
  headings = [],
  currentHeading = "",
  renderTask = Promise.resolve();
let drawer = null,
  drawerOpener = null,
  scrollFrame = 0,
  savedSearchGroups = null;
const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const route = () => {
  let value;
  try {
    value = decodeURIComponent(location.hash.slice(1));
  } catch {
    value = "invalid";
  }
  const [path, section = ""] = value.split("::");
  return { path: path || allPaths[0], section };
};
function titleFor(path) {
  for (let g = 0; g < DOCS.length; g++) {
    const i = DOCS[g].items.findIndex((item) => item[1] === path);
    if (i >= 0) return [t("groups")[g], t("titles")[g][i], g, i];
  }
  return ["", "", -1, -1];
}
function routeUrl(path, section = "") {
  return "#" + path + (section ? "::" + section : "");
}
function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document
    .querySelectorAll("[data-language]")
    .forEach((el) => el.setAttribute("aria-pressed", String(el.dataset.language === language)));
  $("documentSearch").placeholder = t("searchDocs");
  $("documentSearch").setAttribute("aria-label", t("searchDocs"));
  $("sidebar").setAttribute("aria-label", t("documentExplorer"));
  $("tree").setAttribute("aria-label", t("documentTree"));
  $("toc").setAttribute("aria-label", t("internalToc"));
  $("readingNav").setAttribute("aria-label", t("readingPosition"));
  $("menuBtn").setAttribute("aria-label", t("openMenu"));
  $("tocBtn").setAttribute("aria-label", t("openToc"));
  $("pageNav").setAttribute("aria-label", t("previous") + " / " + t("next"));
}
function buildTree() {
  const path = route().path;
  const activeGroup = titleFor(path)[2];
  $("tree").innerHTML = DOCS.map((group, g) => {
    const expanded = g === activeGroup || storage.get("jt-group-" + g, "") === "open";
    return (
      '<div class="tree-group' +
      (expanded ? "" : " closed") +
      '" data-group="' +
      g +
      '"><button aria-expanded="' +
      expanded +
      '" aria-controls="group-' +
      g +
      '">' +
      icon(groupIcons[g]) +
      "<span>" +
      escapeHtml(t("groups")[g]) +
      '</span><img class="chevron" src="./assets/icons/chevron-down.svg" alt=""></button><div class="tree-items" id="group-' +
      g +
      '">' +
      group.items
        .map(
          ([, p], i) =>
            '<a class="tree-link' +
            (p === path ? " active" : "") +
            '" ' +
            (p === path ? 'aria-current="page" ' : "") +
            'href="' +
            routeUrl(p) +
            '" data-path="' +
            p +
            '">' +
            escapeHtml(t("titles")[g][i]) +
            "</a>",
        )
        .join("") +
      "</div></div>"
    );
  }).join("");
  $("tree")
    .querySelectorAll(".tree-group>button")
    .forEach((btn) =>
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        btn.parentElement.classList.toggle("closed", !open);
        storage.set("jt-group-" + btn.parentElement.dataset.group, open ? "open" : "closed");
      }),
    );
  filterDocuments();
}
function filterDocuments() {
  const q = $("documentSearch").value.trim().toLowerCase();
  const groups = [...$("tree").querySelectorAll(".tree-group")];
  if (q && !savedSearchGroups)
    savedSearchGroups = groups.map((group) => !group.classList.contains("closed"));
  let count = 0;
  groups.forEach((group, index) => {
    let found = 0;
    group.querySelectorAll(".tree-link").forEach((link) => {
      const match = !q || link.textContent.toLowerCase().includes(q);
      link.hidden = !match;
      if (match) found++;
    });
    group.hidden = !found;
    count += found;
    if (q && found) {
      group.classList.remove("closed");
      group.querySelector("button").setAttribute("aria-expanded", "true");
    } else if (!q && savedSearchGroups) {
      const open = savedSearchGroups[index] || !!group.querySelector('[aria-current="page"]');
      group.classList.toggle("closed", !open);
      group.querySelector("button").setAttribute("aria-expanded", String(open));
    }
  });
  if (!q) savedSearchGroups = null;
  $("documentEmpty").hidden = count > 0;
}
function updateTree(path) {
  const groupIndex = titleFor(path)[2];
  document.querySelectorAll(".tree-link").forEach((link) => {
    const active = link.dataset.path === path;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const group = $("tree").querySelector('[data-group="' + groupIndex + '"]');
  if (group) {
    group.classList.remove("closed");
    group.querySelector("button").setAttribute("aria-expanded", "true");
  }
}
function closeDrawer(restore = true) {
  if (!drawer) return;
  const oldOpener = drawerOpener;
  document.body.classList.remove("menu-open", "toc-open");
  $("overlay").hidden = true;
  $("menuBtn").setAttribute("aria-expanded", "false");
  $("tocBtn").setAttribute("aria-expanded", "false");
  $("menuBtn").setAttribute("aria-label", t("openMenu"));
  $("tocBtn").setAttribute("aria-label", t("openToc"));
  $("main").removeAttribute("inert");
  $("readingNav").removeAttribute("inert");
  $("main").removeAttribute("aria-hidden");
  $("readingNav").removeAttribute("aria-hidden");
  drawer = null;
  drawerOpener = null;
  if (restore && oldOpener) oldOpener.focus();
}
function toggleDrawer(which) {
  if (drawer === which) {
    closeDrawer();
    return;
  }
  closeDrawer(false);
  drawer = which;
  drawerOpener = $(which === "sidebar" ? "menuBtn" : "tocBtn");
  document.body.classList.add(which === "sidebar" ? "menu-open" : "toc-open");
  $("overlay").hidden = false;
  drawerOpener.setAttribute("aria-expanded", "true");
  drawerOpener.setAttribute("aria-label", t(which === "sidebar" ? "closeMenu" : "closeToc"));
  $("main").setAttribute("inert", "");
  $("readingNav").setAttribute("inert", "");
  $("main").setAttribute("aria-hidden", "true");
  $("readingNav").setAttribute("aria-hidden", "true");
  setTimeout(
    () => {
      if (drawer === which) $(which).querySelector("input,button,a")?.focus();
    },
    reduceMotion() ? 0 : 220,
  );
}
function safeUrl(value) {
  try {
    const url = new URL(value, location.href);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "#";
  } catch {
    return "#";
  }
}
function externalLink(url, label, cls = "") {
  return (
    '<a class="ai-map-action ' +
    cls +
    '" target="_blank" rel="noopener noreferrer" href="' +
    escapeHtml(safeUrl(url)) +
    '">' +
    escapeHtml(label) +
    icon("external-link") +
    "</a>"
  );
}
function mapData() {
  return language === "en" ? window.AI_MAP_DATA_EN : window.AI_MAP_DATA;
}
function categoryLabel(id) {
  return mapData().categories.find((c) => c.id === id)?.label || id;
}
function toolCard(tool) {
  return (
    '<article class="ai-map-card" data-search="' +
    escapeHtml((tool.name + " " + tool.publisher + " " + tool.description).toLowerCase()) +
    '"><span class="ai-map-chip">' +
    escapeHtml(categoryLabel(tool.category)) +
    '</span><div class="ai-map-card-head"><h3>' +
    escapeHtml(tool.name) +
    "</h3><p>" +
    escapeHtml(tool.publisher) +
    '</p></div><p class="ai-map-description">' +
    escapeHtml(tool.description) +
    '</p><div class="ai-map-meta"><span>' +
    escapeHtml((tool.platforms || []).join(" · ")) +
    "</span><span>" +
    escapeHtml((tool.plans || []).join(" · ")) +
    '</span></div><div class="ai-map-actions">' +
    (tool.webUrl ? externalLink(tool.webUrl, t("web"), "primary") : "") +
    (tool.downloadUrl ? externalLink(tool.downloadUrl, t("download")) : "") +
    (tool.sourceUrl ? externalLink(tool.sourceUrl, t("official")) : "") +
    "</div></article>"
  );
}
function renderMap(path) {
  const data = mapData();
  if (!data) throw new Error("Missing catalog");
  if (path === "@ai-map:guides")
    return (
      '<section class="ai-map-page"><div class="ai-map-hero"><span class="ai-map-kicker">WORKFLOW GUIDES</span><h1>' +
      t("guides") +
      "</h1><p>" +
      t("guidesIntro") +
      "</p></div>" +
      data.guides
        .map(
          (g) =>
            '<article class="ai-map-guide"><span class="ai-map-kicker">' +
            escapeHtml(g.kicker) +
            "</span><h2>" +
            escapeHtml(g.title) +
            "</h2><p>" +
            escapeHtml(g.summary) +
            "</p>" +
            g.sections
              .map(
                (s) =>
                  '<section class="ai-map-guide-step"><h3>' +
                  escapeHtml(s.heading) +
                  "</h3><p>" +
                  escapeHtml(s.body) +
                  "</p>" +
                  (s.tools?.length
                    ? '<div class="ai-map-actions">' +
                      s.tools.map((tool) => externalLink(tool.url, tool.name)).join("") +
                      "</div>"
                    : "") +
                  "</section>",
              )
              .join("") +
            "</article>",
        )
        .join("") +
      "</section>"
    );
  if (path === "@ai-map:news")
    return (
      '<section class="ai-map-page"><div class="ai-map-hero"><span class="ai-map-kicker">AI NEWS</span><h1>' +
      t("news") +
      "</h1><p>" +
      t("newsIntro") +
      "</p></div>" +
      [...data.news]
        .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
        .map(
          (item) =>
            '<article class="ai-map-news"><span class="ai-map-kicker">' +
            escapeHtml(item.source) +
            (item.date ? " · " + escapeHtml(item.date) : "") +
            '</span><h2><a target="_blank" rel="noopener noreferrer" href="' +
            escapeHtml(safeUrl(item.url)) +
            '">' +
            escapeHtml(item.title) +
            "</a></h2><p>" +
            escapeHtml(item.summary) +
            "</p></article>",
        )
        .join("") +
      "</section>"
    );
  const category = path.startsWith("@ai-map:category:") ? path.split(":")[2] : null;
  const list = category ? data.tools.filter((tool) => tool.category === category) : data.tools;
  return (
    '<section class="ai-map-page"><div class="ai-map-hero"><span class="ai-map-kicker">AI MAP · ' +
    escapeHtml(data.lastUpdated) +
    "</span><h1>" +
    escapeHtml(category ? categoryLabel(category) : t("allTools")) +
    "</h1><p>" +
    t("catalogIntro") +
    '</p><div class="ai-map-search"><input id="aiMapSearch" type="search" aria-label="' +
    t("searchTools") +
    '" placeholder="' +
    t("searchTools") +
    '"><span id="aiMapCount" role="status"></span></div></div><div class="ai-map-grid">' +
    list.map(toolCard).join("") +
    '</div><div id="catalogEmpty" class="catalog-empty" hidden><p>' +
    t("noTools") +
    '</p><button id="clearCatalog" class="text-button">' +
    t("clearSearch") +
    "</button></div></section>"
  );
}
function bindCatalog() {
  const input = $("aiMapSearch");
  if (!input) return;
  const cards = [...document.querySelectorAll(".ai-map-card")];
  const update = () => {
    const q = input.value.trim().toLowerCase();
    let n = 0;
    cards.forEach((card) => {
      card.hidden = !!q && !card.dataset.search.includes(q);
      if (!card.hidden) n++;
    });
    $("aiMapCount").textContent = n + " " + t("toolCount");
    $("catalogEmpty").hidden = n > 0;
    refreshNavigation();
  };
  input.addEventListener("input", update);
  $("clearCatalog").onclick = () => {
    input.value = "";
    update();
    input.focus();
  };
  update();
}
function buildToc() {
  const catalog = !!$("aiMapSearch");
  headings = [...$("content").querySelectorAll(catalog ? "h1" : "h2,h3")];
  headings.forEach((h, i) => {
    h.id = "section-" + i;
    h.tabIndex = -1;
  });
  $("toc").innerHTML = headings.length
    ? headings
        .map(
          (h) =>
            '<a class="toc-link level-' +
            h.tagName.slice(1) +
            '" href="' +
            routeUrl(currentPath, h.id) +
            '">' +
            escapeHtml(h.textContent) +
            "</a>",
        )
        .join("")
    : '<p class="empty-note">' + t("noSections") + "</p>";
}
function pageNavigation() {
  const flat = DOCS.flatMap((g, gi) =>
    g.items.map(([, path], i) => ({ path, title: t("titles")[gi][i] })),
  );
  const at = flat.findIndex((d) => d.path === currentPath);
  $("pageNav").innerHTML = [
    [-1, "previous", "arrow-left"],
    [1, "next", "arrow-right"],
  ]
    .map(([step, key, arrow]) => {
      const doc = flat[at + step];
      if (at < 0 || !doc) return "";
      return (
        '<a class="page-link ' +
        (step === 1 ? "next" : "previous") +
        '" href="' +
        routeUrl(doc.path) +
        '">' +
        (step === -1 ? icon(arrow) : "") +
        "<span><small>" +
        t(key) +
        "</small>" +
        escapeHtml(doc.title) +
        "</span>" +
        (step === 1 ? icon(arrow) : "") +
        "</a>"
      );
    })
    .join("");
}
function maxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - innerHeight);
}
function refreshNavigation() {
  const count = Math.max(12, Math.min(24, Math.ceil(document.documentElement.scrollHeight / 250)));
  const maxCount = Math.max(
    8,
    Math.min(innerWidth < 760 ? 16 : 24, Math.floor((innerHeight - 160) / 16)),
  );
  const n = Math.min(count, maxCount);
  const ticks = $("readingTicks");
  if (ticks.children.length !== n) {
    ticks.innerHTML = Array.from(
      { length: n },
      (_, i) =>
        '<button class="reading-tick" type="button" aria-label="' +
        t("position") +
        " " +
        (i + 1) +
        " / " +
        n +
        '" data-position="' +
        i +
        '"></button>',
    ).join("");
    ticks.querySelectorAll("button").forEach(
      (btn) =>
        (btn.onclick = () => {
          closeDrawer(false);
          window.scrollTo({
            top: (maxScroll() * Number(btn.dataset.position)) / (n - 1),
            behavior: reduceMotion() ? "instant" : "smooth",
          });
        }),
    );
  }
  updatePosition();
}
function updatePosition() {
  scrollFrame = 0;
  const max = maxScroll();
  const ratio = max ? Math.max(0, Math.min(1, scrollY / max)) : 0;
  const ticks = [...$("readingTicks").children];
  const selected = Math.round(ratio * (ticks.length - 1));
  const sections = new Set(
    headings.map((h) =>
      Math.round(
        Math.min(1, Math.max(0, (h.getBoundingClientRect().top + scrollY - 100) / (max || 1))) *
          (ticks.length - 1),
      ),
    ),
  );
  ticks.forEach((tick, i) => {
    tick.classList.toggle("active", i === selected);
    tick.classList.toggle("section", sections.has(i));
    tick.tabIndex = i === selected ? 0 : -1;
    if (i === selected) tick.setAttribute("aria-current", "location");
    else tick.removeAttribute("aria-current");
  });
  let active = headings[0];
  for (const h of headings) {
    if (h.getBoundingClientRect().top <= 125) active = h;
    else break;
  }
  if (ratio >= 0.999) active = headings.at(-1);
  currentHeading = active?.id || "";
  $("toc")
    .querySelectorAll("a")
    .forEach((link) => {
      const activeLink = link.hash.endsWith("::" + currentHeading);
      link.classList.toggle("active", activeLink);
      if (activeLink) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
}
function jumpSection(section, focus = false) {
  const target = headings.find((h) => h.id === section);
  if (target) {
    target.scrollIntoView({ block: "start", behavior: "instant" });
    if (focus) target.focus({ preventScroll: true });
  } else if (section === "main") $("main").focus();
  updatePosition();
}
function enhanceContent() {
  $("content")
    .querySelectorAll("table")
    .forEach((table) => {
      const wrapper = document.createElement("div");
      wrapper.className = "table-scroll";
      wrapper.tabIndex = 0;
      table.before(wrapper);
      wrapper.append(table);
    });
  $("content")
    .querySelectorAll("a[href]")
    .forEach((a) => {
      if (a.href.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    });
  $("content")
    .querySelectorAll("pre>code:not(.language-mermaid)")
    .forEach((code) => {
      const pre = code.parentElement,
        block = document.createElement("div");
      block.className = "code-block";
      const lang = [...code.classList].find((c) => c.startsWith("language-"))?.slice(9) || "text";
      pre.before(block);
      block.innerHTML =
        '<div class="code-toolbar"><span>' +
        escapeHtml(lang) +
        '</span><button class="copy-button">' +
        icon("copy") +
        "<span>" +
        t("copy") +
        "</span></button></div>";
      block.append(pre);
      if (window.hljs && lang !== "text" && hljs.getLanguage(lang)) hljs.highlightElement(code);
      block.querySelector("button").onclick = async () => {
        const button = block.querySelector("button");
        try {
          await navigator.clipboard.writeText(code.textContent);
          button.innerHTML = icon("check") + "<span>" + t("copied") + "</span>";
          $("announcement").textContent = t("copied");
          setTimeout(() => {
            if (button.isConnected)
              button.innerHTML = icon("copy") + "<span>" + t("copy") + "</span>";
          }, 1800);
        } catch {
          $("announcement").textContent = t("copyError");
        }
      };
    });
}
function mermaidConfig() {
  return {
    startOnLoad: false,
    theme: "base",
    securityLevel: "strict",
    fontFamily: "Noto Sans KR, sans-serif",
    flowchart: {
      htmlLabels: false,
      curve: "linear",
      nodeSpacing: 24,
      rankSpacing: 18,
      padding: 8,
      useMaxWidth: true,
    },
    themeVariables: {
      fontFamily: "Noto Sans KR, sans-serif",
      fontSize: "14px",
      primaryColor: "#e8efff",
      primaryTextColor: "#253754",
      primaryBorderColor: "#8ba7ed",
      lineColor: "#728fc8",
      secondaryColor: "#f3f6fc",
      tertiaryColor: "#edf2fb",
      edgeLabelBackground: "#f2f6fe",
      clusterBkg: "#f6f8fc",
      clusterBorder: "#dce5f3",
      noteBkgColor: "#edf2fb",
      noteTextColor: "#253754",
    },
  };
}
async function renderDiagrams(version) {
  const codes = [...$("content").querySelectorAll("pre>code.language-mermaid")];
  for (let i = 0; i < codes.length; i++) {
    if (version !== loadVersion) return;
    const code = codes[i];
    const source = code.textContent;
    const figure = document.createElement("figure");
    figure.className = "diagram";
    figure.setAttribute("aria-label", t("diagram") + " " + (i + 1));
    figure.tabIndex = 0;
    code.parentElement.replaceWith(figure);
    try {
      const { svg } = await mermaid.render("diagram-" + version + "-" + i, source);
      if (version !== loadVersion) return;
      figure.innerHTML = svg;
      figure.querySelector("svg")?.setAttribute("role", "img");
      figure.querySelector("svg")?.setAttribute("aria-label", t("diagram") + " " + (i + 1));
    } catch {
      if (version !== loadVersion) return;
      figure.className = "diagram diagram-error";
      const p = document.createElement("p");
      p.textContent = t("diagramError");
      const pre = document.createElement("pre");
      pre.textContent = source;
      figure.replaceChildren(p, pre);
    }
  }
}
async function loadDocument({ force = false, preserve = false } = {}) {
  const requested = route();
  if (!force && requested.path === currentPath) {
    closeDrawer(false);
    if (requested.section) jumpSection(requested.section, true);
    else window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  const previousSection = preserve && scrollY > 100 ? currentHeading : "";
  const oldRatio = maxScroll() ? scrollY / maxScroll() : 0;
  const version = ++loadVersion;
  fetchController?.abort();
  fetchController = new AbortController();
  currentPath = requested.path;
  headings = [];
  currentHeading = "";
  $("toc").innerHTML = "";
  $("readingTicks").innerHTML = "";
  $("pageNav").innerHTML = "";
  closeDrawer(false);
  updateTree(currentPath);
  const [group, title] = titleFor(currentPath);
  $("breadcrumb").innerHTML =
    "<span>" +
    escapeHtml(group) +
    "</span>" +
    icon("chevron-right") +
    "<span>" +
    escapeHtml(title) +
    "</span>";
  document.title = (title ? title + " · " : "") + "Jeongsu Tech";
  $("content").setAttribute("aria-busy", "true");
  $("content").innerHTML = '<p class="loading" role="status">' + t("loading") + "</p>";
  if (!preserve) window.scrollTo({ top: 0, behavior: "instant" });
  try {
    if (!allPaths.includes(currentPath)) throw new Error("Unknown document");
    let html;
    if (currentPath.startsWith("@ai-map:")) html = renderMap(currentPath);
    else {
      const file =
        language === "en" ? currentPath.replace(/^content\//, "content/en/") : currentPath;
      const res = await fetch("./" + file, { signal: fetchController.signal });
      if (!res.ok) throw new Error("Document unavailable");
      const md = await res.text();
      html = DOMPurify.sanitize(marked.parse(md, { gfm: true, breaks: false }));
    }
    if (version !== loadVersion) return;
    $("content").innerHTML = html;
    enhanceContent();
    buildToc();
    bindCatalog();
    pageNavigation();
    // Mermaid owns a shared renderer; serialize jobs and ignore obsolete routes.
    renderTask = renderTask
      .catch(() => {})
      .then(async () => {
        if (version !== loadVersion) return;
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 1800)),
        ]);
        mermaid.initialize(mermaidConfig());
        await renderDiagrams(version);
      });
    await renderTask;
    if (version !== loadVersion) return;
    $("content").setAttribute("aria-busy", "false");
    refreshNavigation();
    const section = requested.section || previousSection;
    if (section) jumpSection(section);
    else if (preserve) window.scrollTo({ top: maxScroll() * oldRatio, behavior: "instant" });
    $("announcement").textContent = title;
  } catch (error) {
    if (error.name === "AbortError" || version !== loadVersion) return;
    $("content").innerHTML =
      '<section class="error-panel"><h1>' +
      t("error") +
      "</h1><p>" +
      t("errorDetail") +
      '</p><button id="retryDocument" class="text-button">' +
      t("retry") +
      "</button></section>";
    $("content").setAttribute("aria-busy", "false");
    $("retryDocument").onclick = () => loadDocument({ force: true });
    refreshNavigation();
  }
}
$("menuBtn").onclick = () => toggleDrawer("sidebar");
$("tocBtn").onclick = () => toggleDrawer("tocPanel");
$("overlay").onclick = () => closeDrawer();
$("documentSearch").addEventListener("input", filterDocuments);
$("tree").addEventListener("click", (event) => {
  const link = event.target.closest(".tree-link");
  if (link) {
    closeDrawer();
    if (link.dataset.path === currentPath && !route().section)
      window.scrollTo({ top: 0, behavior: "instant" });
  }
});
$("toc").addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (link) {
    event.preventDefault();
    const section = link.hash.split("::")[1];
    history.pushState(null, "", routeUrl(currentPath, section));
    closeDrawer(false);
    jumpSection(section, true);
  }
});
$("readingTicks").addEventListener("keydown", (event) => {
  const ticks = [...$("readingTicks").children],
    at = ticks.indexOf(document.activeElement);
  let next;
  if (event.key === "ArrowDown") next = Math.min(ticks.length - 1, at + 1);
  if (event.key === "ArrowUp") next = Math.max(0, at - 1);
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = ticks.length - 1;
  if (next !== undefined) {
    event.preventDefault();
    ticks[next].focus();
    ticks[next].click();
  }
});
window.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (matchMedia("(max-width:759px)").matches && drawer !== "sidebar") toggleDrawer("sidebar");
    $("documentSearch").focus();
  }
  if (event.key === "Escape") closeDrawer();
  if (event.key === "Tab" && drawer) {
    const panel = $(drawer);
    const stops = [...panel.querySelectorAll("a,button,input")].filter(
      (el) => el.getClientRects().length && !el.closest("[hidden]"),
    );
    const first = stops[0],
      last = stops.at(-1);
    if (!panel.contains(document.activeElement)) {
      event.preventDefault();
      first?.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
});
document.querySelectorAll("[data-language]").forEach(
  (btn) =>
    (btn.onclick = () => {
      if (btn.dataset.language === language) return;
      language = btn.dataset.language;
      storage.set("jt-language", language);
      applyLanguage();
      buildTree();
      loadDocument({ force: true, preserve: true });
    }),
);
window.addEventListener("hashchange", () => loadDocument());
window.addEventListener(
  "scroll",
  () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updatePosition);
  },
  { passive: true },
);
window.addEventListener("resize", () => {
  closeDrawer(false);
  refreshNavigation();
});
new ResizeObserver(() => refreshNavigation()).observe($("main"));
document.querySelector(".skip-link").addEventListener("click", (event) => {
  event.preventDefault();
  $("main").focus();
});
applyLanguage();
buildTree();
loadDocument();
