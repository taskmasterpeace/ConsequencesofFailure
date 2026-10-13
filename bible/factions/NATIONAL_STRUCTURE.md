# THE NATIONAL STRUCTURE: LSWs, "the others", NMCs, and the civilians who run the economy

*Written 2026-10-12 from Robert's dictation. Everything marked **[CREATOR'S WORD]** is his; everything marked **[PROPOSED]** is my reading or a suggestion and is not canon until he says so. Open questions are at the bottom.*

## CREATOR'S WORD 2026-10-12 (dictated, cleaned for sense, nothing added)

1. **The number of LSWs a country has scales with its population.** [CREATOR'S WORD]
2. **A country has more than one team. There are "the others", and they are how nations get around the treaty:** the oligarchs end up owning super weapons that work for them *through the government*. This has to be part of the lore. [CREATOR'S WORD]
3. **Teams need operatives:** people with guns and stats, professional soldiers, "think Jagged Alliance", with personalities, from their own countries and cities. [CREATOR'S WORD]
4. **They are National Military Contractors (NMCs), not PMCs.** They are owned by the countries, because pretty much every country has its own. [CREATOR'S WORD]
5. **Civilians who help the economy run everything** should be part of the structure. Robert does not know whether they are created yet and wants help fleshing them out. [CREATOR'S WORD]

## CREATOR'S ANSWERS, round one (2026-10-12, asked in the chat)

6. **The treaty bars governments from wielding LSWs.** (He chose this over "only border crossings" and over "both".) So the `PREMISE.md` wording ("bars LSWs from crossing borders") is the loose version and the Stefanos canon note is the rule; the premise line should be reworded. [CREATOR'S WORD]
7. **LSW counts: population share, with a minimum of one LSW in every country.** [CREATOR'S WORD]
8. **Establishment 24 is formally a company** (everyone knows it is the state's); the treaty is dodged on paper even for the national team. [CREATOR'S WORD]
9. **NMCs are "much smaller": 7 to 24, but mostly operatives.** [CREATOR'S WORD] *My reading, to confirm:* a team is 7 to 24 people, most of them NMC operatives with a few LSWs among them; an NMC fields several such teams. The alternative reading (an NMC is 7-24 people in the whole country) is in question A below.

## What the lore and the game already say (checked)

- **~1,000 LSWs worldwide**, picked by the Greys (`PREMISE.md`). [CANON]
- **The treaty** is the Living Super Weapon Threshold Treaty. `PREMISE.md` says it bars LSWs from crossing borders into foreign conflicts and is "constantly violated"; `CANON_STATUS.md` (Stefanos, "the 4 days") says it bars *governments* from wielding LSWs and that **companies are the workaround**. Robert's point 2 is that workaround, made into structure. [CANON; the two wordings should be reconciled, see question 1]
- **SPEAR / FIST** (Galloway) is the earlier case of a treaty-dodging private army. [CANON]
- **Establishment 24** (India): "the government of India slowly pressures" Reddy. [CREATOR'S WORD, see `ESTABLISHMENT_24.md`]
- **In the game today:** every country's biggest landowner is an oligarch (`power-elite.js`, `land-ownership.js`); there is an economy ledger with owners and businesses (`economy.js`, `ledger.js`); the country sheet has `pop`, `milBudget`, `milService`, `intelBudget`, `lswActivity`, `lswRegs`; every culture has a soldier look (14 cultures, the country only flies the flag) and special forces kit tiers come from the intelligence budget. Civilians have a wealth ladder and classes.
- **Not in the game yet:** operatives as *people* (names, stats, personalities, hometowns), NMCs as organisations, and teams placed in regions (until today every generated team was scattered over the whole country; the generator now takes "stay within N km of a city").

## The proposed structure **[PROPOSED]**

```
 THE CIVILIANS          workers, owners, officials, shopkeepers: the people who make money move.
   |                    (partly in the game: wealth ladder, classes, the ledger, businesses)
 THE OLIGARCHS          each country's biggest owners. They own land, towns, companies,
   |                    and, through companies, the others (below).
 THE STATE              ministries, the military, the intelligence service. Not allowed to wield LSWs.
   |
   +-- NMC              the National Military Contractor: a state-OWNED company. Its operatives are
   |                    NOT LSWs: professional soldiers with guns, stats and personalities.
   |                    It is the legal body the state hires, equips and deploys. Small: teams of 7 to 24, mostly operatives.
   |
   +-- THE ESTABLISHMENT   the national team (Establishment 24 in India): FORMALLY A COMPANY (creator's word),
                        in practice the state's own people.
 THE OTHERS             teams owned by oligarchs and rented to the state: the treaty workaround.
                        Regional, named, competing. Each has an NMC detachment attached.
 THE FREE               LSWs belonging to nobody (or to a foreign power).
```

**How each layer stays legal on paper [PROPOSED]:** the state never owns an LSW; an *establishment* is a company, *the others* are oligarch companies under contract, and the NMC is a company too (state-owned, so it can hold guns the state is allowed to buy). The treaty bars the government; nothing bars a contractor.

**How many LSWs a country has [CREATOR'S WORD: population share, minimum one each; the formula is mine]:** every country gets one, and the other 832 of the canon 1,000 are shared by population (largest remainder, so the total is exactly 1,000). Today's numbers from the country sheet's `pop`: China 155, **India 149**, United States 36, Indonesia 30, Pakistan 25, Brazil 24, Nigeria 23, Bangladesh 19, Russia 17, Mexico 15, Japan 15, Ethiopia 13, Kenya 7, South Korea 6, Poland 5, Norway 2. 41 countries have exactly one. India's 149 are: Establishment 24's twelve (8%), the others (regional oligarch teams), and the free.

**NMC operatives [PROPOSED; size is the creator's word, 7 to 24, mostly operatives]:** each team (establishment or other) is mostly NMC operatives, a squad of professional soldiers from the same region, with a few LSWs among them; they go where the team goes. Their kit comes from the culture soldier (looks) and the country's intelligence-budget tier (what the state can buy). Each is a *person*: a name from their city's naming culture, a hometown, a few stats (marksmanship, agility, health, leadership, wisdom, medical, explosives, mechanical, experience), a personality, likes and dislikes of squadmates (the Jagged Alliance buddy / hated-buddy idea), and a gun they favour.

**Civilians [PROPOSED]:** the economy needs three kinds of people the game can show: *owners* (the oligarch's family and managers), *workers* who earn from the owner's businesses, and *officials and services* (police, clinic, customs). They are the reason the oligarchs have money, and the reason a team has something to protect or to be bought by.

## What is built and what is not (honest)

| Piece | State |
|---|---|
| LSW teams (people, looks, powers, secret identities) | built (`lsw-generator`) |
| A team in one part of a country | **built today** (regional option, tested) |
| The national team as a fixed canon team | built for India only (Establishment 24) |
| Operatives with stats and personalities | **not built** (the soldier *looks* exist) |
| NMC as an organisation, its detachments | **not built** |
| Population scaling of LSW counts | **not built** (numbers above are a proposal) |
| Oligarchs, land, businesses, ledger | built (game economy) |

## Questions for Robert

**Answered in round one:** 1 (treaty rule), 2 (population scaling), 3 (Establishment 24), 4 (NMC size): see 6 to 9 above.

**Round two (open):**
A. **Team shape:** is a *team* 7 to 24 people with the LSWs a minority (my reading), or is the NMC itself 7 to 24 people in the whole country?
B. **Operatives as people:** how much of a person? The Jagged Alliance set is a name, hometown, a handful of stats (marksmanship, agility, health, leadership, wisdom, medical, explosives, mechanical, experience), a personality and quirks, favourite gun, and who they like or can't stand in the squad. Keep all of it, or fewer stats?
C. **Do operatives die for good** (and does the game grieve them), or are they replaceable?
D. **The others:** do they compete with each other and with the establishment, and can the state cancel a contract and take a team's funding away?
E. **Poor countries with no oligarch worth the name:** who owns the others there? (A foreign company? A warlord? Nobody: one lone LSW?)
F. **Civilians:** do they need their own named characters (a shopkeeper, a clerk), or only the oligarchs' circle and the services (police, clinic, customs)?
G. **Which country next** after India, to prove the structure?
