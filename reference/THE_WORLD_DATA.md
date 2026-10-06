# THE WORLD — every data point across the City, Political & War layers
**Status: `[PROPOSED]` inventory + gap list. Written 2026-09-22 from a full read of D:\git\COF, D:\git\ShootEM, and D:\lsw. Data facts are current; every design proposal is marked `[PROPOSED]`.**

> Robert's ask (2026-09-22): *"Put everything war-related and politics-related… all the data points. Explain the map layer — we've got individual cities, but between those cities, how are we treating that? The layers above the city. The previous version's politics only went to the national level — the new version goes all the way down to the city, where the city's politician lives in that city and receives from their country. We need names for that governmental layer. Designate the capital of every country so you can find the president of Russia. There's the politics part, the war part, and the city part — I need all those data points, all the government types, everything."*

This is the answer. Companion to `THE_WAR_LAYER_CANON.md` (the war-data migration) and `THE_PASSPORT_FOUNDATION.md` (the pipeline law). All three are governed by the same law: **COF owns the sheets; games consume, never fork.**

---

## 0. The finding, in one screen

Your world is modeled as **three stacked layers plus a relationship web**, spread across three repos:

```
        THE RELATIONSHIP WEB  — 168×168 matrix, who can stand whom (1–5), two blocs
        ───────────────────────────────────────────────────────────────────────────
  ▲     POLITICAL / NATIONAL   — 168 nations: government type, perception, laws, leaders,
  │                              economy, tech, LSW law.  DECISIONS live here (ShootEM).
  │     ─────────────────────────────────────────────────────────────────────────────
  │     THE CITY               — ~1,050 cities: pop tier, up to 4 type-tags, culture region,
  │                              sector, crime/safety, lat/lon.  No local politics yet.
  │     ─────────────────────────────────────────────────────────────────────────────
  ▼     THE GROUND             — the cell grid / roads / districts inside one city.
        ═══════════════════════════════════════════════════════════════════════════
        WAR overlays all of it — budgets & armies (per-nation), a global unit catalog,
        fronts + a territory control field sitting on real cities.
```

