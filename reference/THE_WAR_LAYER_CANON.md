# THE WAR LAYER — Audit & Canonicalization Plan
**Status: `[PROPOSED]` — nothing here is canon until the creator blesses it.**
**Written 2026-09-22 from a full read of D:\git\ShootEM, D:\lsw, and D:\git\COF. Per the Golden Rule: conflicts are FLAGGED, never silently resolved. Every invention is marked.**

> Scope answered up front (Robert, 2026-09-22): **whole-ecosystem audit → canonize the war-layer data into COF's sheets as the source of truth → deliver findings + a concrete migration plan.** This is the sibling of `THE_PASSPORT_FOUNDATION.md` (which governs the *nation/character* pipeline); this document governs the *war/military* data.

---

## 0. The finding, in one screen

**Your memory was half right, and the half that's wrong is the good news.**

- The war layer you remember — "the value of the tanks, how much stuff costed, simulate a war… all the artillery, the soldiers" — **is real and it is LIVE**, but it lives in **`D:\git\ShootEM` (WAR WORLD: EARTH)**, not in the superhero repo you're standing in. It is one of the deepest systems in that repo: a deterministic force-on-force sim, priced units, national budgets, 7 fronts, six wired command screens, ~40 passing tests. **It is not outdated.**
- The "war thing we were struggling with / didn't have enough" is the **`D:\lsw` (Ascendants) side**, where there is **no war sim at all** — only a reverse-engineering dossier of the 1999 game *Infantry Online* (`docs/infantry/`, where the tank/artillery *prices* you remember actually live, as a **study of a dead game**), a PMC economy that prices *people* not tanks (`src/data/org.js`), and a stack of **unbuilt** proposals (Godfall / combined-arms / persistent-world-war).
- **COF holds zero war-layer numbers today.** The Country sheet's military columns are **0–90 abstract ratings, not currencies or unit counts.** There is no unit, no cost, no force-structure data anywhere in COF.

**The recommendation (detail in §5–§6):** canonicalize in **two moves, not one**, because the war layer is two different shapes of data:

1. **Per-nation war data is already sheet-driven** — `deriveWarProfile()` computes every nation's war budget, division count, equipment tier and print capacity *purely from existing Country-sheet columns*. This half needs **guarantee + cleanup**, not new data.
2. **The global catalog** (unit costs, the 20 buyable hulls, build times, combat stats) is hard-coded TypeScript and is **net-new to COF**. It does **not** belong in the Country or City sheet — it belongs in a **new canonical "War Catalog" sheet** that COF owns and both games consume.

**Hard gate (§7):** before any price is canonized, three things must be settled by Robert — (a) which price set is canon (the shipped catalog is **8–12× cheaper** than the design-doc anchors), (b) where the catalog lives, and (c) the 7 still-open pricing questions. Canonizing the *wrong* numbers into the source of truth is worse than leaving them in code.

---

## 1. The map of record — where the war layer actually lives

| Repo | Its war content | Verdict |
|---|---|---|
| **`D:\git\ShootEM`** — WAR WORLD: EARTH | The real war layer. `src/sim/war/` (~28 files): `model.ts` resolver, `nation-war.ts` derivation, 7 fronts, war chest, campaign, LSW war. `src/data/procurement-catalog.ts` (priced hulls), `commissioning-catalog.ts` (build times). Six GONET command screens. ~40 tests. | **LIVE. This is the war layer.** |
| **`D:\lsw`** — WAR WORLD: ASCENDANTS / THRESHOLD *(this worktree)* | **No war sim.** `docs/infantry/` = Infantry Online cost dossier (design reference, never built). `src/data/org.js` = PMC economy pricing people. `src/data/countries.js` = `milBudget`/`milService` 0–100 indices only. Unbuilt: `docs/reports/2026-09-10-combined-arms-gap-audit.md` ("Godfall"), `docs/superpowers/plans/2026-09-08-military-vehicles-brief.md`, IDEA_BOARD #46 "persistent world war." | **Design + proposals, no sim. Downstream consumer, not a source.** |
| **`D:\git\COF`** — CONSEQUENCES OF FAILURE | The sheets. `canon/countries/Country Master Sheet - Country.csv` (168 nations, 35 cols) + `- Cities.csv` (1,069 cities). Military = **0–90 ratings**, no units/costs. Faction blocs are *fiction* here; membership is authored game-side. Contract: `reference/THE_PASSPORT_FOUNDATION.md` §6 — "COF owns the sheets; games consume, never fork." | **Source of truth for nations. Holds no war-layer numbers yet.** |

