# THE PASSPORT — Foundation of the COF Game Multiverse
**Status: `[PROPOSED]` — nothing here is canon until the creator blesses it.**
**Written 2026-07-27 from a full read of all four repos. Per the Golden Rule: conflicts are FLAGGED, never silently resolved. Every invention is marked.**

---

## 0. Why this document exists

Robert's direction (2026-07-27, verbatim intent): one game universe where a character travels between games — a controlled character from an RTS into a third-person shooter, an FPS character into a top-down squad game — via **the Passport**. Cross-play across platforms, where *how you enter the world determines what you can do there* (the VR player can put their hand on the relic dial; the keyboard player cannot). Built on Consequences of Failure. Goal: get the LAW right first, then hire developers onto the foundation.

This document is that foundation: the map of what exists, the universe structure, the naming stack, the Passport doctrine, the name-unification plan, and — most importantly — **the numbered decision list** (§11) of every ruling only the creator can make.

---

## 1. The map of record — what actually exists

| Repo | What it is | State |
|---|---|---|
| `D:\git\COF` | **CONSEQUENCES OF FAILURE** — the story root. Canon, bible, 168-country Master Sheet, ~1,069-city sheet, ~110-character roster, CPI power system, SPEAR console. | The source of truth. "COF: Story Detail Root." |
| `D:\git\ShootEM` | **WAR WORLD: EARTH** — the top-down squad military shooter (Infantry Online homage). GONET laptop, print/clone blood economy, 40 LSW "gods," United Front vs Collective, 991 commits. Already has `docs/LORE-COF-INTEGRATION.md` (the marriage doc) and auto-generates its nations from the COF Country Master Sheet. | Live. The military game. |
| `D:\lsw` | **WAR WORLD: ASCENDANTS** (in-world name: **THRESHOLD**) — the superhero arena/action game. 52 fighters, ORIGIN character creator, LeFevre Threat Scale, The Choir, 240 commits. Contains `docs/MULTIVERSE.md` — a 1,014-line Passport architecture spec — and `docs/RULINGS_0727.md`. **POWERWORLD** is a mode inside this repo (the open dimension — flight, no witnesses). | Live. The powers game. |
| `D:\git\WarWorld` | A separate, abandoned 42-commit prototype (Aegis vs Rift, dead since 2026-07-14). Shares the "War World" name but has zero COF content. | **Dead. Recommend archiving** (Decision #10). |

The "three games" of the triangle are therefore: **War World: Earth** (military), **Ascendants/THRESHOLD** (powers), and **POWERWORLD** (the open dimension — today a mode, potentially the VR surface). `D:\lsw\docs\MULTIVERSE.md:8-13` already maps exactly this.

**Mechanical crossovers that already exist:**
- `ShootEM/tools/gen-nations.mjs` reads `D:/git/COF/canon/countries/*.csv` → `src/data/nations.ts` ("AUTO-GENERATED from the Consequences of Failure Country Master Sheet"). The only live data pipeline.
- Both games carry the same 168 nations / ~1,050 real cities derived from the COF sheets.
- `ShootEM/docs/LORE-COF-INTEGRATION.md` — the LSW rename table (in-game gods → COF canon characters) + 15 hard canon laws.
- `D:\lsw\docs\MULTIVERSE.md` — the Passport contract design: a small third repo (`cof-passport`), plain JSON, neither game owns it; each engine has a **PROJECTION** layer that turns Passport attributes into that engine's numbers; a **Ledger** records what happened to every traveler.

---

## 2. The universe structure `[PROPOSED — formalizing Robert's 2026-07-27 direction]`

**One universe. Multiple timelines. The story is the root.**

```
CONSEQUENCES OF FAILURE  (the universe — all of it)
│
├── THE ROOT TIMELINE — the story (D:\git\COF)
│   Near-modern Earth. The Greys select ~1,000 of sound mind via Its Voice.
│   The Living Super Weapon Threshold Treaty. The Alliance of Four counts down.
│   The anthology, the novels, the screen package. CANON LIVES HERE.
│
│   └── THE ASCEND — War World: Ascendants / THRESHOLD (D:\lsw)
│       "Kinda like the COF story itself" (Robert). The treaty era of the
│       root timeline seen from the street: registered Ascendants, the
│       LeFevre scale, KMK 9 cameras, two blocs (United Front 88 nations /
│       Collective 80). Whether this IS the root present or sits a half-step
│       parallel is Decision #3.
│
├── THE WAR TIMELINE — War World: Earth (D:\git\ShootEM)
│   The alternate timeline. Year 2222; the aliens arrive in 8 years (2230).
│   The warning was squandered differently: powers landed UNSORTED, nations
│   answered with registration (United Front) or harvest (the Collective),
│   and death became a printer queue. ShootEM's own THE-LORE.md already
│   titles itself "CONSEQUENCES OF FAILURE — the alternate timeline."
│
└── POWERWORLD — the open dimension (mode inside D:\lsw)
    What it actually IS in-fiction is unwritten — that's Decision #9 (§8).
```

**The cross-play catch, kept:** when a character crosses timelines they are **still themselves** — same person, same record, same injuries. Crossing changes what the world lets them do, not who they are. (Already ruled in `D:\lsw\docs\RULINGS_0727.md`: no tone-down, everything permanent, "crossing over is a gamble, not a transfer.")

**Canon mechanisms this stands on (all already in COF):**
1. **The Xanthi lock rule** (`bible/factions/THE_ALLIANCE_OF_FOUR.md:57-62`): space never holds still; a "location" is a constantly-moving coordinate; **no anchor, no door**. → *A Passport is an anchor.* This is also the insight-layer teaching moment (the teleportation-is-a-moving-coordinate fact from CLAUDE.md, made load-bearing).
2. **The 4-power rift recipe** (`canon/countries/COUNTRIES, SEASONS & AI.txt:535`, creator original, currently uncatalogued in the bible): telekinesis + telepathy + pyrokinesis + cryokinesis used together tear a rift "to different dimensions or even alternate universes." → *The event that first connected the timelines.* Surfacing this is a genuine find — it is the creator's own multiverse mechanism, already written.
3. **The Otherworld precedent** (`bible/factions/THE_OTHERWORLD.md`): a canonical parallel Earth (different presidents, different countries, no powers) that LSWs walk into. The universe already accepts world-to-world travel.

---

## 3. The naming stack `[DECISIONS #1, #2 — the overarching name]`

What exists today, verbatim:
- COF ruled: universe = **"Consequences of Failure"**; **"Superhero Tactics"** reserved for the video-game version (`bible/CANON_STATUS.md`).
- ShootEM banner: **WAR WORLD: EARTH** ("War World: Earth — settled," `docs/ORDERS-2026-07-22.md:21`).
- D:\lsw banner: **WAR WORLD: ASCENDANTS**, in-world game name **THRESHOLD**, repo legacy "LIVING SUPERWEAPON" — flagged internally as a defect ("Pick the banner," `docs/CODE_REVIEW_2026-07-24.md:89-91`).
- The three-name law (`ShootEM/docs/THE-LORE.md:19-31`, already locked there): **LSW** = what governments/war offices say · **ASCENDANT** = what everyone else says · **THE BLOOD** = what the Jackals/printers say. "The name tells you who's talking."
- `D:\lsw\docs\MULTIVERSE.md:738`: "**EACH SHIPS AS ITS OWN GAME.** No umbrella product… The Passport is the quiet thing connecting them — a feature, not a storefront."

**Option A (recommended): WAR WORLD is the games wing; COF stays the universe.**
- Universe (all media): **CONSEQUENCES OF FAILURE**
- The games wing / family brand: **WAR WORLD** → *War World: Earth*, *War World: Ascendants*, and future titles (*War World: ___*)
- The cross-game system (the feature players say out loud): **THE PASSPORT**
- "Superhero Tactics" is retired or reassigned to a future tactics title (Decision #2)
- Why: both live games already wear the WAR WORLD banner; MULTIVERSE.md's "no umbrella product" ruling is preserved; "a War World game" becomes the shelf term while COF remains the fiction's name — the Marvel/MCU split.

**Option B: LIVING SUPER WEAPONS as the umbrella brand.**
- The wing brands as **LSW** (*LSW: War World*, *LSW: Ascendants*); matches the treaty language and Robert's "what we call the living super weapons."
- Cost: renames both shipped banners; "LSW" is the *government's* word in the three-name law, which makes the brand speak in the coldest register.

**Option C: THRESHOLD as the umbrella.**
- The Threshold Treaty exists in every timeline; "crossing a threshold" IS the Passport; D:\lsw already uses it in-world.
- Cost: collides with the ruling that THRESHOLD is the *diegetic* game name inside Ascendants; weakest shelf recognition.

---

## 4. The Passport — the law layer `[PROPOSED]`

**The contract (engineering — already spec'd, adopt as-is):** per `D:\lsw\docs\MULTIVERSE.md` — a small standalone repo (`cof-passport`), plain JSON, no imports from either game; each engine ships a PROJECTION that maps Passport attributes into its own numbers; the PROJECTION lives with the engine, never with the Passport; a **Ledger** records every crossing and its consequences. "You cannot verify a contract between two games from inside either one of them" (`docs/THE_AGENDA.md:15`) — the shared harness is item zero.

**The in-fiction mechanism:**
- A Passport is a **personal anchor** — a solved lock (in the Xanthi sense) on one person across timelines. It does not move your body; it projects *the record of you* into the destination and builds presence there.
- The first rift between the timelines was opened by the 4-power recipe (§2.2). Who opened it, when, and at what cost = Decision #6.
- **The Ledger is kept by Its Voice** `[PROPOSED — strong hook, needs blessing]`: a sentient data-lifeform for whom every networked camera is an eye is the one canon entity that could plausibly witness every crossing in every timeline. This gives the Passport's bookkeeping a face — and a motive question (CANON_STATUS already flags "Is Its Voice loyal to the Greys or its own ends?" as open; the Ledger raises those stakes).

**Rulings already made in `D:\lsw\docs\RULINGS_0727.md` (2026-07-27) — carried forward as law:**
1. An Ascendant does **not** tone down in War World.
2. **Everything is permanent.** Injuries, deaths, reputation cross back with you.
3. **The risk is the mechanic.** "You send someone to the future, you do not know what comes back. Crossing over is a gamble, not a transfer."

---

## 5. The Law of Presence — platform asymmetry as lore `[PROPOSED — Robert's VR doctrine, formalized]`

Robert's direction: a VR player can put a hand on the relic dial and open the sealed door; the desktop player fighting beside them cannot — and the game is built so they *need each other*.

**The law:** the Passport projects you into a timeline at a **grade of presence** determined by your anchor — and your anchor is your platform. Presence is diegetic. Nobody in-world says "VR"; they say *how deep you crossed*.

| Grade | Platform (out-of-world) | What the fiction says you are | What only you can do |
|---|---|---|---|
| **FULL PRESENCE** | VR | You crossed whole — hands and all | Touch relics, turn dials, open sealed doors, physical ritual |
| **EMBODIED** | Desktop / console (first- or third-person) | You crossed as a fighting body | Full combat kit, vehicles, the front line |
| **PROJECTED** | Top-down / RTS / tablet | You crossed as an eye and a voice | See the whole field, command many, coordinate — touch nothing |
| **ECHO** `[optional tier]` | Mobile / second-screen | You barely crossed — a whisper | Intel, GONET access, sabotage-at-a-distance |

- **Design law:** flagship content requires **mixed grades** — the relic door needs a Full-Presence hand *while* Embodied fighters hold the room *while* a Projected commander walks them through the patrol gaps. Cross-play asymmetry stops being a compromise and becomes the fantasy.
- **The insight layer earns it:** the anchor/lock rule explains WHY grades exist — a stronger anchor solves more of the moving-coordinate equation, so more of you arrives. One line of dialogue covers it; never a lecture.

---

## 6. Name unification — countries, cities, characters `[PLAN — Decisions #7, #8]`

**The pipeline law `[PROPOSED]`:** *COF owns the sheets. Games consume, never fork.*
1. `canon/countries/Country Master Sheet - Country.csv` (168 nations) and `- Cities.csv` (~1,069 cities) are the single source. Both games already derive from them — keep it one-way: regenerate, never hand-edit downstream (ShootEM's `nations.ts` header already says exactly this).
2. Games may **propose back** — new columns, HVT values, City Bonus data — via `[PROPOSED]` PRs against the COF sheets. The Cities CSV was *born* as a game sheet: `Sector` grid codes, `HVT`, `CrimeIndex/SafetyIndex`, and empty `FROM/TO/VILLAGE/City Bonus` columns are sitting there waiting for War World to fill them.
3. Known data bugs any consumer must respect: the **Congo label-swap** (join by population, as SPEAR does); the dirty `Cloning`/`LSWActivity` columns (categorical/numeric mix — needs one cleanup pass, in COF, once).
4. Vocabulary law: in COF docs, "cross-universe" already means *cross-story within COF* (Shooters Club, Cuatro Dedos). The games use **cross-timeline** / **the Passport** — never "cross-universe" — to avoid aliasing.

**Fictional-name policy `[PROPOSED]`:** real cities anchor identity; fictional names are *military codenames*. "Iron Meridian," "Fort Raven," "Blacksite" stay — as operation names *pinned to real sectors* from the Cities CSV (the enlistment law already reads: "THE COUNTRY DECIDES WHAT YOUR ARMY IS. THE CITY DECIDES WHAT YOU ARE"). Miami Gardens 33056 / Civic Front is the model: a real place, a codename front.

**The character rename table** (`ShootEM/docs/LORE-COF-INTEGRATION.md:166-198`): in-game gods → COF canon (oblivion→Stampede/John Rivers, reactor→Liu Xiao, chronos→Asha, pulse→Jawah Matu, inferno→King Stefanos, venatrix→Sandra…). It is thorough and it is **unblessed**. Decision #8 = bless it as a batch, with any per-row vetoes.

**Collision registry (watch list, not bugs):** SPECTER (ShootEM LSW + D:\lsw synthezoid), TITAN (LSW + vehicle + D:\lsw war engine), "Sun of the Soil" (Johnny Rain) vs "Son of the Soil" (Kaiser) — already an open COF ruling. Dead-repo collisions (Bastion, Meridian, Ridgeline in `D:\git\WarWorld`) dissolve if Decision #10 (archive) is taken.

**Cross-repo contradictions found in this read (FLAGGED, not resolved):**
- **Jawah Matu's homeland:** COF canon + ShootEM's rename table say **Tanzania**; `D:\lsw\src\data\identities.js` says **Nairobi, Kenya**. Canon says Tanzania — D:\lsw needs the fix, pending ruling confirmation.
- **The Hand of Uganda trio scattered:** canon (and ShootEM) make ABEO / JELANI / KAMARIA Uganda's government LSW bodyguards; `D:\lsw\identities.js` gives them Lagos (Nigeria), Dar es Salaam (Tanzania), and Mombasa (Kenya). Either D:\lsw re-homes them to Uganda, or canon rules they were *recruited from abroad* into Uganda's service — creator's call, but the current state contradicts.

---

## 7. The divergence point — what split the War Timeline `[PROPOSED — Decision #5]`

The two LSW origin stories currently in print **contradict**, and ShootEM's repo knows it:
- **Root timeline (COF canon):** the Greys select ~1,000 people *of sound mind* via Its Voice — curated, no supervillains, "they turn people INTO weapons."
- **War Timeline (`ShootEM/docs/THE-LORE.md:41-48`):** "The Great Aliens altered human DNA — not as an invasion, as a *survey*… no power was chosen, and none of them were meant for war."

**Option A (recommended): THE SORTING IS THE FORK.** In the root timeline, Its Voice sorted — 1,000 sound minds, hand-picked. In the War Timeline, the survey landed **unsorted** — powers fell on the just and the unjust — and *humanity did the sorting itself*: registration on one side, harvest on the other. THE-LORE's five movements (THE SURVEY → THE SORTING → THE HARVEST → THE FACTORIES → THE WAR) already read as exactly this. One decision by the Greys — curate, or only survey — forks the whole universe. No new lore needed; we just name what both repos already wrote.

**Option B: THE TREATY IS THE FORK.** Same selection, but the Threshold Treaty never passes; the blood economy fills the legal vacuum.

**Option C: ZHANG WEI IS THE FORK.** The past-traveler (canonically one of exactly two) changed something. Elegant — a named face on the divergence — but it spends one of canon's most protected assets; heavy ruling.

**The calendar conflict rides on this** (Decision #4): COF is near-modern; War World says 2222/2230. ShootEM's own law #14: the **8-year clock is the invariant, not the year** — "never print a COF character next to a hard in-game date." Options: (a) keep 2222 as honest timeline drift (alternate timelines need not share a calendar), (b) re-anchor War World to near-modern, (c) dates become diegetic-only (the world shows D271-style day counters, never years). (a)+(c) combined is the cheapest and already half-shipped (GONET shows "D271 · 00:25").

---

## 8. POWERWORLD — the missing lore `[PROPOSED — Decision #9]`

Robert: "I have some lore for War World, not Power World." Today POWERWORLD is a mode in D:\lsw: the open dimension — flight, no witnesses.

**Option A (recommended): the rift-space between timelines.** POWERWORLD is what the 4-power rift opens into — the space the Passport transits. Flight and no witnesses because it is *between* worlds: no natives, no cameras, no treaty. Danger: the Xanthi can cast their perception through apertures — in POWERWORLD, *something can always see you*. This makes POWERWORLD load-bearing three ways (the game mode + the Passport's transit lore + a Xanthi threat vector), per the ≥2-uses law.

**Option B: the Greys' proving ground.** The dimension where Its Voice evaluated candidates before selection — a testing space where powers run unbound. Ties to the deep-time spine; slightly contradicts "no witnesses" (the evaluator is a witness).

**Option C: the Otherworld's far side.** Attach POWERWORLD to the canonical parallel Earth. Weakest fit — the Otherworld is defined by *powerlessness*.

---

## 9. The clone reconciliation — the Jackals as connective tissue `[PROPOSED]`

These two systems look like a conflict and are actually a handshake:
- **COF law** (`bible/factions/THE_OTHERWORLD.md:28`): "you cannot clone without aging the clone… the cream is the breakthrough that closes that gap." Cissy Oliva cracked cloning *only* via the Jackals' aging/de-aging cream.
- **War Timeline** (`ShootEM/docs/THE-LORE.md:70-90`): Ascendant blood **prints** bodies and **accelerates** growth — "a printed body brought to adult in months instead of decades."

Same physics, same insight, same rule honored: *growth cannot be skipped, only accelerated.* The blood is the print medium; the acceleration principle is the cream's lineage. **The Jackals sit at the center of both timelines** — hunters and cream-owners in the root, the blood economy in the war — and Sandra ("the First Jackal," an Its Voice node) already appears in all three repos. The Jackals are the multiverse's first cross-timeline faction, and they didn't need inventing.

---

## 10. Promotion — the thesis, ready to say out loud

The pitch paragraph already exists (`D:\lsw\docs\THE_BRIEFING.md:141-148`): *one universe that runs on more than one engine, where the same person can exist in a military shooter and in a superhero game and be recognisably themselves, carrying their injuries, their reputation and eventually a cosmic designation between them.*

Tagline candidates `[PROPOSED — pick or discard]`:
- **"One universe. Every engine."**
- **"Your character doesn't belong to a game. The game borrows them."**
- **"Crossing over is a gamble, not a transfer."** (already a ruling — the honest one)

---

## 11. THE DECISION LIST — rulings only the creator can make

| # | Decision | Options | Recommendation |
|---|---|---|---|
| 1 | **The overarching name** | A: WAR WORLD wing under COF universe · B: LSW umbrella · C: THRESHOLD umbrella | **A** |
| 2 | **"Superhero Tactics"** (reserved name) | Retire · reassign to a future tactics title · keep as Ascendants' real title | Retire or hold for a true tactics game |
| 3 | **Where Ascendants sits** | IS the root timeline's present · a half-step parallel of it | Root present (Robert: "kinda like COF story itself") |
| 4 | **The calendar** | 2222 stands as timeline drift · re-anchor near-modern · diegetic dates only | Drift + diegetic-only display |
| 5 | **The divergence point** | A: The Sorting failed · B: The treaty failed · C: Zhang Wei | **A** |
| 6 | **Who opened the first rift** (4-power recipe) | Named character(s)? When? Cost? | Creator's call — this is an origin story worth authoring, not defaulting |
| 7 | **Pipeline law** (COF owns sheets; games propose back; Congo/Cloning cleanup pass) | Bless / amend | Bless |
| 8 | **The LSW rename table** (ShootEM gods → COF characters, ~22 rows) | Bless as batch, with per-row vetoes | Bless with review of `eclipse→Lonbraj`, `stormcaller→unnamed Kyrgyz` (both thin) |
| 9 | **POWERWORLD lore** | A: rift-space between timelines · B: Greys' proving ground · C: Otherworld far side | **A** |
| 10 | **`D:\git\WarWorld` (dead prototype)** | Archive it (rename repo, e.g. `warworld-proto-archive`) · leave it | Archive — it squats on the wing's brand name |
| 11 | **The Ledger = Its Voice** | Bless · keep the Ledger authorless | Bless — it gives the Passport a face and feeds an existing open question |
| 12 | **The Law of Presence grades** (§5) | Bless the 3–4 grade names/verbs | Bless; grade names can be renamed later without breaking the law |
| 13 | **The three-name law goes universe-wide** (LSW/Ascendant/the blood) | Bless — it's currently a ShootEM-local law | Bless; it already matches the treaty language |

---

## 12. After the blessing (not before — hard gate)

1. Capture rulings in `bible/CANON_STATUS.md` + a new `bible/THE_PASSPORT.md` (canon layer of §2–§5).
2. Catalog the 4-power rift recipe into `bible/powers/POWER_SYSTEM.md` (it is currently uncatalogued creator-original material).
3. Hand off per-repo work via the Switchboard: ShootEM (LORE-COF-INTEGRATION updates, stale README fix — it still describes Potrero Hill instead of the shipped Miami Gardens map), D:\lsw (banner cleanup per its own code review, **scrub the Goku/Vegeta/Green Lantern derivation notes from README before any promotion** — flagged in ShootEM's business plan as a legal risk).
4. Stand up the `cof-passport` contract repo per MULTIVERSE.md (small, JSON, neither game owns it).
5. Country/city sheet cleanup pass (Congo, Cloning/LSWActivity columns) in COF, then regenerate both games' data.

*Nothing in this section happens until the decisions in §11 are made.*
