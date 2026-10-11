# CONSEQUENCES OF FAILURE — VISION & GOALS

*The north star for the whole project. Everything we build should serve this.*

## 1. The Vision
A **global, community storytelling universe** — a geopolitical alien-superhero anthology where the whole world is on the board, not just America. The ambition: **bigger than the Backrooms / SCP** — a shared mythology people build with, translate, and gravitate to because it gives them something they've never had.

- **Representation as a feature.** South America, Africa, and the rest of the global South get real, central, dignified stories — on a craft level Americans love too. **China is not isolated or villainized** — it's portrayed doing genuinely cutting-edge, cool things. Every region is a real player.
- **Multi-language.** Built to be translated, so it can travel.
- **GitHub at the center of a community.** The repo becomes a (partly) public home where fans/collaborators can see **where characters and plots are headed before they're fully created** — a living, public roadmap.

## 2. Creative North Star
- **Storytelling first.** We're telling stories, not generating pictures or world-gen for its own sake. Visuals/transmedia are the *back end* we switch on once a story is good.
- **Finish standalone stories.** The anthology / year-card model — each story stands on its own in a shared world and year.
- **Characters feel like real individuals** (quirks kept: Liu's cigarettes, Rusty showing up for his friend, etc.).

## 3. The Canon Engine (how we keep it true)
- **Golden rule:** creator originals + creator's word beat the AI-rewrite layer. Conflicts get **flagged, not silently resolved.** Inventions are marked `[PROPOSED]` until blessed.
- **The Country Master Sheet is the geopolitical spine.** `canon/countries/Country Master Sheet - Country.csv` — 170+ countries, quantified. This is canonical and load-bearing; keep it filled and accurate (e.g. Tanzania → President Ibrahim Juma).
- **The roster is the cast of record.** `bible/CHARACTER_ROSTER.md` (~110–115 named characters).

## 4. The Power System — NO PLOT ARMOR  `[to formalize]`
A core principle: **outcomes are determined by quantified power, not plot convenience.** We must be able to say clearly **who beats whom.**
- Every LSW gets **scaled, measurable power** — not vibes. (Model: Jawah Matu absorbs sound "up to **70 dB**" — concrete, comparable.)
- **Powers can scale.** That 70 dB is a *baseline* that grows with mastery/level — a character can get stronger on a defined curve.
- Tie the scale to the quantified columns already in the Country Master Sheet (LSWActivity, levels, etc.).
- **Next build:** design a rigorous COF power-scaling system (tiers, what each tier can do, how powers grow, how match-ups resolve) so fights and threats are legible across the whole universe. *(Pairs with the character-bible-sheet design.)*

## 5. Production & Transmedia (the back end)
The pipeline a finished story flows through:
- **Audio drama → Spotify** (TTS narration, episodes published as a Spotify show) — via the `save-to-spotify` skill + the **Sides & Sounds** formatter (prose → per-character sides + SFX sheet).
- **Motion comic / video** — Runway (Seedance 2 / veo3) + Hyperframes (HeyGen) for kinetic, animated tellings.
- **The "COF Studio" skill pack** — slash commands wrapping all of the above (`/cof-character`, `/cof-canon-check`, `/cof-voice`, `/cof-draft`, `/cof-sides`, `/cof-audio`, `/cof-motion`).

## 6. Community & GitHub
- Use GitHub as the **public roadmap + collaboration hub**: issues for "where this character is going," contributions, translations, lore proposals.
- Keep the canonical truth (bible/) authoritative; let the community build around the edges.

## 7. Near-term goals (the build order)
1. ✅ Master character roster + canon cleanup (Jawah Matu/Lawal/Kali/Baraka unified; Akrahuhum, Stampede, etc.).
2. **Character bible sheet** — human-editable + machine-queryable (arcs, beats, relationships, status). *(Design in progress.)*
3. **Power-scaling system** — the no-plot-armor quantified tiers (§4).
4. **COF Studio skill pack** — slash commands (§5).
5. **First full-pipeline story** — take one finished story end-to-end (draft → canon-check → sides → audio → Spotify) as a proof of concept.
6. **Public roadmap** — decide what goes public on GitHub and open it up.

*Correct anything here and it becomes the plan.*
