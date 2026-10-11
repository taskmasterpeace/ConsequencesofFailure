# COF — Top 10 Skills Toolkit (evaluated)

**What this is:** I scanned every skill installed on this machine (~150+) against what COF actually needs — *finish standalone stories* (the #1 goal) and the *transmedia/YouTube/Seedance* monetization play. Most installed skills are scientific (alphafold, biopython…), web-deploy (Vercel, Supabase), or framework-review (Rails/Python) and are **irrelevant** to a fiction universe. Below are the 10 that genuinely move COF.

**Status key:** 🟢 ready now · 🟡 needs an API key/setup you likely already have · 🔵 doesn't exist — build it.

---

## WRITE & PLAN (the core — finish the stories)

### 1. `superpowers:brainstorming` 🟢
Structured "explore intent before you generate" discipline. Your whole process is brainstorm-heavy ("what should this BE," new characters, new arcs) — this stops us jumping to output before the idea is pinned. Zero setup, use it at the top of every creative session.

### 2. `skill-creator` (or `compound-engineering:create-agent-skills`) 🔵→🟢
The force multiplier. COF needs **custom skills that don't exist off the shelf** — see "The Gap" below. This is how we build them once and stop redoing manual work. Highest leverage item on the list.

### 3. `deep-research` 🟢
Multi-source, **citation-backed, adversarially-verified** research. COF is deeply geopolitical (Nigeria S.A.R.C., China's CCP hero-machine, Uganda, Armenia/NuroNuro, cartels). This grounds the real-world texture so the world reads as credible instead of invented-feeling. Ask 2–3 scoping Qs first.

### 4. `playground` 🟢
Self-contained interactive HTML explorers. You already live here — `story-bible-explorer.html`, the Duplicate Manager. Best tool for "show me what I have": character/timeline/canon browsers, relationship maps, the year-card anthology view. Matches your dark-theme/Inter design standards out of the box.

---

## PRODUCE (visuals → video → the YouTube motion comic)

### 5. `seedance-animation` 🟡
You **explicitly named** Seedance 2.0/1.5 for the motion-comic play. Encodes the hard lesson — *on Seedance 2.0, actions land but timing wanders → direct the action, retime in post.* Image-to-video via fal (Directors Palette Shot Animator) or Replicate. Direct line to the YouTube revenue idea.

### 6. `directors-palette` 🟡
Your own platform. **Character sheets** (lock a consistent Rhaige Sapphire / Charles / Kaiser face across episodes), shot generation, animation, batch recipes. The visual backbone of any motion comic. Pairs with `shot-generation-pipeline` (batch scene images from a shot list) and `using-local-ideogram4` / `compound-engineering:gemini-imagegen` for stills.

### 7. Production tracking trio — `asset-inventory` + `documentary-timeline` + `production-dashboard` 🟢/🟡
Once we generate art per story/chapter, these **catalog what exists, map assets → chapters/scenes, and flag the gaps** — plus an interactive timeline browser. This is the media-asset version of the dedup cleanup we just did: it stops the chaos before it starts.

### 8. Audio→edit trio — `word-level-timestamps` + `timeline-assembly` + `aiobr-music-generation` 🟡
The back half of the pipeline that turns a story into a finished video: narrate → **word-level timestamps** (sync) → **assemble a DaVinci Resolve / FCP7 timeline** with stills + Seedance clips + score → **generate the instrumental** (Suno). This is also exactly the muscle for the "Sides & Sounds" audio-drama idea. (Your Ad Lab `generate-voice`/`generate-music` scripts cover the same ground if you'd rather stay there.)

---

## RUN IT AS A BUSINESS (the "make me rich" thesis)

### 9. `ship-pitch` + `ship-logos` / `ship-brand` 🟢
Make the universe-as-IP thesis concrete: an **investor/partner one-pager** for COF, plus **brand marks** for COF *and* the built-in Rhaige Sapphire fashion line (a real merch hook). Public-safe — never fabricates metrics. `ship-promo` is the bonus: a trailer/teaser plan (VO script + shotlist + storyboard) for launch.

### 10. `claude-md-improver` / `init` (+ `anthropic-skills:consolidate-memory`) 🟢
Quick structural win: **COF has no `CLAUDE.md`.** Every new session re-learns the golden rule, the two-layer trust model (originals vs AI-rewrite), and the file map from scratch. A good CLAUDE.md makes every future session start smart and protects canon. `consolidate-memory` keeps the auto-memory tidy as it grows.

---

## THE GAP → 2 custom skills worth building (via #2)
No installed skill handles **long-form fiction or canon continuity** (`doc-coauthoring` is for specs/proposals; `every-style-editor` is locked to a specific house style). That's the highest-value thing to *build*:

- **`cof-canon-check`** — given a draft, verify it against the bible: originals beat the AI-rewrite layer, flag contradictions (names, timeline, ransom amounts, spellings like Akrahuhum), and tag any invention `[PROPOSED]`. Encodes the golden rule as a repeatable pass.
- **`cof-sides-and-sounds`** — your own spec: prose story → master sheet (per-character line counts, one-liners, full SFX list) + per-character "sides." Feeds the narrated/audio-drama + video pipeline.

## Considered and skipped
`every-style-editor` (bound to *Every*'s house style, not fiction) · `doc-coauthoring` (docs, not prose — useful for the bible/pitch only) · `caption-images` (only if we train a character LoRA) · the ~120 scientific/dev/deploy/Rails skills (irrelevant to fiction).

## Recommended first move
Start free and high-leverage: **#10** (drop a `CLAUDE.md` in the repo so every session is smart) → **#2** (build `cof-canon-check`) → then pick one story and run the **#5/#6/#8** pipeline end-to-end on it as a proof of concept before scaling.
