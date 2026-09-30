# An AI Production Method: Prompts, Review and Automation — A Way of Working That Outlives the Tools

> **Learning goal**: Map the operating model "you set direction → AI drafts → you verify and add experience → AI checks format" onto the OSMU production steps, keep reusable prompt templates and a style guide as your own files outside any tool, and design your own pre-publish review, automation of repetitive steps, measurement of AI's effect and a monthly tool budget.

Tool names change every few months. In July 2026 NotebookLM was renamed Gemini Notebook, and in September OpenAI announced the retirement of custom GPTs while Google announced that Gems will turn into Skills. So this document covers **a way of working that outlives the tools**. Step-by-step tool use for the blog is in "Writing Blog Posts with AI: Tools and Tutorials", step-by-step tool use for video is in "Making YouTube Videos with AI: Tools and Tutorials", policy such as synthetic-content disclosure, inauthentic content and terms of use is in "AI-assisted Production and Platform Policy", and the weekly production flow and time split follow "One Source, Multi Use (OSMU) Strategy". Features, prices and status are **as of 2026-09**. Most official pages could not be opened directly, so they are marked "confirmed via search results". Tool names are neutral examples, not recommendations.

## Key Concepts

| Term | Meaning | How this document uses it |
|---|---|---|
| Operating model | The order and roles that you and AI take on one output | Direction → draft → verification and experience → format check |
| Prompt template | An instruction you reuse every week by changing only the blanks | Five slots: [Role]·[Input]·[Task]·[Format]·[Constraints] |
| Style guide | A one-page document on reader, tone, banned phrases, terms and format | The standard for every draft. The original lives in your own file |
| Project memory | A feature that loads instructions and reference files into every chat | Claude Projects, ChatGPT Projects, Gems and Skills, Gemini Notebook |
| Originality layer | Evidence AI cannot make and only J can add | Your own screen recordings, real files, mistakes, measurements |

## Principles

### 1. The operating model: four slots in order

AI is strong at **removing the blank page and fixing format**, and weak at **guaranteeing facts and producing experience**. So the roles split into four slots. You set the direction (for whom, about what), AI writes the draft, you check the facts and add your own experience, and finally AI checks for gaps, spelling and format. If the check raises an issue, the work goes back to your slot. The 4D model (Delegation, Description, Discernment, Diligence) in Anthropic's free course [AI Fluency](https://academy.claude.com/courses/ai-fluency-framework-foundations) has the same shape: choose what to hand over, describe it clearly, judge the result and take responsibility.

```mermaid
flowchart LR
    DIR["You: pick topic, reader, source"] -->|outline and notes| DRAFT["AI: draft"]
    DRAFT -->|draft| VER["You: verify, add experience"]
    VER -->|revision| FMT["AI: format and gap check"]
    FMT -->|issues| VER
    FMT -->|pass| PUB["You: publish"]
    PUB -->|7-day metrics| LOG["Work log and weekly review"]
    LOG -->|next week's direction| DIR
```

### 2. A prompt is a form, not a sentence

