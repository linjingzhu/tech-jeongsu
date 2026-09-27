const DOCS = [
  {
    title: "AI 사용방법",
    items: [
      ["AI 개발 운영 개요","content/ai/00-overview.md"],
      ["Claude Code + Codex 공동 개발","content/ai/01-shared-repository.md"],
      ["Session · Agent · Subagent","content/ai/02-session-agent.md"],
      ["Multi-Agent 역할과 모델 라우팅","content/ai/03-multi-agent.md"],
      ["스스로 개선되는 개발 프로세스","content/ai/04-self-improving.md"],
      ["Claude Code를 Git Client처럼 쓰기","content/ai/05-git-operator.md"]
    ]
  },
  {
    title: "GIT 사용방법",
    items: [
      ["Git 전체 구조","content/git/00-overview.md"],
      ["Repository · Object · Branch","content/git/01-repository-object.md"],
      ["HEAD · Checkout · Detached HEAD","content/git/02-head-checkout.md"],
      ["Worktree 완전 이해","content/git/03-worktree.md"],
      ["Remote · Fetch · Pull · Push","content/git/04-remote-sync.md"],
      ["Stash · Restore · Revert · Discard","content/git/05-recovery.md"],
      ["Merge · Rebase · Cherry-pick","content/git/06-history-operations.md"],
      ["협업 · Push · PR · Code Review","content/git/07-collaboration-pr.md"],
      ["GitHub Actions · Hook · Cron","content/git/08-actions-hook-cron.md"],
      ["Build Directory와 Worktree 용량","content/git/09-build-directory.md"],
      ["실전 작업 흐름 모음","content/git/10-practical-workflows.md"]
    ]
  },
  {
    title: "AI Map",
    items: [
      ["AI Map 개요","content/ai-map/00-overview.md"],
      ["전체 AI 도구","@ai-map:catalog"],
      ["챗봇 / 어시스턴트","@ai-map:category:chat"],
      ["코딩 도구 & 에이전트","@ai-map:category:coding"],
      ["생성형 미디어","@ai-map:category:media"],
      ["모델 & 모델 허브","@ai-map:category:models"],
      ["에이전트 프레임워크","@ai-map:category:frameworks"],
      ["커뮤니티 & 토론","@ai-map:category:community"],
      ["학습자료 & 뉴스 리소스","@ai-map:category:resources"],
      ["AI 활용 가이드","@ai-map:guides"],
      ["AI 소식","@ai-map:news"]
    ]
  },
  {
    title: "Product Owner",
    items: [
      ["Product Owner 전체 개요","content/po/00-overview.md"],
      ["PO의 자격과 핵심 역량","content/po/01-qualification.md"],
      ["PO · PM · Project Manager 차이","content/po/02-role-comparison.md"],
      ["PO가 알아야 할 지식 지도","content/po/03-knowledge-map.md"],
      ["문제 발견 · 전략 · Roadmap","content/po/04-discovery-strategy.md"],
      ["Backlog · 우선순위 · 요구사항","content/po/05-backlog-prioritization.md"],
      ["Delivery Work Process","content/po/06-delivery-workflow.md"],
      ["협업 · 회의 · 산출물","content/po/07-collaboration-artifacts.md"],
      ["성과 측정 · 의사결정 · Metrics","content/po/08-metrics-decisions.md"],
      ["AI 시대의 Product Owner","content/po/09-ai-product-owner.md"]
    ]
  }
];

const tree = document.getElementById("tree");
const content = document.getElementById("content");
const breadcrumb = document.getElementById("breadcrumb");
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("overlay");

function buildTree(){
  tree.innerHTML="";
  DOCS.forEach((group)=>{
    const wrap=document.createElement("div");
    wrap.className="tree-group";
    const btn=document.createElement("button");
    btn.innerHTML='<span class="chev">▾</span><span>'+group.title+'</span>';
    btn.onclick=()=>wrap.classList.toggle("closed");
    wrap.appendChild(btn);
    const items=document.createElement("div");
    items.className="tree-items";
    group.items.forEach(([title,path])=>{
      const a=document.createElement("a");
      a.className="tree-link";
      a.href="#"+path;
      a.textContent=title;
      a.dataset.path=path;
      items.appendChild(a);
    });
    wrap.appendChild(items);
    tree.appendChild(wrap);
  });
}