The war layer is therefore **fragmented**: a live engine in ShootEM, a dead-game study + unbuilt dreams in lsw, and an empty-but-correctly-shaped receptacle in COF. Canonicalization is the act of making COF the single upstream for all of it.

---

## 2. The war layer dissected — LIVE / PARKED / OUTDATED / UNBUILT

**LIVE and tested (ShootEM):**
- **Force-on-force resolver** — `src/sim/war/model.ts`. Formations Squad/Company/Division (`FORMATION_SIZE` 10 / 120 / 3000 prints; `FORMATION_PACE` road/rough km/hr). `resolveEngagement`, casualties, retreat, city capture. Combined-arms coefficients `ARMOR_COEF=[12,7,3]`, `AIR_COEF=[8,5,3]`, `LSW_STRENGTH_MULT=1.6`.
- **Unit material costs** — `UNIT_COSTS` (`model.ts`): print, rifle, ammo_load, transport, tank, aircraft, missile — each `{feedstock?, industrial?, electronics?, energy?, time}`. **No money field; materials + build-hours only.** `formationCost()` composes them (a tier-3 division = 30,000 feedstock / 5,000 industrial / 500 electronics / 15,150 energy / 24 h).
- **Priced procurement** — `src/data/procurement-catalog.ts` (rev **`robert-1`**): 20 buyable hulls, `{itemId, kind, procurementCost, crewRequirement, prerequisites[]}`. Kestrel Gunship 450 → Carrier 9,000. Every `itemId` maps 1:1 to a real vehicle in `src/sim/data.ts`.
- **National war economy** — `src/sim/war/nation-war.ts` `deriveWarProfile()`: `budgetPerDay`, `divisions = floor(military/20)`, `equipmentTier` (from science + gdpPerCapita), `printCapacityPerDay` (from population + cloning), etc. **Reads only Country-sheet columns.**
- **Player command** — six GONET screens (COMMAND · WATCH · DROP-IN · SUPPORT), wired (`war-command-loop-runlog.md` → `DOORS-WIRED`).

**PARKED on purpose (ShootEM, documented):**
- Daily-upkeep economy — `procurement.ts` says verbatim `buildPurchaseIntents`/`payUpkeep` are *"left unwired on purpose, not forgotten"* (the CLONE LAW: no rent on a clone → every catalog row is buy-once, `operatingCostPerDay` absent).
- Strategic national AI, and human-vs-human multiplayer command.

**OUTDATED / UNRECONCILED (the real audit flags):**
- **Two contradictory price sets.** Shipped catalog (`robert-1`): strike jet **1,100**, attack sub **3,600**. Design doc `docs/PROCUREMENT-COSTS.md §3.2`: strike jet **9,000**, attack sub **45,000** — **~8–12× higher.** Not reconciled. *One of these is canon; picking wrong poisons the source of truth.*
- **Stale budget formula in the doc.** `PROCUREMENT-COSTS.md §1.1/§3` still uses the old `economy = gdp × √population / 100`. Live code (`nation-war.ts`, 2026-08-04) uses `gdp^1.6 · pop^0.3 · automation / 36`. Every affordability ladder in that doc is computed on the dead formula.
- **Three live currencies, unnamed.** (1) budget units (`budgetPerDay` / `procurementCost`), (2) `UNIT_COSTS` materials (feedstock/industrial/electronics/energy + time), (3) requisition-scale vehicle `cost` (1–6, the war-ledger worth of a hull). Plus personal wallet + program budgets. `PROCUREMENT-COSTS.md §5` asks Robert to name and scale these.

