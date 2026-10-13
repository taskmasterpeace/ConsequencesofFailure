# THE NATIONAL STRUCTURE: LSWs, "the others", NMCs, and the civilians who run the economy

*Written 2026-10-12 from Robert's dictation. Everything marked **[CREATOR'S WORD]** is his; everything marked **[PROPOSED]** is my reading or a suggestion and is not canon until he says so. Open questions are at the bottom.*

## CREATOR'S WORD 2026-10-12 (dictated, cleaned for sense, nothing added)

1. **The number of LSWs a country has scales with its population.** [CREATOR'S WORD]
2. **A country has more than one team. There are "the others", and they are how nations get around the treaty:** the oligarchs end up owning super weapons that work for them *through the government*. This has to be part of the lore. [CREATOR'S WORD]
3. **Teams need operatives:** people with guns and stats, professional soldiers, "think Jagged Alliance", with personalities, from their own countries and cities. [CREATOR'S WORD]
4. **They are National Military Contractors (NMCs), not PMCs.** They are owned by the countries, because pretty much every country has its own. [CREATOR'S WORD]
5. **Civilians who help the economy run everything** should be part of the structure. Robert does not know whether they are created yet and wants help fleshing them out. [CREATOR'S WORD]

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
   |                    It is the legal body the state hires, equips and deploys.
   |
   +-- THE ESTABLISHMENT   the national team (Establishment 24 in India), formally a company or
                        foundation, in practice the state's own LSWs.
 THE OTHERS             teams owned by oligarchs and rented to the state: the treaty workaround.
                        Regional, named, competing. Each has an NMC detachment attached.
 THE FREE               LSWs belonging to nobody (or to a foreign power).
```

**How each layer stays legal on paper [PROPOSED]:** the state never owns an LSW; an *establishment* is a company, *the others* are oligarch companies under contract, and the NMC is a company too (state-owned, so it can hold guns the state is allowed to buy). The treaty bars the government; nothing bars a contractor.

**How many LSWs a country has [PROPOSED, from Robert's point 1]:** `LSWs = round(1,000 x population / world population)`, using the country sheet's own `pop`. Today's numbers: China 185, **India 178**, United States 43, Indonesia 35, Pakistan 28, Brazil 27, Nigeria 27, Bangladesh 21, Russia 19, Mexico 17, Japan 16, Ethiopia 15. **36 of the 168 countries round to zero** (see question 2). India's 178 would be: Establishment 24's twelve, the others (regional oligarch teams), and the free.

**NMC operatives [PROPOSED]:** each LSW team (establishment or other) has an NMC detachment, a squad of professional soldiers from the same region, who go where the team goes. Their kit comes from the culture soldier (looks) and the country's intelligence-budget tier (what the state can buy). Each is a *person*: a name from their city's naming culture, a hometown, a few stats (marksmanship, agility, health, leadership, wisdom, medical, explosives, mechanical, experience), a personality, likes and dislikes of squadmates (the Jagged Alliance buddy / hated-buddy idea), and a gun they favour.

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

## Questions for Robert (the first round is the first four)

1. **Which treaty rule?** Does it bar *governments from owning LSWs* (so every state team must be a company or an oligarch's), or only *crossing borders* (so a state may keep its own LSWs at home)? Premise and canon-status word it differently.
2. **Population scaling:** a pure population share of the 1,000 (India 178, 36 countries get none), or at least one LSW in every country, or population times the sheet's own `lswActivity`?
3. **Is Establishment 24 itself an oligarch vehicle** (a foundation the government "leases"), or openly the state's?
4. **NMC size:** do NMC operatives number in the thousands (a real army contractor) or are they a small elite attached to teams?
5. Who owns "the others" in a country with no oligarchs worth the name? (Small or poor countries.)
6. Do the others compete with each other, with the establishment, or both? Can the state *recall* a team by cancelling the contract?
7. Is an NMC operative allowed to be an LSW later (promotion), or are the two worlds sealed?
8. What do operatives *die of* in the lore: do they matter as people (permadeath, grief) the way the LSWs do?
9. Do civilians need their own named characters (a shopkeeper, a clerk) or only the oligarchs' circle and the services?
10. Which country should be done fully next after India, to prove the structure?
