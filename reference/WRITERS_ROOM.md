# THE COF WRITERS' ROOM — repeatable pipeline  `[process + run log]`

**Purpose:** turn the universe into coherent, long-form drafts **repeatably**, with continuity and one consistent voice held across many writers. Not eight writers in eight silos — a room that **drafts, comes together, reaches consensus, refines, and loops.**

## The house style (every writer holds to it)
Third-person **omniscient storyteller**, **narrative summary**, speech in **indirect / free-indirect discourse** — **no quotation marks, minimal direct quotes**, built to be read aloud. Country-true (lean on `canon/countries/Country Master Sheet - Country.csv` — real places, language, the live issue). Weave the **insight layer** (Crichton/Star Trek — explain a phenomenon plainly, varied, never a lecture). Best practices: strong concrete openings; re-anchor returning characters in a line; give weight to characters meeting; mark inventions `[PROPOSED]`. Source of truth: `bible/`.

## Roles
- **Showrunner / Outliner** — owns the spine (`prose/novel/00_OUTLINE.md`); the year-by-year map every writer follows.
- **Writers** — one per Part (Year); draft from the spine + bible, **write-only**.
- **Story Editor (the "coming together")** — reads **all Parts at once**, produces the **Continuity & Consensus Report** (`prose/novel/CONTINUITY_NOTES.md`): cross-part contradictions, recurring-character/thread continuity, the seams between Parts, voice/style drift, dropped/duplicated material, and a prioritized **fix-list per Part**.
- **Refiners** — one per Part; **apply** the report so each Part aligns with the whole (seams, consistency, voice). Parallel-safe (each edits its own file).
- **The Loop** — re-run the Story Editor after refining; repeat refine until the report comes back clean (or after N rounds).

## The repeatable run (phases)
0. **Spine** — write/refresh `00_OUTLINE.md`.
1. **Draft** — one Writer per Part, in parallel (write-only).
2. **Assemble** — commit the drafts.
3. **Consensus pass** — Story Editor → `CONTINUITY_NOTES.md`.
4. **Refine** — one Refiner per Part, in parallel, applies the notes.
5. **Loop** — re-run Phase 3; if clean → ship; else back to Phase 4.

*(This is built to become a `/cof-writers-room` skill so it's one command. For now it's run by dispatching the role-agents per phase.)*

## RUN LOG
- **Run #1 — 2026-06-27 — Full first draft.**
  - Phase 0: `00_OUTLINE.md` (8-year spine). ✅
  - Phase 1: 8 Writers drafted `YEAR_1`–`YEAR_8` (~38k words, ~4+ hrs). ✅ (Year 5 expanded in a follow-up.)
  - Phase 2: committed + pushed. ✅
  - Phase 3: Consensus pass #1 → `CONTINUITY_NOTES.md`. ✅ (substantially coherent; 2 HIGH issues + per-Part fix-lists found; no canon-contamination leaked in.)
  - Phase 4: Refine #1 — all 8 Parts refined to consensus. ✅ Fixed: Y6 "FIST→SPEAR" (SPEAR never created); Y7 crash-year math (crash = Year 4); de-duped Liu/Zhang Wei (full in Y2, referenced in Y6); closed orphaned threads (Jawah's coup, Stefanos's-face refusal, Memory-Vessel scaling cost, Asha's cost); seeded the Y7→Y8 rift-scar → Xanthi payoff; harmonized the narrator; strengthened the seams; confirmed **no quotation marks** in any Part. Year 5 expanded to ~7,300 words.
  - Phase 5: re-check loop — **available to re-run** (a 2nd consensus round any time; the process is repeatable — this is the value of the room).
  - **Open creator rulings surfaced** (in `CONTINUITY_NOTES.md`): the Andrews/Miami "Tragedy at Andrews" location; whether the Sage "college-course source" reveal should stay hidden in Y2; the italic-emphasis-for-mottoes device.
