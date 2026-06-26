# CLAUDE.md — Consequences of Failure (COF)

Standing instructions for every session in this repo. Read this first.

## What this is
**Consequences of Failure** is a geopolitical alien-superhero **fiction universe** — a storytelling project, not software. The goal is to **finish standalone stories** in a shared world and build it toward a global, multi-language, community universe. Full direction: `bible/VISION_AND_GOALS.md`.

**We tell stories first.** Do NOT default to generating images/art — the focus is the writing. Transmedia (audio, motion comic) is a back-end step for *finished* stories.

## The Golden Rule (canon)
**Creator originals + the creator's word beat the AI-rewrite layer.** When they conflict, the original wins, and you **flag the conflict — never silently resolve it.** Anything you invent to fill a gap is marked `[PROPOSED]` until the creator blesses it.

**Two layers:**
- **TRUST — originals:** lowercase / natural-name files in `canon/` (e.g. `Stampede.txt`, `Eziobi.txt`, `Jawah Matu .txt`, `Episode 0.txt`, `COF Notes.txt`, `Deck 52 Rachel Maddow_.txt`).
- **VERIFY — AI-rewrite layer:** ALL-CAPS `.md` (`COF_MASTER_CHARACTER_DATABASE.md`, `BATCH_*`, `NOVEL_PART_*`, `CHARACTER_*.md`, `*_ENHANCED/_SUMMARY`). A prior automated pass reworded and sometimes *reinvented* things here. Cross-check against originals before trusting.

## Always consult these before writing canon
- `bible/CANON_STATUS.md` — ground-truth map + open rulings.
- `bible/CHARACTER_ROSTER.md` — the cast of record (~110–115 characters).
- `bible/characters/*` — locked per-character notes.
- `bible/VISION_AND_GOALS.md` — the north star + power-system principles.
- `canon/countries/Country Master Sheet - Country.csv` — the geopolitical spine (170+ countries, presidents, quantified stats). **Canonical.**

## Working principles
- **No plot armor.** Powers are quantified and scaled — outcomes follow the numbers, not convenience. Make it clear who beats whom. (See `bible/VISION_AND_GOALS.md` §4.)
- **Flag, don't resolve.** Surface contradictions for a creator ruling; capture rulings in the bible immediately.
- **Characters are real individuals** — keep their quirks; don't flatten them into generic hero types (this is how the rewrite layer went wrong).
- **Mark inventions `[PROPOSED]`.**

## Repo map
- `canon/` — creator originals (trust) + the AI-rewrite layer (verify). Includes `canon/countries/` (the master sheets) and `canon/characters/`.
- `bible/` — the consolidated source of truth (status, roster, per-character notes, vision, factions, powers).
- `prose/` — the actual stories.
- `reference/` — working docs, backlogs, research, the skills toolkits.
- `archive/` — old drafts. **Don't trust and don't edit** (preserved history).

## Locked canon
The locked rulings are now applied **consistently across the files**, so they no longer need to be re-listed here. The source of truth is **`bible/CANON_STATUS.md`** (rulings + open items) and **`bible/CHARACTER_ROSTER.md`** (every character, aliases merged, conflicts flagged), with per-character notes in **`bible/characters/`**. **Consult those before writing about any character — don't re-derive facts from the AI-rewrite layer.**

## Git / workflow
- Commit clean, focused messages. **No "Co-Authored-By" lines** (creator preference).
- Remote: `taskmasterpeace/ConsequencesofFailure`. Push when asked / before closing out.
- When canon changes, update the relevant `bible/` file in the same pass.
