# COF — Skills We DON'T Have, Worth Exploring (researched)

**What this is:** I searched *beyond* what's installed — every configured marketplace catalog (cc-marketplace, claude-plugins-official, claude-code-templates, ando, every, workflows… hundreds of entries) **plus** the wider GitHub/web ecosystem — for skills that fit COF. Two findings up front:

1. **The local marketplaces skew ~90% software-dev** (code review, backend, devops, B2B). Almost nothing for fiction. So the best COF skills live on the **web**, or get **built custom**.
2. **There's a thriving fiction-skill ecosystem off-marketplace** — and one of them targets COF's single worst pain (canon contradictions) almost perfectly.

**Safety note:** everything below except the official-marketplace plugins is **third-party code**. Read the `SKILL.md`/scripts before installing. Prefer markdown-based, plugin-installable skills; be cautious with script-heavy or "autonomous" ones (especially anything that wants `--dangerously-skip-permissions`).

---

## TIER 1 — hits COF's core pain directly (explore first)

### 1. `story-skills` — danjdewhurst/story-skills 🥇 THE one to try
A **Continuity Engine** that treats story contradictions like a compiler treats type errors — *deterministic, file-addressed, reproducible*. Catches:
- **dead characters appearing after death**, promise/payoff ordering, open-question resolution, scene-cast/POV checks, **durable state** (who knows what, who owns what), and **conflict detection** between records.
- Six skills: `story-init`, `character-management`, `worldbuilding`, `plot-structure`, `chapter-writing`, `revision-continuity`. Operates on plain markdown + YAML frontmatter.

**Why COF:** this *is* the answer to the Stampede/Oliver/Akrahuhum/dedup nightmare — automated canon-consistency instead of manual archaeology. Cross-platform, inspectable.
`/plugin marketplace add danjdewhurst/story-skills` → `/plugin install story-skills@story-skills`

### 2. `creative-writing-skills` — haowjy/creative-writing-skills 🥈 the craft/editor toolkit we lack
The long-form-fiction craft layer nothing installed provides. Skills: **`cw-muse`** (idea→draft partner in your voice), `prose-writing` (psychic distance, sensory grounding), `scene-construction`, **`prose-critique`** (adversarial reading), `character-voice`, `story-architecture`, and especially **`style-analysis`** — *builds a voice-reference file from your real prose samples.*

**Why COF:** `style-analysis` directly counters the AI-rewrite contamination (capture *your* voice, not the rewrite layer's); `prose-critique` is the adversarial editor; `cw-muse` is the finish-the-story partner you actually asked for.
`/plugin marketplace add haowjy/creative-writing-skills` → `/plugin install creative-writing-skills@cw`

---

## TIER 2 — the transmedia/YouTube pipeline (already in your OFFICIAL marketplace, just not installed)

### 3. `runway-api` — Runway (official `claude-plugins-official`)
Video/image/audio generation at scale: **supports Seedance 2, gen4.5, veo3, Nano, Banana Pro**; batch campaigns, **multishot stories**, creative iteration. The video engine for the motion-comic play; complements your Directors Palette + Ad Lab. *(Needs a Runway API key.)*

### 4. `hyperframes` — HeyGen (official)
**Write HTML → render video**: GSAP/runtime animations, **captions, voiceovers, audio-reactive visuals**, website-to-video capture. Great for kinetic-text intros, lower-thirds, and assembling motion-comic panels into video.

### 5. `save-to-spotify` — Spotify (official)
Build **polished audio episodes** — TTS narration, timelines, cover images — and **publish to Spotify**. A ready-made audio-drama / podcast channel for COF stories (pairs with your "Sides & Sounds" idea). *(Spotify auth.)*

> All three install from the marketplace you already have configured (`claude-plugins-official`) — no new source needed.

---

## TIER 3 — alternatives & DIY

### 6. Fiction Writing Workshop (mcpmarket.com/tools/skills/fiction-writing-workshop)
Integrated editorial workflow: **Story Bible for consistency + Developmental/Line-Editor personas + simulated reader testing.** Overlaps Tier 1; pick it if you'd rather have *one* opinionated workshop than assemble #1+#2. Also `creative-storytelling` (frameworks for novels/scripts/games) from the same directory.

### 7. A custom **COF-voice `.skill`** (build it)
Per the "build a Cowork .skill for your fiction voice" method — bottle *your* distinct voice (cadence, vocabulary, the cold-antihero register that the AI-rewrite layer keeps flattening) into a reusable skill. Strongest when seeded from #2's `style-analysis` output. This is the highest-value *custom* build after the `cof-canon-check` idea from the last pass.

---

## SKIP (with reasons)
- **forsonny/Claude-Code-Novel-Writer** — autonomous 100k-word *fantasy* generator (3–6k words/hr, zero human intervention). **Misaligned**: you want a careful *partner* that finishes curated standalone stories, not mass autonomous world-gen — and it's fantasy-shaped, *nix shell-script based (Windows friction), and runs under `--dangerously-skip-permissions` (risk). Admire the engineering; don't adopt it.
- The ~hundreds of dev/B2B/devops agents in cc-marketplace & claude-code-templates — irrelevant to fiction.

## Directories worth mining later
travisvn/awesome-claude-skills · BehiSecc/awesome-claude-skills · ComposioHQ/awesome-claude-skills (1000+) · awesomeclaude.ai · claudepluginhub.com (has a `howells-fiction` plugin).

## Recommended exploration order
**#1 `story-skills`** (try it on the existing bible — see if its Continuity Engine flags the contradictions we fixed by hand) → **#2 `creative-writing-skills`** (run `style-analysis` on *Condemned* + *Memory Vessel* to capture your real voice) → then a **Tier-2** plugin once you pick the first story to put through the video/audio pipeline.