**What EXISTS and is good (don't rebuild):**
- The **nation sheet** (168 nations, ~30 quantified columns) and the **city sheet** (~1,050 cities) — COF-owned, both games consume them.
- The **relationship matrix** (168×168, `lsw/src/data/relations.js`) — every pair rated HOSTILE→ALLIED, only 11 ALLIED pairs in the world.
- The **government decision engine** (`ShootEM/src/sim/national-authority/`) — **12 government archetypes, named cabinet seats, 5 decision kinds, 14 program domains, AI-held-but-player-takeable seats.** This is the "politics makes decisions" system, and it already names the government layer.
- A **territory control field** (`ShootEM/src/sim/war/territory.ts`) — the honest answer to "what's between the cities": a continuous influence field bleeding out from real cities.

**The SIX confirmed gaps (your new build list — §7):**
1. **No capital city is designated** for any of the 168 nations. "Go to the capital, find the president of Russia" is not wired.
2. **No city-level politician** exists anywhere. Politics stops at the national level — exactly the limitation you described.
3. **The government layer isn't named end-to-end** — the national seats are named (ShootEM), but the tiers, the city office, and the nation→city authority link are not.
4. **Government types are dirty** — 26 free-text values on the sheet that should map to the 12 clean archetypes.
5. **Named leaders are sparse** — only ~36 of 168 nations have a named head of state.
6. **No province/state tier**, and **two different "between-city" models** across the two games (one abstract field, one nothing).

---

## 1. THE CITY LAYER — every data point

**Canonical source:** `COF/canon/countries/Country Master Sheet - Cities.csv` (~1,050 real cities). Consumed as `lsw/src/data/cities.js` (`cityList()`) and `ShootEM/src/data/map-cities.json`.

**Per-city fields:**

| Field | Values / shape | Coverage |
|---|---|---|
| `CityName`, `Country`, `CountryCode` | identity | full |
| `Population` + `PopulationRating` | count + a rating | full |
| `PopulationType` | **7 tiers:** Village · Small Town · Town · Small City · City · Large City · Mega City | full (680 City, 283 Large City, 38 Mega City…) |
| `CityType1`–`CityType4` | **9 specialization tags:** Industrial · Company · Educational · Resort · Political · Temple · Mining · Seaport · Military | 1–4 per city |
| `CultureCode` | **14 architectural regions** (legend below) | ~22 blank → derived from country's other cities |
| `Sector` | 2-letter + digit grid code (e.g. `NM3`) | **only ~528/1,050 filled; no legend** — a placeholder grid |
| `HVT` | high-value-target flag | **effectively empty (2/1,050)** |
| `CrimeIndex` / `SafetyIndex` | paired numeric | mostly full |
| `lat` / `lon` | real coordinates | **full** — baked from GeoNames (`ShootEM/map-cities.json`, `lsw/citycoords.js`), index-aligned to the sheet |
| `terrain` / `biome` / `climate` | joined at load (lsw only) | derived (`geography.js`, `climate.js`) |

**Culture-code legend (embedded in the sheet itself):**
1 North Africa · 2 Central Africa · 3 Southern Africa · 4 Central Asia · 5 South Asia · 6 East + SE Asia · 7 The Caribbean · 8 Central America · 9 West Europe · 10 East Europe · 11 Oceania · 12 South America · 13 North America · 14 Middle Eastern. *(Drives architecture skins — a "great religious building" becomes a cathedral / mosque / pagoda / mandir by region.)*

**What a city does NOT carry today:** no capital flag · no local politician/mayor/governor · no province membership · `Political` is a *layout tag*, not a seat of government.

---

## 2. THE POLITICAL / NATIONAL LAYER — every data point

**Canonical source:** `COF/canon/countries/Country Master Sheet - Country.csv` (168 nations, 35 columns). Consumed as `ShootEM/src/data/nations.ts` (via `gen-nations.mjs`), `ShootEM/map-countries.json`, and `lsw/src/data/countries.js` (25 fields).

### 2.1 The full nation field set (grouped)

- **Identity:** Country Code · Country · Nationalities (demonym) · Motto · Population · PopulationRating · Gender (of leader)
- **Government:** `GovernmentStructureType` · `GovernmentPreception` (regime type) · `LeaderTitleType` · `President` (named leader) · `PresidentialTerm` (years) · `GovermentCorruption` → **integrity 0–100, HIGH = CLEAN**
- **Law & rights:** `CapitalPunishmentType` · `LawEnforcement` · `LawEnforcementBudget` · `MediaFreedom` · `Vigilantism` · `TerrorismActivity`
- **Powers/LSW:** `LSWActivity` · `LSWRegulations` · `Cloning`
- **Economy:** `GDPNational` · `GDPPerCaptia` · `Lifestyle` · `Healthcare` · `HigherEducation` · `SocialDevopment` (a *formula* column)
- **Tech/intel:** `Science` · `DigitalDevelopment` · `CyberCapabilities` · `IntelligenceServices` · `IntelligenceBudget`
- **Military:** `MilitaryServices` · `MilitaryBudget` *(all military modeling detail → `THE_WAR_LAYER_CANON.md`)*

Most quantified columns are **0–90 ratings**, not real-world units.

### 2.2 THE ENUMERATIONS you asked for ("all the government types")

**`GovernmentStructureType` — 26 distinct on the sheet, but DIRTY (case/spelling splits).** Top: Republic 71 · Parliamentary Democracy 26 · Constitutional Monarchy 18 · Federal Republic 14 · Parliamentary Republic 6 · Communist State 6 · then singles: Military junta, Theocratic Republic, Emirate, Dictatorship, Commonwealth, Monarchy, Democratic Republic, Constitutional Republic, Multiparty Democracy, transitional government, … *(needs one normalization pass — see §7 gap #4)*

**The CLEAN canonical taxonomy already exists in ShootEM** — `GOVERNMENT_PROFILES` (`national-authority/profiles.ts`): **12 government archetype families**, each with its own cabinet:

| Family | Cabinet seats |
|---|---|
| `presidential` | president · defense-minister · high-court |
| `semi-presidential` | president · prime-minister · defense-minister |
| `parliamentary-republic` | prime-minister · parliament · defense-minister |
| `parliamentary-monarchy` | crown · prime-minister · parliament |
| `executive-monarchy` | crown · royal-court |
| `party-state` | party-chair · party-congress · central-military-commission |
| `theocratic` | supreme-cleric · head-of-government · guardian-council |
| `military-council` | council-chair · council-second · council-third |
| `personalist` | leader · inner-circle |
| `directorial` | director-one/two/three |
| `transitional` | interim-head · oversight-commission · international-guarantor |
| `delegated-protected` | local-head · protector-power |

**→ The naming Robert wants partly already exists.** The gap is a **mapping**: the 26 dirty sheet strings → these 12 clean families (§7 #4).

**`GovernmentPreception` (regime type) — 4 clean tiers:** Authoritarian Regime 60 · Flawed Democracy 45 · Hybrid Regime 36 · Full Democracy 27.

**`LeaderTitleType` — 17 distinct** (world is overwhelmingly presidential): President 131 · Monarch 16 · King 5 · Governor-General 4 · then singles: Prime Minister, Emir, Chairman, Emperor, Supreme Leader, Co-Princes, Presidency Member, Presidential Council, Chief Executive, President of State Affairs, President of the Confederation, General.

**Law / rights enums (each 3 values):** `CapitalPunishmentType` — Inactive 100 · Active 39 · Rare 29. `LSWRegulations` — Regulated 101 · Banned 39 · Legal 28. `Vigilantism` — Banned 80 · Regulated 77 · Legal 11. `Cloning` — Banned 93 · Legal 38 · Regulated 37.

**Named leaders:** only **~36 of 168** nations carry a named head of state on the COF sheet (ShootEM's `nations.ts` fills a partial, different subset). The other ~130 have a title but no name → **gap #5.**

### 2.3 The political DECISION engine — "the political part makes decisions"

**This exists, and it's substantial — `ShootEM/src/sim/national-authority/` (~50 files).** It is a constitutional decision kernel, not direct mutation:

- **Seats** come from the 12 families (§2.2). Each seat is AI-held by default; a player can **take the controls** of any seat without changing the constitution (`seat-control.ts` — control ≠ tenure; AI-held seats are labeled `AI-HELD`).
- **Decisions** — five kinds (`AuthorityDecisionKind`): `appointment` · `budget-transfer` · `program-charter` · `strategic-order` · `emergency-declaration`. Every one runs the same machine: **propose → start-review → approve / veto / invoke-bypass → commit → settle.** Each family sets who proposes, approves, can veto, and can emergency-bypass.
- **Programs** — a `program-charter` spins up a national program in one of **14 domains:** defense-readiness · intelligence · cyber · science · education · healthcare · security · infrastructure · economy · media · arms-production · strategic · lsw-research · reconstruction. AI ministers run them within a delegated budget (`minister-ai.ts` — "the player sets priorities; nobody clicks laboratories per tick").
- **Political operations** (separate lifecycle): `assassination · abduction · rescue`, with sponsor motive / capability / intel / interception / evidence.
- **Player surface:** `cabinet-desk.ts` — "THE CABINET & SEAT CONTROL": every seat with officer portrait, holder, term history, take/release controls, a candidate drawer, **and** the president's war verbs (set-front-priority, commit-reserves, redirect-division).

**By contrast, `lsw` (Ascendants) has NO governance mode** — its `countries.js` is read-only data; the only political decision the player makes is *which government contract to accept* (§4.3). The ecosystem's governance engine is ShootEM's.

---

## 3. THE RELATIONSHIP LAYER — every data point

**Canonical source:** `lsw/src/data/relations.js` (Robert's 168×168 matrix) + `ShootEM/src/data/country-relationships.ts` (a parallel model). This is the "relationship stuff" you asked for.

- **The matrix:** 168×168, symmetric, every pair rated **1–5:** 1 HOSTILE · 2 STRAINED · 3 NEUTRAL · 4 FRIENDLY · 5 ALLIED. `relationOf(a,b)` returns the value + word + color (never a fabricated neutral). Self = HOME.
- **Alliances are scarce on purpose:** exactly **11 pairs at 5 (ALLIED)** in the entire world — e.g. US/Canada, China/Russia, France/Germany. `alliesOf()` / `rivalsOf()` read the row.
- **Per-country metadata (`REL_META`):** continent · theater (7 regions) · faction · relation-to-US · relation-to-China · a written rationale.
- **Two blocs, DERIVED from the matrix (can't drift):** **United Front 88** ("Atlantic-Pacific security compact — slower to act, harder to leave") / **Collective 80** ("continental infrastructure & security network — faster, asks more of you"). Membership is authored game-side in `ShootEM/src/data/bloc-canon.json` (the one authored answer both enlistment and diplomacy read).
- **Design-intent not yet built** (`ShootEM/docs/WAR-LAYER-RULINGS.md §3`): richer states (Aligned partner · Neutral · Non-aligned · Contested · Occupied · Government-in-exile) and diplomacy verbs (pressure · persuade · threaten · invade · support · sanction · recruit).

---

## 4. THE WAR LAYER — every data point *(summary; full detail in `THE_WAR_LAYER_CANON.md`)*

### 4.1 Per-nation war data — already derived from the sheet
`deriveWarProfile()` computes, from Country-sheet columns: `budgetPerDay` (from GDP, population, digital, government, military, integrity), `divisions = military/20`, `equipmentTier` (from science + gdpPerCapita), `printCapacityPerDay` (from population + cloning), research rate, intel/cyber edge, stability.

### 4.2 The global unit catalog — hard-coded, net-new to COF
Formations (Squad 10 / Company 120 / Division 3,000 prints), `UNIT_COSTS` (print/rifle/ammo/transport/tank/aircraft/missile — materials + build time), a 20-hull priced procurement catalog (Kestrel Gunship 450 → Carrier 9,000), commissioning build-times, vehicle combat stats. *These want their own canonical War Catalog sheet — see the war doc, §5.*

### 4.3 The war↔politics bridge — the government contract
`lsw/src/data/career.js` `POSTURES`: your home state reads `relationOf(home, target)` and the value picks the job — **5 ALLIED → Mutual Defense · 4 → Joint Operation · 3 → Observation · 2 → Interdiction · 1 HOSTILE → Deniable Operation** (you start already hunted). Pay is **V-shaped** — most for the deniable far end, least for a favor to a friend. This is the relationship layer paying off as gameplay.

---

## 5. THE MAP — how the space *between* cities is treated

**The honest answer: there is no province/state tier anywhere, and the two games treat inter-city space differently.**

| | `lsw` (Ascendants) | `ShootEM` (War World: Earth) |
|---|---|---|
| Hierarchy | country → city → **cell grid** (three nested grids: Map 96u cells / Base 9×9 / Room BSP) | country → **city (a lat/lon point)** → front |
| Between cities | **nothing strategic** — only real geo-coordinates (borders from Natural Earth, city lat/lon from GeoNames) for the globe view | **a continuous geodesic control field** — `territory.ts`: control bleeds out from real cities by great-circle distance (`FRONT_REACH 1,400km`, `CITY_REACH 520km`), signed **+United Front / −Collective**, sampled everywhere |
| Territory/control | **none** — "fronts" are set-dressing for one combat encounter | **real** — 7 fronts on real cities, `territorySnapshot` feeds the globe, ops map, city cards, daily edition ("one source, cannot disagree") |
| Roads / adjacency | road graph **inside** a city only (`roadAt`) | none between cities — abstract haversine influence |
| Province / state tier | **none** | **none** (design-intent only, `WAR-LAYER-RULINGS §1/§6/§7`: a hidden movement grid + intra-city N/S/E/W sectors — not built) |

**So:** ShootEM already has a credible answer to "between the cities" (a control field on real geography). lsw has none. Neither has an administrative province tier, and the `Sector` column that could seed one is half-empty and undocumented.

---

## 6. WHERE EVERYTHING LIVES — the file map

| Data | COF (source) | ShootEM (consumer) | lsw (consumer) |
|---|---|---|---|
| Nations | `Country Master Sheet - Country.csv` | `data/nations.ts` ← `tools/gen-nations.mjs`; `map-countries.json` | `src/data/countries.js` |
| Cities | `Country Master Sheet - Cities.csv` | `data/map-cities.json` | `src/data/cities.js` |
| Relationships | — *(fiction only)* | `data/country-relationships.ts`; `bloc-canon.json` | `src/data/relations.js` |
| Government engine | — | `src/sim/national-authority/*` + `client/cabinet-desk.ts` | *(none — read-only)* |
| War sim | — | `src/sim/war/*`; `procurement-catalog.ts` | *(proposals only)* |
| Coordinates | *(none — sheet has no coords)* | `map-cities.json` (GeoNames) | `citycoords.js`, `borders.js`, `earth.js` |
| Culture regions | `Cities.csv CultureCode` (1–14) | `cultureCode` | `cities.js` + `cityplan.js REGIONS` |

---

## 7. THE GAPS — your new build list

Every one of these is "what the previous version didn't have." Numbered so we can tackle them in order.

**#1 — Designate a CAPITAL for every nation.** *(Enables "go to the capital → find the president of Russia.")* No capital exists in any repo today. Fix = one new column `CapitalCity` on the Country sheet (168 values) **or** an `isCapital` flag on one city per country in the Cities sheet. Then: pin the head-of-state seat to that city so a player can navigate nation → capital → leader. **This is the cheapest high-impact fix.**

**#2 — Push politics DOWN TO THE CITY (the core new vision).** Today governance stops at the nation. Add a **city-office tier**: each city has a local politician who *lives there* and *receives mandate/budget from the national seat*. Net-new data (a city-office row per city or per major city) + a concept. Reuses two existing mechanics: ShootEM's `budget-transfer` decision (the national seat funds the city) and lsw's `org.js seedCapital` pattern (a budget derived from the city).

**#3 — Name the government layer, end to end.** The national seats are already named (12 families, §2.2). Still unnamed: the **tier names** (what do we call the national office vs the city office?), the **city-office title** (Mayor? Governor? Party Secretary? — should vary by government type + culture), and the **nation→city authority link**. See the naming proposal in §8.

**#4 — Normalize government types.** Map the **26 dirty free-text** `GovernmentStructureType` strings → the **12 clean archetype families**. Do it once, in COF, then both games consume clean families instead of parsing free text. (lsw doesn't parse `govType` at all today — it's dead text there.)

**#5 — Fill named leaders for all 168.** Only ~36 have a name + gender. Fill the rest (name, gender, term) so every capital has a findable head of state.

**#6 — Decide the province/state tier + unify "between cities."** Either (a) add an administrative tier (state/province) between country and city — using the half-filled `Sector` column as the seed — or (b) consciously keep it country→city and adopt ShootEM's geodesic control field as the one "between cities" model both games use. Right now the two games disagree.

*(War-layer gaps — the 8–12× price mismatch, the missing War Catalog sheet — are tracked separately in `THE_WAR_LAYER_CANON.md`.)*

---

## 8. `[PROPOSED]` — naming the governmental layer

A starting proposal for the names you asked for. React and I'll lock it.

- **THE STATE** — the national tier. Its head is the **Head of State** (title per nation from `LeaderTitleType`: President / Monarch / Supreme Leader…), supported by the **Cabinet** (the 12 families' seats, already named). This tier already makes decisions (§2.3).
- **THE CAPITAL** — the one city (new, gap #1) where the Head of State's seat physically sits. Navigation target: *find the capital → find the leader.*
- **THE CITY OFFICE** — the new local tier (gap #2). The local politician lives in the city and answers to THE STATE. Proposed title **derived from the national government type**, so it reads true to each country:

  | Government family | City-office title `[PROPOSED]` | Selected how |
  |---|---|---|
  | presidential / semi-presidential / parliamentary-republic | **Mayor** (elected) | local vote |
  | federal republics | **Governor** (state) + **Mayor** (city) | elected |
  | parliamentary/executive monarchy | **Lord Mayor / Governor** | appointed by the Crown |
  | party-state | **Party Secretary** (appointed) | appointed by the party |
  | theocratic | **Provincial Cleric / Governor** | appointed by the council |
  | military-council / personalist | **Military Governor / Administrator** | appointed by the leader |
  | transitional / delegated-protected | **Interim Administrator** | appointed / overseen |

- **THE MANDATE** — the link between STATE and CITY OFFICE: the national seat sends the city a **budget + authority** (reuse `budget-transfer`); an *elected* city office can diverge from the national line, an *appointed* one cannot — which is where "politics all the way down to the city" becomes real gameplay (a defiant elected mayor in an authoritarian state; a loyal appointee vs a restive population).

*(This maps 1:1 onto systems that already exist — the 12 families, the budget-transfer decision, the culture codes — so it's a naming + one-tier extension, not a new engine.)*

---

## 9. How it gets owned (the pipeline law)

Per `THE_PASSPORT_FOUNDATION.md §6`: **new columns go into the COF sheets** via `[PROPOSED]` PRs, then both games regenerate. Concretely:
- **New Country-sheet columns:** `CapitalCity`, normalized `GovernmentFamily` (the 12), filled `President`/`Gender`/`PresidentialTerm`.
- **New Cities-sheet data:** an `isCapital` flag (one per nation) and, for gap #2, a `CityOffice` title (or derive it from government family + culture at generation time — no new column needed).
- **Stays game-side (sanctioned exceptions):** the decision engine (`national-authority/`), faction membership (`bloc-canon.json`), the territory field (`territory.ts`). COF holds the *data*; the games hold the *simulation*.
- **One cleanup pass, in COF, once:** the government-type normalization (#4), the Congo label-swap, and the dirty `Cloning`/`LSWActivity` columns — the same cleanup the war doc and the pipeline law already call for.

---

*Companion to `reference/THE_WAR_LAYER_CANON.md` and `reference/THE_PASSPORT_FOUNDATION.md`. Data facts current as of 2026-09-22; every design proposal is `[PROPOSED]` until blessed.*