function findTitle(path){
  for(const g of DOCS){
    for(const [title,p] of g.items) if(p===path) return [g.title,title];
  }
  return ["",""];
}


function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[ch]));
}

function aiMapCategoryLabel(id){
  const data=window.AI_MAP_DATA;
  return data?.categories?.find(c=>c.id===id)?.label || id;
}

function aiMapToolCard(tool){
  const actions=[
    tool.webUrl ? '<a class="ai-map-action primary" target="_blank" rel="noopener noreferrer" href="'+escapeHtml(tool.webUrl)+'">웹 실행 ↗</a>' : "",
    tool.downloadUrl ? '<a class="ai-map-action" target="_blank" rel="noopener noreferrer" href="'+escapeHtml(tool.downloadUrl)+'">다운로드 ↗</a>' : "",
    tool.sourceUrl ? '<a class="ai-map-action ghost" target="_blank" rel="noopener noreferrer" href="'+escapeHtml(tool.sourceUrl)+'">공식 정보 ↗</a>' : ""
  ].filter(Boolean).join("");
  return '<article class="ai-map-card" data-search="'+escapeHtml((tool.name+" "+tool.publisher+" "+tool.description).toLowerCase())+'">'+
    '<div class="ai-map-card-head"><div class="ai-map-avatar">'+escapeHtml(tool.name.slice(0,2).toUpperCase())+'</div><div><h3>'+escapeHtml(tool.name)+'</h3><p>'+escapeHtml(tool.publisher)+'</p></div>'+
    '<span class="ai-map-chip">'+escapeHtml(aiMapCategoryLabel(tool.category))+'</span></div>'+
    '<p class="ai-map-description">'+escapeHtml(tool.description)+'</p>'+
    '<div class="ai-map-meta">'+
      (tool.platforms?.length ? '<span>'+escapeHtml(tool.platforms.join(" · "))+'</span>' : "")+
      (tool.plans?.length ? '<span>'+escapeHtml(tool.plans.join(" · "))+'</span>' : "")+
    '</div><div class="ai-map-actions">'+actions+'</div></article>';
}

function bindAiMapCatalog(){
  const input=document.getElementById("aiMapSearch");
  const count=document.getElementById("aiMapCount");
  if(!input) return;
  const cards=[...document.querySelectorAll(".ai-map-card")];
  const update=()=>{
    const q=input.value.trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const show=!q || card.dataset.search.includes(q);
      card.hidden=!show;
      if(show) visible++;
    });
    if(count) count.textContent=visible+"개";
  };
  input.addEventListener("input",update);
  update();
}

function renderAiMapCatalog(category=null){
  const data=window.AI_MAP_DATA;
  if(!data) return '<h1>AI Map 데이터를 불러오지 못했습니다.</h1>';
  const tools=category ? data.tools.filter(t=>t.category===category) : data.tools;
  const title=category ? aiMapCategoryLabel(category) : "전체 AI 도구";
  return '<section class="ai-map-page">'+
    '<div class="ai-map-hero"><span class="ai-map-kicker">AI MAP · '+escapeHtml(data.lastUpdated)+'</span>'+
    '<h1>'+escapeHtml(title)+'</h1>'+
    '<p>AI 도구를 역할과 사용 목적 기준으로 탐색합니다. 원본 AI Map의 공개용 카탈로그 데이터를 현재 기술 블로그 구조에 통합했습니다.</p>'+
    '<div class="ai-map-search"><input id="aiMapSearch" type="search" placeholder="이름, 제작사, 설명으로 검색"><span id="aiMapCount">'+tools.length+'개</span></div></div>'+
    '<div class="ai-map-grid">'+tools.map(aiMapToolCard).join("")+'</div></section>';
}

