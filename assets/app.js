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

async function loadDoc(){
  const path=location.hash.slice(1)||DOCS[0].items[0][1];
  document.querySelectorAll(".tree-link").forEach(a=>a.classList.toggle("active",a.dataset.path===path));
  const [group,title]=findTitle(path);
  breadcrumb.textContent=group+" / "+title;
  content.innerHTML='<div class="loading">문서를 불러오는 중…</div>';
  try{
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