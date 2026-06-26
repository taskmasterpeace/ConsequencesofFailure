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

## Write the country, not a backdrop
Every story set in a country must make a reader *from* there feel seen — that audience is the goal, not set dressing. **Consult the Country Master Sheet (`canon/countries/Country Master Sheet - Country.csv`) before writing any country; treat it as canon.** Anchor to its facts: the real **President**, `GovernmentStructureType`, `GovernmentPreception`, `GovermentCorruption`, `Motto`, `Nationalities`. Then layer lived texture — real **place names**, **language** (lean on the local tongue — Swahili *Kuruka*, *Mwangaza*), food, music, faith, social rhythm — and the **actual live issue** (Tanzania's albinism persecution + the Uganda seaport war; Nigeria's S.A.R.C./Akrahuhum). No tourist-brochure detail, no stereotype. Specificity earns the reader.

## The insight layer (the Crichton / Star Trek move)
Weave in real, *accurate* "how this actually works" insight — the way Crichton teaches you something mid-thriller, or Star Trek explains its tech in passing. Valid kinds: hard contact-science (*teleportation is really solving a constantly-moving coordinate — Earth spins, orbits the sun, the sun drifts through the galaxy*), how an ecosystem or system works, an unknown fact about an everyday thing, or the in-world logic of a power (Jawah's sound-absorption through exposed skin; the Memory Vessel's cost scaling with how wide it opens). HARD limits: **woven into the scene, never a lecture. Short. Varied** — change both the *kind* of insight and the delivery; never the same move twice running. It illuminates; it never stalls the story.

## Rotating-cliffhanger structure
The anthology rotates. Take one thread to a cliffhanger, **cut** to a different story in a different country, take *that* to a hook, cut again — then circle back. Multiple threads always turning at once. Each story still **stands alone** (the standalone-stories model holds), but each hands off on a hook that pulls to the next and earns the return trip — standalone craft, serialized momentum.

## Repo map
- `canon/` — creator originals (trust) + the AI-rewrite layer (verify). Includes `canon/countries/` (the master sheets) and `canon/characters/`.
- `bible/` — the consolidated source of truth (status, roster, per-character notes, vision, factions, powers).
- `prose/` — the actual stories.
- `reference/` — working docs, backlogs, research, the skills toolkits.
- `archive/` — old drafts. **Don't trust and don't edit** (preserved history).

## Git / workflow
- Commit clean, focused messages. **No "Co-Authored-By" lines** (creator preference).
- Remote: `taskmasterpeace/ConsequencesofFailure`. Push when asked / before closing out.
- When canon changes, update the relevant `bible/` file in the same pass.