function renderAiMapGuides(){
  const data=window.AI_MAP_DATA;
  return '<section class="ai-map-page"><div class="ai-map-hero"><span class="ai-map-kicker">WORKFLOW GUIDES</span><h1>AI 활용 가이드</h1><p>도구를 나열하는 것보다 실제 작업 흐름 안에서 어떤 도구를 어디에 쓰는지 이해하는 것이 중요합니다.</p></div>'+
    '<div class="ai-map-guide-list">'+data.guides.map((guide,i)=>'<article class="ai-map-guide"><span class="ai-map-guide-num">'+String(i+1).padStart(2,"0")+'</span><div><span class="ai-map-kicker">'+escapeHtml(guide.kicker)+'</span><h2>'+escapeHtml(guide.title)+'</h2><p>'+escapeHtml(guide.summary)+'</p>'+
    guide.sections.map((s,j)=>'<div class="ai-map-guide-step"><strong>'+String(j+1).padStart(2,"0")+'. '+escapeHtml(s.heading)+'</strong><p>'+escapeHtml(s.body)+'</p>'+
      (s.tools?.length ? '<div class="ai-map-actions">'+s.tools.map(t=>'<a class="ai-map-action ghost" target="_blank" rel="noopener noreferrer" href="'+escapeHtml(t.url)+'">'+escapeHtml(t.name)+' ↗</a>').join("")+'</div>' : "")+
    '</div>').join("")+'</div></article>').join("")+'</div></section>';
}

function renderAiMapNews(){
  const data=window.AI_MAP_DATA;
  const sorted=[...data.news].sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  return '<section class="ai-map-page"><div class="ai-map-hero"><span class="ai-map-kicker">AI NEWS</span><h1>AI 소식</h1><p>AI Map에 기록된 뉴스와 학습 리소스를 한 곳에서 확인합니다.</p></div>'+
    '<div class="ai-map-news-list">'+sorted.map(item=>'<article class="ai-map-news"><div><span class="ai-map-kicker">'+escapeHtml(item.source)+(item.date?' · '+escapeHtml(item.date):'')+'</span><h2><a target="_blank" rel="noopener noreferrer" href="'+escapeHtml(item.url)+'">'+escapeHtml(item.title)+' ↗</a></h2><p>'+escapeHtml(item.summary)+'</p></div></article>').join("")+'</div></section>';
}

function renderAiMapSpecial(path){
  if(path==="@ai-map:catalog") return renderAiMapCatalog();
  if(path.startsWith("@ai-map:category:")) return renderAiMapCatalog(path.split(":")[2]);
  if(path==="@ai-map:guides") return renderAiMapGuides();
  if(path==="@ai-map:news") return renderAiMapNews();
  return '<h1>AI Map</h1>';
}

async function loadDoc(){
  const path=location.hash.slice(1)||DOCS[0].items[0][1];
  document.querySelectorAll(".tree-link").forEach(a=>a.classList.toggle("active",a.dataset.path===path));
  const [group,title]=findTitle(path);
  breadcrumb.textContent=group+" / "+title;
  content.innerHTML='<div class="loading">문서를 불러오는 중…</div>';
  try{
    if(path.startsWith("@ai-map:")){
      content.innerHTML=renderAiMapSpecial(path);
      if(path==="@ai-map:catalog" || path.startsWith("@ai-map:category:")) bindAiMapCatalog();
      window.scrollTo({top:0,behavior:"instant"});
      document.body.classList.remove("menu-open");
      return;
    }
    const res=await fetch("./"+path);
    if(!res.ok) throw new Error(res.status+" "+res.statusText);
    const md=await res.text();
    marked.setOptions({gfm:true,breaks:false});
    content.innerHTML=marked.parse(md);
    content.querySelectorAll("pre code.language-mermaid").forEach(code=>{
      const div=document.createElement("div");
      div.className="mermaid";
      div.textContent=code.textContent;
      code.closest("pre").replaceWith(div);
    });
    mermaid.initialize({
      startOnLoad:false,
      theme:"dark",
      securityLevel:"loose",
      themeVariables:{fontFamily:"Inter, Noto Sans KR, sans-serif",primaryColor:"#18243a",primaryTextColor:"#e7edf5",lineColor:"#7aa7ff"}
    });
    await mermaid.run({querySelector:".mermaid"});
    window.scrollTo({top:0,behavior:"instant"});
    document.body.classList.remove("menu-open");
  }catch(e){
    content.innerHTML="<h1>문서를 열 수 없습니다</h1><p>"+String(e)+"</p>";
  }
}

menuBtn.onclick=()=>document.body.classList.toggle("menu-open");
overlay.onclick=()=>document.body.classList.remove("menu-open");
window.addEventListener("hashchange",loadDoc);
buildTree();
loadDoc();