**UNBUILT (lsw proposals — reconcile, don't fork):**
- `docs/reports/2026-09-10-combined-arms-gap-audit.md` — the "Godfall" two-faction combined-arms vision (clone reserves at 1/3/5 costs, Siege/Air-Superiority/Convoy modes). Verdict in the doc itself: "every mode remains open… an evidence inventory, not an approved specification."
- `docs/superpowers/plans/2026-09-08-military-vehicles-brief.md` — fightable response-tank/rotorcraft/fixedwing; "prepared, not live." The proposed `src/data/military-vehicles.js` **does not exist**.

---

## 3. The data to canonize — split by shape

This split is the spine of the plan. **Two categories, two destinations.**

### (A) Per-nation war data — ALREADY sheet-driven (guarantee + clean, don't add)
`deriveWarProfile(n)` reads exactly these Country-sheet-derived `Nation` fields: `gdp`, `gdpPerCapita`, `population`, `digital`, `government`, `military`, `integrity`, `science`, `intel`, `cyber`, `perception`, `cloning`, `lswReg`, `lswActivity`, `faction`, `cities`.

Every one of these already flows **`Country Master Sheet - Country.csv` → `gen-nations.mjs` → `nations.ts` → `deriveWarProfile()`.** So the entire *national* war layer (budgets, army size, tech tier, clone throughput) is **already canonized in principle.** The migration work here is not new data — it is:
- **Guarantee** the columns exist and are clean (they do exist; see §4 landmines).
- **Decide `faction`** — the one derivation input NOT in the sheet (see §5.3).

### (B) The global catalog — NET-NEW to COF (needs a new sheet)
These are hard-coded TS tables today, each already carrying a **revision tag** (i.e. built to be replaced by a canonical feed):

| Data | Current home | Shape |
|---|---|---|
| Unit material costs | `model.ts` `UNIT_COSTS` | per-unit `{feedstock, industrial, electronics, energy, time}` |
| Formation defs | `model.ts` `FORMATION_SIZE`/`FORMATION_PACE`/`formationCost` | per-formation size + pace + composition rules |
| Combined-arms coefficients | `model.ts` `ARMOR_COEF`/`AIR_COEF`/`LSW_STRENGTH_MULT` | balance constants |
| Procurement prices | `procurement-catalog.ts` (`robert-1`) | per-hull `{cost, crew, prerequisites}` |
| Build times + research gates | `commissioning-catalog.ts` (`lead-1`) | per-hull `hours`, optional research gate |
| Vehicle combat stats + `cost` | `data.ts` VEHICLES / `types.ts` VehicleDef | per-hull hp/speed/seats/weapon/cost |

**None of this is per-nation** — it is one global price list the whole world shares. Forcing it into the 168-row Country sheet or the 1,069-row City sheet is the wrong shape. It wants **its own canonical sheet** (§5.2).

---

## 4. What COF holds today vs. what it needs

**Country sheet** (`Country Master Sheet - Country.csv`, 35 columns): every column `deriveWarProfile()` needs is **present** — `MilitaryBudget`→military, `Science`, `GDPNational`→gdp, `GDPPerCaptia`→gdpPerCapita, `Population`, `DigitalDevelopment`→digital, `GovernmentStructureType`, `GovermentCorruption`→integrity, `IntelligenceBudget`→intel, `CyberCapabilities`→cyber, `GovernmentPreception`→perception, `Cloning`, `LSWActivity`, `LSWRegulations`→lswReg. **Gap: none for the derivation. Only `faction` is absent (by design).**

**City sheet** (`- Cities.csv`, 15 named + 5 anonymous blank columns): `Sector` (546/1069 filled), `HVT` (**2/1069** filled — effectively empty), `CityType1..4`, `CrimeIndex/SafetyIndex`. The `FROM / TO / VILLAGE / City Bonus` columns the contract mentions **are not named headers** — they are 5 anonymous blank trailing columns. **Gap: the war layer's front/theater geography (which cities are objectives, supply nodes, front endpoints) has empty slots waiting but no schema.**

**War Catalog:** **does not exist.** This is the net-new artifact (§5.2).

**Landmines any migration MUST respect (do not "fix" blind):**
1. **Header typos are load-bearing** — `GovernmentPreception`, `GovermentCorruption`, `GDPPerCaptia`, `SocialDevopment`, and trailing-space `MediaFreedom ` / `CyberCapabilities `. `gen-nations.mjs` trims and maps them exactly; a new tool must match or the Column Guard throws.
2. **`GovermentCorruption` actually holds INTEGRITY** (higher = cleaner; corruption = 100 − integrity). Already handled in `gen-nations.mjs`; any new consumer must too.
3. **Congo label-swap** — join by population (as SPEAR does).
4. **Dirty `Cloning` / `LSWActivity`** — categorical/numeric mix; the contract calls for **one cleanup pass, in COF, once.**
5. **`SocialDevopment` is a FORMULA column** (per the legend row) — derived, not raw; never overwrite.

---

## 5. The canonicalization design

### 5.1 The principle (unchanged from the contract)
`THE_PASSPORT_FOUNDATION.md` §6, Decision #7: **"COF owns the sheets. Games consume, never fork."** Games propose columns back via `[PROPOSED]` PRs. The one live pipeline is `ShootEM/tools/gen-nations.mjs` (COF CSV → `nations.ts`). **We extend this exact pattern; we do not invent a parallel one.**

### 5.2 The new artifact — a COF **War Catalog** sheet
Add `canon/countries/War Catalog - Units.csv` (name TBD) as a **third master sheet** COF owns. One row per catalogued asset, columns unioned from the six TS tables in §3(B):

```
UnitKey, Name, Class(vehicle|aircraft|submarine|formation|facility),
Feedstock, Industrial, Electronics, Energy, BuildHours, ResearchGate,
ProcurementCost, CrewRequirement, Prerequisites, CombatCost,
HP, Speed, Seats, Weapon, Armor, AntiAir, Stealth, Bombs
```

Plus a tiny companion `War Catalog - Constants.csv` for the non-per-unit balance values (formation sizes/paces, `ARMOR_COEF`, `AIR_COEF`, `LSW_STRENGTH_MULT`, the budget-formula constants). Authored **once, from the reconciled canon price set** (§7 D1) — not from whichever TS file is nearest.

Why a sheet and not "leave it in code": the whole point of "COF owns the numbers" is that a designer (or Robert) can retune the war economy in one place and **both** games regenerate — the same reason nations already live in a CSV. A price list is the most sheet-shaped data in the entire project.

### 5.3 The two authority exceptions (decide explicitly)
- **Faction / bloc** is authored game-side in `ShootEM/src/data/bloc-canon.json`, governed by `ShootEM/docs/WAR-LAYER-RULINGS.md §3`, as a *sanctioned* exception ("#546 NATION TRUTH"). COF's `GALACTIC_LAWS.md #30` blesses the United Front / Collective split *in principle* but keeps membership game-side. **Decision (§7 D3):** move `faction` into the Country sheet as a column, or keep the sanctioned game-side authority. *Recommendation: keep it game-side but record the exception in the pipeline law* — it is doctrine-derived + narrative, and it already has a guard.
- **The catalog itself** — same question one level up (§7 D2): does the War Catalog live in COF (recommended) or stay a game-owned file like `bloc-canon.json`?

### 5.4 The pipeline extension
Keep `gen-nations.mjs` for nations. Add a sibling **`ShootEM/tools/gen-warcatalog.mjs`**: reads `COF/canon/countries/War Catalog - *.csv` → emits `src/data/procurement-catalog.ts`, `commissioning-catalog.ts`, and the `UNIT_COSTS` / vehicle-`cost` tables, each stamped `// AUTO-GENERATED`, with the same Column Guard discipline. `deriveWarProfile()` is untouched — it already reads the (already-canonical) nation columns.

---

## 6. The migration plan — gated phases

> Ordered so that **nothing writes numbers into the source of truth until the numbers are settled.** Each phase has a gate.

**Phase 0 — Settle the economy (Robert-only; hard gate).**
Answer §7's decisions: the canon price set (D1), catalog home (D2), faction column (D3), and the 7 open pricing questions folded in (D4–D9). *Gate: a signed-off "these are the canon numbers" list. No sheet is authored before this.*

**Phase 1 — COF sheet hygiene (the "one cleanup pass, in COF, once").**
Fix the Congo label-swap and the dirty `Cloning`/`LSWActivity` columns *in the CSV*; name the 5 anonymous City columns (or delete them if the front geography lands elsewhere); leave the load-bearing typos alone. *Gate: `gen-nations.mjs` still builds clean; SPEAR still builds; both games regenerate byte-stable except the intended cleanups.*

**Phase 2 — Author the War Catalog in COF.**
Create `War Catalog - Units.csv` + `- Constants.csv` from the Phase-0 canon numbers. *Gate: a schema doc in `reference/` + a row-count/columns check.*

**Phase 3 — Build the pipeline.**
Write `gen-warcatalog.mjs` (Column Guard, `AUTO-GENERATED` stamps). *Gate: generated files diff-match the intended catalog.*

**Phase 4 — Point ShootEM at the feed.**
Replace the hard-coded literals in `procurement-catalog.ts` / `commissioning-catalog.ts` / `model.ts` `UNIT_COSTS` with the generated tables. Verify `deriveWarProfile()`'s columns are all guaranteed on the sheet. *Gate: the ~40 war tests pass unchanged; add a canon-parity test (generated == committed).*

**Phase 5 — Propose the schema back into the contract.**
`[PROPOSED]` PR adding the War Catalog to `THE_PASSPORT_FOUNDATION.md §6` as a third owned sheet, and recording the faction/catalog authority decisions. *Gate: Robert blesses (this is Decision #7 territory).*

**Phase 6 — lsw reconciliation (only if/when Ascendants builds a war mode).**
The Godfall / combined-arms / military-vehicles proposals **consume the same War Catalog** — they do not fork their own numbers. The Infantry Online dossier stays what it is: *design reference*, not a source. Retire IDEA_BOARD #46's "strategy layer" ambition into "consume ShootEM's model via the Passport," not "build a second one." *Gate: no second war-economy in the ecosystem.*

---

## 7. Decisions only Robert can make

| # | Decision | Options | Recommendation |
|---|---|---|---|
| **D1** | **Canon price set** — shipped `robert-1` catalog vs. `PROCUREMENT-COSTS.md §3.2` anchors (8–12× higher) | Bless the shipped catalog · adopt the higher anchors · a third reconciled set | Pick ONE before authoring the sheet — this is the load-bearing number |
| **D2** | **Where the War Catalog lives** | New COF sheet (games consume) · stay game-side like `bloc-canon.json` | **New COF sheet** — it's the most sheet-shaped data in the project |
| **D3** | **`faction` column** | Move into Country sheet · keep game-side in `bloc-canon.json` | **Keep game-side**, but record the exception in the pipeline law |
| **D4** | **Standing-army upkeep** (PROCUREMENT §5.2) | Pre-paid (current) · explicit daily upkeep later (readiness decay, not bankruptcy) | Ship pre-paid; design the upkeep column now so the sheet won't need reshaping |
| **D5** | **One lane or two at the register** (§5.3) | Money buys the materials (money = gate) · charge money AND materials | Decide before the catalog schema freezes — it changes which columns are canonical |
| **D6** | **Currency name + scale** (§5.4) | Name the "budget units"; pick display scale (sub 45,000 → "45M"?) | Name it once, in the Catalog constants sheet |
| **D7** | **LSW deployment pricing** (§5.6) | Flat `1.6×` now · measured per-LSW capability later | Flat now; leave a per-LSW column stubbed |
| **D8** | **Fiscal year** (§5.7) | 365 game-days · shorter war-season | Creator's call |
| **D9** | **Which currencies are canon vs engine-internal** | budget units + build hours + combat cost = canon; UNIT_COSTS materials = ?; personal wallet + program budgets = engine-internal | Canonize the three global ones; keep wallet/program budgets in-engine |

*Every row here is `[PROPOSED]`. Phase 0 = closing this table.*

---

## 8. Risks

- **Canonizing wrong numbers.** The 8–12× catalog/doc split (D1) means the source of truth could enshrine prices nobody wants. **Mitigation:** Phase 0 hard gate.
- **Two war economies.** If lsw builds its Godfall vision independently, the ecosystem forks the very thing this plan unifies. **Mitigation:** Phase 6 — one catalog, consumed via the Passport.
- **Breaking the live pipeline.** `gen-nations.mjs`'s Column Guard throws on any header mismatch. **Mitigation:** never touch the load-bearing typos; run both game builds after Phase 1.
- **Legal, carried over from the Passport doc:** ShootEM's LSW roster carries derivative (Goku/Vegeta/Green Lantern) designs flagged as a legal risk. If the war layer's LSW-strike pricing surfaces those names, scrub before any promotion. Not this plan's job to fix, but its job to not amplify.

## 9. What this is NOT proposing
- **Not** porting game code into `D:\git\COF` (it stays "storytelling, not software" — only sheets + a schema doc land here).
- **Not** rebuilding ShootEM's war sim (it's live and good; it gets a canonical feed, not a rewrite).
- **Not** blessing any price. The numbers stay `[PROPOSED]` until Phase 0.

---

*Companion to `reference/THE_PASSPORT_FOUNDATION.md`. Governed by its Decision #7 (pipeline law). Nothing here is canon until blessed.*