If you write a good prompt from scratch every time, quality changes by the day of the week. Build **a form with blanks** and change only the input. The templates here have five slots: **[Role]·[Reference]** (who is writing, following which style guide), **[Input]** (this week's keywords, outline, transcript or metrics; put long material above the instructions), **[Task]** (one job at a time), **[Format]** (table columns, length, placeholders; a fixed format makes review easier) and **[Constraints]** ("leave [check needed] if unsure", "do not invent numbers"; the cheapest way to reduce hallucination). Learn the basics from Anthropic's [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) and [interactive tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) (English), and from Google's [Google Prompting Essentials](https://www.skills.google/paths/2337/course_templates/1229) (English, under 10 hours).

### 3. Style guide and project memory: keep the original in your own file

Project memory loads your style guide and reference files into every chat. But within the single month of September 2026, two vendors changed the shape of this feature. The conclusion is simple: **keep the original style guide as one file, `style_guide.md`, that you own, and put copies into each tool.** When you switch tools, you paste the file again and you are done.

| Feature | Status as of 2026-09 (confirmed via search results) | J's use | Tutorials |
|---|---|---|---|
| Claude Projects | Each project has instructions and knowledge files. Help-centre search results say the free plan can use it within a count limit (five projects) | A "weekly production" project with the style guide plus past outlines | [How can I create and manage projects?](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects) (English), [Claude 101: Introduction to projects](https://academy.claude.com/courses/claude-101/introduction-to-projects) (English), [How to use Claude Projects](https://www.digitalmarketer.co.kr/class/claude-in-practice/what-are-claude-projects) (Korean blog), [Turn Claude into your own assistant in 15 minutes](https://www.youtube.com/watch?v=Kgte_LvYGqk) (Korean video, third party) |
| ChatGPT Projects | Projects share instructions and files. Free allows 5 files per project, Go and Plus 25 | The same setup if ChatGPT is your main tool | [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) (English) |
| Custom GPTs | Personal accounts (Free, Go, Plus, Pro) cannot create new GPTs, and a retirement with migration to plugins was announced on 2026-09-11. The FAQ gives 2026-12-11 as the planned retirement date | **Do not build new ones.** If you have an existing GPT, move its instructions into `style_guide.md` | [Custom GPT retirement and migration FAQ](https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq) (English) |
| Gemini Gems → Skills | Gems on personal accounts migrate automatically to Skills from 2026-11-17. Reports say Skills are expanding to free personal accounts (18 and over) | One "fact-check" Skill if Gemini is your cross-check model | [About the transition from Gems to skills](https://support.google.com/gemini/answer/18560919) (English), [Write effective skills](https://support.google.com/gemini/answer/17102773?hl=en) (English) |
| Gemini Notebook (formerly NotebookLM) | Renamed on 2026-07-16. Answers from the sources you upload and cites them. Secondary sources give free limits of 100 notebooks and 50 sources per notebook | A "research notebook" of official docs, help pages and reference videos | [Create a notebook](https://support.google.com/notebooklm/answer/16206563?hl=en) (English), [Quick Tips: How to use NotebookLM](https://www.youtube.com/watch?v=mX39MYEhqCU) (English video, Google Workspace), [The complete NotebookLM guide](https://brunch.co.kr/@eunjongseong/242) (Korean blog) |

J's original style guide (template):
```text
# style_guide.md — J's style guide v1 (2026-10-05)
Reader: office workers who use Excel daily but find functions and automation unfamiliar
Tone: polite form, one idea per sentence, spell out a technical term the first time
Banned: hype ("guaranteed", "in 1 minute"), unchecked numbers, other people's screenshots
Terms: Excel menus by their Korean UI names, functions in capitals (XLOOKUP, UNIQUE)
Format: blog first screen = answer+reader+time needed / video first 30 s = problem→result→today's goal
Evidence: every post and video has 1 mistake by J + 1 measurement + J's own screen recording
```

### 4. The originality layer: what only J can add

AI drafts come out similar for everyone. What makes the output J's is **evidence AI cannot have**: screens recorded on real Excel files, example files with company data removed, the formula J first got wrong and how it was fixed, measurements such as "cleaning 3,200 rows: 40 minutes by hand → 2 minutes with a function", and reader questions from comments. The `[J's mistake/measurement]` blank in the templates is left on purpose so that AI cannot fill it. Platforms point the same way. In 2026-07 YouTube described inauthentic content as three types: "template-based and repetitive", "off-putting or distressing" and "AI personas discussing sensitive topics such as health or finance" (TechCrunch report and a Creator Insider video, confirmed via search results), and Google Search says it rewards [people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) that shows experience and expertise, regardless of how it was made. The definitions and boundaries of the policies are in "AI-assisted Production and Platform Policy", and how Naver evaluates posts is in "Naver Blog and How Naver Search Works".

### 5. The review protocol: the original source decides

| What | How to check | Pass condition |
|---|---|---|
| Sources | Open every link the AI gave and find the sentence yourself | At least one original source (official docs, help pages), with the date you checked |
| Numbers, prices, dates | Compare with the original source and add "as of 2026-09" | No original source → delete it or write "could not confirm" |
| Menu paths, function names | Follow the steps in real Excel | Post, script and screenshots match each other |
| Screenshots | Look for personal data, company file names, AI-generated screens | Only real screens you captured |
| Cross-model check | Give another vendor's model the draft and the fact-check list (P7) and ask for objections and gaps | Decide each flagged item by the original source. Never settle it by a vote between models |
| Labels and rights | Follow the pre-publish check in "AI-assisted Production and Platform Policy" | That check passes |

The final pre-publish checklist fits in five lines: (1) every "high" item on the P7 list was checked against an original source; (2) no `[check needed]` or `[J's …]` placeholders remain; (3) menu names match between screenshots and text; (4) none of the style guide's banned phrases appear; (5) the tools used and the check dates are in the work log.

### 6. Automation: only the repetitive steps, and a person publishes

Automate **repetition without judgement**: moving the same input, in the same order, to the same place every week. Naver Blog statistics are copied by hand, because no public API for them could be confirmed.

| Tool | Free tier (2026-09, confirmed via search results) | Paid from | Repetitive work J hands over | Tutorials |
|---|---|---|---|---|
| Apps Script | Free. Personal accounts get 90 minutes a day of total trigger runtime and 6 minutes per run | — | Publishing-reminder emails from dates in a calendar sheet, one row of YouTube Analytics numbers every Monday, weekly folders and a `rights.md` skeleton | [Apps Script overview](https://developers.google.com/apps-script/overview) (English), [YouTube Analytics Service](https://developers.google.com/apps-script/advanced/youtube-analytics) (English), [A Google Sheets app with AI in 10 minutes](https://www.oppadu.com/lesson/ai-apps-script-10min/) (Korean, Oppadu Excel), [How to use Apps Script](https://www.youtube.com/watch?v=C7CqK2vOWHY) (Korean video, third party) |
| Make | Free: 1,000 credits a month | Core about $9–12 a month (10,000 credits; varies by billing cycle and by source) | Drop a transcript into a Drive folder and an LLM API writes an outline and a blog draft document (API fees extra) | [Make Academy](https://academy.make.com/) (English, free) |
| Zapier | Free: 100 tasks a month, two-step Zaps | Professional $19.99 a month billed annually, $29.99 monthly, 750 tasks | Same as above. The most connected apps | [Build your first Zap](https://learn.zapier.com/build-your-first-zap) (English) |
| n8n | Self-hosted Community Edition is free | Cloud Starter €24 a month (€20 billed annually), 2,500 executions | Same as above. Complex flows, if you can run your own server | [Level one text course](https://docs.n8n.io/courses/level-one/) (English, about 2 hours), [Video courses](https://docs.n8n.io/video-courses/) (English), [n8n lecture playlist](https://www.youtube.com/playlist?list=PL6skWNka9B4v9h1mm57TzTzqXjWICUQTQ) (Korean playlist, third party) |

Why J does not auto-publish, and the limits:
- **Naver**: the Naver Blog posting API was shut down on 2020-05-06 because of mass-produced advertising posts (confirmed via news reports). There is no official auto-posting route, and working around it with macros leads toward the abnormal-use sanctions covered in "AI-assisted Production and Platform Policy".
- **YouTube**: videos uploaded through unverified API projects created after 2020-07-28 are locked to private, and making them public requires an audit (YouTube Data API docs, confirmed via search results). A pipeline that runs from draft to publish without a person shrinks the differences between videos and moves toward inauthentic content.
- **Security and cost**: keep API keys out of shared sheets and grant only the permissions needed. Zapier counts each successful action and Make counts each action, so repeated runs raise the bill. Turn on failure alerts so an automation cannot stop silently.

## Applied: Example creator J's prompt library and weekly loop

### J's weekly loop: four slots per OSMU step

Use the 10-hour weekly split from "One Source, Multi Use (OSMU) Strategy" as it is, and divide each step into the four slots. P1–P8 are the prompt template numbers below. Replace the `{ }` with this week's material and use them with `style_guide.md` loaded into project memory. The result is always a draft.

| OSMU step (hours) | You: direction | AI: draft | You: verify and add experience | AI: format check |
|---|---|---|---|---|
| Research and example file (1.0) | Choose this week's reader problem | Cluster keywords (P1), summarise sources in the notebook | Open original sources, build the example file yourself | — |
| Outline (0.5) | Define the problem | Outline draft (P2) | Reorder to match what you actually did | Find missing steps |
| Script (0.5) | Choose the hook | Script draft (P4) | Add your mistakes and measurements | Check length and tone |
| Recording and voice (1.5) | All human | — | Record on real files | — |
| Long-form edit and thumbnail (3.0) | Decide the thumbnail | Text options (P6) | Choose, Test & Compare | Caption typos |
| Blog post (2.0) | Decide the first screen | Post draft (P3), fact-check list (P7) | Match screenshots and formulas | Cross-model check, spelling |
| 3 Shorts (1.0) | Choose three | Segment candidates (P5) | Edit the first 1–2 seconds | Captions |
| Community and log (0.5) | Next week's direction | 7-day review draft (P8) | Decide | — |

### Prompt library (templates)

```text
# P1 template: keyword clustering
[Role and input] You are the editor of a Naver Blog and YouTube tutorial channel. Keywords from Naver DataLab and the Naver search-ad keyword tool: {paste}
[Task] Group keywords that solve the same problem into 5–8 clusters, and write one representative question per cluster.
[Format] Table: cluster name | representative question | keywords included | search intent (how-to/problem-solving/comparison/concept)
[Constraints] Do not invent keywords or search volumes that are not in the list. Put unclear keywords under "unclassified".
```

```text
# P2 template: from reader questions to an outline
[Role and input] You are the structure writer for an Excel work-automation course. Topic: {topic} / Reader questions: {list} / My notes from doing it: {notes}
[Task] Build "one outline": problem → solution steps → common mistakes → next step.
[Format] 5–7 subheadings. Under each, one key line and one line for "screenshot needed".
[Constraints] Mark any step that is not in my notes as [check needed].
```

```text
# P3 template: blog draft in the style guide
[Reference] Follow style_guide.md in the project and this week's outline.
[Task] Write a Naver Blog post draft. Put the answer, the reader and the time needed in the first 3–5 lines.
[Format] Subheadings match the outline. Add a [screenshot: what it shows] placeholder at every step.
[Constraints] Use only numbers, menu paths and function names found in the outline and notes; otherwise [check needed]. Leave experience as a [J's mistake/measurement] blank.
```

```text
# P4 template: long-form script with a hook
[Reference] Follow the tone section of style_guide.md and this week's outline.
[Task] Write an 8–12 minute lecture script. The first 30 seconds go problem scene → finished result → today's goal.
[Format] Two-column table: line to say | screen direction (action to record)
[Constraints] Short sentences for the ear. No hype such as "done in 1 minute". Mark any feature not in the outline as [check needed].
```

```text
# P5 template: choosing Shorts segments from a transcript
[Input] Timestamped transcript of the long-form lecture: {transcript}
[Task] Pick 5 candidate segments of 30–60 seconds to cut as Shorts. Prefer segments where the result shows on one screen.
[Format] Table: start–end | type (result/mistake/question) | caption for the first 1–2 seconds | reason to send viewers to the long-form
[Constraints] Do not add anything that is not in the transcript. Drop segments that make no sense without context.
```

```text
# P6 template: thumbnail text options
[Input] Title options: {title} / Result screen description: {description} / Target viewer: {audience}
[Task] Write 10 thumbnail text options. Short, two lines at most.
[Format] Number | text | information not repeated from the title | hype risk (low/medium/high)
[Constraints] Do not promise a result the video does not show.
```

```text
# P7 template: fact-check list
[Input] Draft before publishing: {draft}
[Task] Extract every claim that needs checking: numbers, dates, prices, menu paths, function names, policies, descriptions of other services.
[Format] Table: sentence | claim type | kind of original source to check | risk (high/medium/low)
[Constraints] Do not judge whether a claim is true. Only build the list. A person decides using the original source.
```

```text
# P8 template: review 7 days after publishing
[Input] 7-day metrics: {views, average view duration, impressions click-through rate, blog search keywords, comment summary} / last 4-week average: {values}
[Task] Compared with the 4-week average, name 3 things that changed and propose 1 thing to change next week.
[Format] Observation | supporting metric | hypothesis | 1 experiment for next week
[Constraints] Do not assert causes that are not in the metrics. Label hypotheses as hypotheses.
```

### J's monthly tool budget (as of 2026-09)

| Item | Choice | Plan and price (confirmed via search results) | J's call |
|---|---|---|---|
| Main LLM (only one) | One of Claude, ChatGPT, Gemini | Claude Pro $20 a month ($17 a month billed annually) / ChatGPT Plus $20 a month (no annual billing) / Google AI Pro $19.99 a month (US price; the Korean won price could not be confirmed on an official page) | Try it for a month and keep the one whose drafts need the fewest fixes. Cross-check with another vendor's free plan (0) |
| Research notebook | Gemini Notebook | Free (with limits). Higher limits with Google AI plans | Where official docs and help pages are collected |
| Automation | Apps Script | Free (90 minutes a day of trigger runtime on personal accounts) | Reminders, metrics collection, folder set-up |
| Automation (optional) | Make, Zapier, n8n | Start on the free plans. Paid prices are in the table above | Consider only after doing transcript → draft by hand for 4+ weeks |
| **Total (method tools)** | | **About $20 ≈ KRW 28,000 a month** (assuming 1 USD = KRW 1,400; tax and exchange-rate changes not included) | Do not add more in the first 90 days |

Prices for editing, caption and design tools are covered in "Writing Blog Posts with AI: Tools and Tutorials" and "Making YouTube Videos with AI: Tools and Tutorials". Prices change often. Google reorganised its plans at I/O 2026 and later reportedly cut the AI Plus price. Check each pricing page again before you pay.

## Going Deeper

The feeling that "AI made me faster" tends to leave out review time. For each step, look at **net saving = writing time saved − review time added**. The time savings in "AI-assisted Production and Platform Policy" are assumptions, so J logs real numbers for the first 4 weeks to test them.

| Metric | How to measure | Decision |
|---|---|---|
| Time per step | Start and end times in the work-log sheet | Compare with the split in "One Source, Multi Use (OSMU) Strategy" |
| Review time | Minutes spent checking the P7 list | If net saving is 0 or less, rethink AI use in that step |
| Draft survival rate | Share of AI draft sentences left in the published version (roughly) | Almost unchanged is an originality warning; almost all discarded means the draft is not helping |
| Errors after publishing | Factual errors flagged in comments or found yourself | Target 0. One error means tighter review in that step |

Compare outcome metrics (average view duration, blog search keywords) as 4-week averages before and after adopting AI, and note that other factors are mixed in. **Stop rule**: if net saving is 0 or less for 4 weeks in a row, or the same tool causes two published factual errors, stop using that tool in that step. Matching the 4-week pruning cycle of "One Source, Multi Use (OSMU) Strategy" keeps this to one review. After a model update, rerun P1, P3 and P5 on last week's three inputs (keyword list, outline, transcript) as a "test set" to see whether the format and the `[check needed]` markers hold, and version prompts as `prompts_v2.md` next to the style guide.

## Common Misconceptions

- **"One good prompt is enough"** — Review and J's experience decide quality. A prompt only fixes the floor.
- **"If two AIs give the same answer, it is true"** — Both models may have learned the same wrong material. The original source decides.
- **"Automation only counts if it goes all the way to publishing"** — Naver closed its auto-posting route and YouTube locks unverified API uploads to private. Automation stops at drafts and logs.
- **"Settings saved in a project feature will stay"** — Their shape changes, as the custom GPT retirement and the Gems → Skills move show. The original is your own file.

## Self-check Questions

1. Which of the four slots in the operating model is never handed to AI, and why?
2. Which two risks does the `[J's mistake/measurement]` blank in the P3 template prevent?
3. If two models disagree in a cross-model check, what decides?
4. Give one reason each for not auto-publishing on Naver Blog and on YouTube.
5. Over 4 weeks, writing time for scripts fell by 30 minutes but review time rose by 40 minutes. What do you do?

## References

All links were confirmed via search results on 2026-09-30 (they could not be opened directly). Links are in English unless marked.

- **Method and prompts**: [AI Fluency: Framework and foundations](https://academy.claude.com/courses/ai-fluency-framework-foundations), [Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview), [Interactive Prompt Engineering Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) — Anthropic / [Google Prompting Essentials](https://www.skills.google/paths/2337/course_templates/1229) — Google Skills — confirmed via search results (2026-09-30)
- **Claude Projects**: [How can I create and manage projects?](https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects), [Introduction to projects](https://academy.claude.com/courses/claude-101/introduction-to-projects) — Anthropic / [How to use Claude Projects](https://www.digitalmarketer.co.kr/class/claude-in-practice/what-are-claude-projects) — Juniappa Blog (Korean) / [Turn Claude into your own assistant in 15 minutes](https://www.youtube.com/watch?v=Kgte_LvYGqk) — YouTube (Korean, third party) — confirmed via search results (2026-09-30)
- **ChatGPT**: [Projects in ChatGPT](https://help.openai.com/en/articles/10169521-projects-in-chatgpt), [Custom GPT retirement and migration FAQ](https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq) — OpenAI Help Center / [OpenAI to Retire Custom GPTs, Replace Them with Plugins](https://virtualizationreview.com/articles/2026/09/28/openai-to-retire-custom-gpts-replace-them-with-plugins.aspx) — Virtualization Review, 2026-09-28 — confirmed via search results (2026-09-30)
- **Gemini Gems and Skills**: [About the transition from Gems to skills](https://support.google.com/gemini/answer/18560919), [Write effective skills for Gemini Apps](https://support.google.com/gemini/answer/17102773?hl=en) — Gemini Apps Help / [Google is killing off Gemini's Gems in favor of skills](https://techcrunch.com/2026/09/28/google-is-killing-off-geminis-gems-in-favor-of-skills/) — TechCrunch, 2026-09-28 / [Gemini Skills are expanding to free accounts](https://www.androidauthority.com/gemini-skills-expand-free-accounts-3716627/) — Android Authority — confirmed via search results (2026-09-30)
- **Gemini Notebook**: [NotebookLM is now Gemini Notebook](https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/), [8 expert tips for getting started with NotebookLM](https://blog.google/innovation-and-ai/products/notebooklm-beginner-tips/) — Google Blog / [Create a notebook in Gemini Notebook](https://support.google.com/notebooklm/answer/16206563?hl=en) — Gemini Notebook Help / [Quick Tips for Google Workspace: How to use NotebookLM](https://www.youtube.com/watch?v=mX39MYEhqCU) — Google Workspace, YouTube / [The complete NotebookLM guide](https://brunch.co.kr/@eunjongseong/242) — Brunch (Korean) — confirmed via search results (2026-09-30)
- **Originality and policy**: [YouTube's Inauthentic Content Policy - Explained!](https://www.youtube.com/watch?v=14Vm0CiyUVE) — reported as Creator Insider, YouTube, 2026-07 / [YouTube clarifies policies around AI slop and upsetting videos](https://techcrunch.com/2026/07/20/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos/) — TechCrunch, 2026-07-20 / [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) — Google Search Central — confirmed via search results (2026-09-30)
- **Apps Script**: [Google Apps Script overview](https://developers.google.com/apps-script/overview), [Quotas for Google Services](https://developers.google.com/apps-script/guides/services/quotas), [YouTube Analytics Service](https://developers.google.com/apps-script/advanced/youtube-analytics) — Google for Developers / [Build an app with AI and Google Sheets in 10 minutes, no coding](https://www.oppadu.com/lesson/ai-apps-script-10min/) — Oppadu Excel (Korean) / [How to use Apps Script to get more out of Google Sheets](https://www.youtube.com/watch?v=C7CqK2vOWHY) — YouTube (Korean, third party) — confirmed via search results (2026-09-30)
- **Make, Zapier, n8n**: [Make Academy](https://academy.make.com/), [Credits](https://help.make.com/credits) — Make / [Build your first Zap](https://learn.zapier.com/build-your-first-zap), [How pay-per-task billing works in Zapier](https://help.zapier.com/hc/en-us/articles/15279018245901-How-pay-per-task-billing-works-in-Zapier) — Zapier / [Level one: Introduction](https://docs.n8n.io/courses/level-one/), [Video courses](https://docs.n8n.io/video-courses/) — n8n Docs / [n8n lectures](https://www.youtube.com/playlist?list=PL6skWNka9B4v9h1mm57TzTzqXjWICUQTQ) — YouTube playlist (Korean, third party) — confirmed via search results (2026-09-30)
- **Limits of auto-publishing**: [Naver to end its "posting API" next month](https://www.newspim.com/news/view/20200413000737) — Newspim (Korean), 2020-04-13 / [Videos: insert](https://developers.google.com/youtube/v3/docs/videos/insert) — YouTube Data API — confirmed via search results (2026-09-30)
- **Prices**: [Plans & Pricing](https://claude.com/pricing) — Anthropic / [What is ChatGPT Plus?](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus) — OpenAI Help Center / [Everything new in our Google AI subscriptions, fresh from I/O 2026](https://blog.google/products-and-platforms/products/google-one/google-ai-subscriptions/) — Google Blog / [Google cuts the price of its AI Plus plan and doubles the storage](https://www.engadget.com/2190039/google-cuts-the-price-of-its-ai-plus-plan-and-doubles-the-storage/) — Engadget / [Pricing & Subscription Packages](https://www.make.com/en/pricing) — Make / [Plans & Pricing](https://zapier.com/pricing) — Zapier / [n8n Plans and Pricing](https://n8n.io/pricing/) — n8n — confirmed via search results (2026-09-30)
