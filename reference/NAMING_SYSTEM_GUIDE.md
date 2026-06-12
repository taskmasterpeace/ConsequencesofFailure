# COF Universe Naming System Guide

## System Overview

The COF story filing system uses a **Year.Month_TYPE_Title** format to organize all narrative content in a way that automatically sorts chronologically while making the timeline structure visible at a glance.

### Format
```
YYYY.MM_CHARACTER_title.md
or
YYYY.MM_EVENT_title.md
```

**Where:**
- `YYYY` = Year in the COF timeline (1-8)
- `MM` = Month (01-12, using leading zeros)
- `TYPE` = Either CHARACTER (single POV) or EVENT (multiple POVs/global scope)
- `title` = Descriptive lowercase title with underscores instead of spaces

### Why This System Works

1. **Chronological Auto-Sorting**: Files sort naturally by creation date within the timeline
2. **Visual Timeline**: Opening a folder shows the entire story progression at a glance
3. **Quick Identification**: File names tell you immediately who the story focuses on and roughly when it happens
4. **Scalability**: Easily accommodates 8 years × 12 months × multiple characters
5. **Flexibility**: Handles multiple POVs through EVENT classification
6. **Future-Proof**: Easy to renumber if timeline estimates change

### Benefits

- **No date confusion**: Uses in-universe timeline, not real-world dates
- **Intuitive browsing**: Year folders contain monthly groupings naturally
- **Search-friendly**: Type "KAISER" and find all Kaiser stories; type "4.01" and find everything in Year 4, Month 1
- **Version control friendly**: Descriptive filenames work well in git history
- **Collaborative ready**: Clear naming prevents file conflicts and confusion

---

## CHARACTER vs EVENT Classification

### Use CHARACTER when:
- Single point-of-view (one character's perspective)
- Focused narrative arc within a chapter
- Personal journey, decision, or discovery
- Character development is the primary focus
- Multiple characters appear but one drives the narrative

**Examples:**
- `1.01_RUSTY_return.md` - Rusty coming home
- `5.06_KAISER_assassination.md` - Kaiser's perspective during the assassination
- `3.12_MURPHY_revelation.md` - Murphy discovering something crucial

### Use EVENT when:
- Multiple perspectives (multiple POV chapters within one story)
- Global/widespread occurrence affecting many characters
- World-changing moments that ripple across characters
- Requires switching between character perspectives to tell the full story
- Large-scale incidents or reveals

**Examples:**
- `4.01_EVENT_iron_eaters_arrive.md` - The arrival that affects everyone
- `2.06_EVENT_raghavan_bus_crash.md` - Major incident with multiple witnesses/perspectives
- `6.09_EVENT_final_confrontation.md` - Large-scale battle or meeting
- `7.03_EVENT_the_awakening.md` - Something that changes the world

---

## Year-by-Year Examples

### Year 1: The Beginning
The foundation of the COF universe. Rusty's return and early establishment.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `1.01_RUSTY_return.md` | CHARACTER | Rusty comes home to Caul-of-Fae |
| 02 | `1.02_RAGHAVAN_bus_crash.md` | CHARACTER | Raghavan survives the bus crash incident |
| 03 | `1.03_MURPHY_investigation.md` | CHARACTER | Murphy begins investigating strange occurrences |
| 06 | `1.06_EVENT_first_contact.md` | EVENT | Multiple characters encounter something impossible |
| 10 | `1.10_KAISER_extraction.md` | CHARACTER | Kaiser's first major extraction operation |
| 11 | `1.11_SAUL_recruitment.md` | CHARACTER | Saul is brought into the fold |
| 12 | `1.12_EVENT_winter_revelation.md` | EVENT | A major secret surfaces before winter |

### Year 2: Growth and Complications
The group expands and faces new threats.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `2.01_KAISER_training.md` | CHARACTER | Kaiser begins training the newcomers |
| 02 | `2.02_RUSTY_mentorship.md` | CHARACTER | Rusty takes on a mentor role |
| 03 | `2.03_MURPHY_breakthrough.md` | CHARACTER | Murphy makes a crucial discovery about the rules |
| 05 | `2.05_EVENT_faction_split.md` | EVENT | Disagreements cause a split in the group |
| 07 | `2.07_RAGHAVAN_reckoning.md` | CHARACTER | Raghavan confronts his past |
| 09 | `2.09_SAUL_sacrifice.md` | CHARACTER | Saul makes a difficult choice |
| 11 | `2.11_EVENT_enemy_emerges.md` | EVENT | A new antagonistic force reveals itself |
| 12 | `2.12_KAISER_dark_decision.md` | CHARACTER | Kaiser makes a morally complex choice |

### Year 3: Conflict Deepens
The stakes rise and alliances are tested.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `3.01_RUSTY_vulnerability.md` | CHARACTER | Rusty's weaknesses are exploited |
| 03 | `3.03_MURPHY_obsession.md` | CHARACTER | Murphy becomes obsessed with solving a mystery |
| 04 | `3.04_EVENT_betrayal_uncovered.md` | EVENT | A long-hidden betrayal comes to light |
| 06 | `3.06_KAISER_hunted.md` | CHARACTER | Kaiser becomes the hunted instead of hunter |
| 08 | `3.08_RAGHAVAN_downfall.md` | CHARACTER | Raghavan hits a critical low point |
| 10 | `3.10_SAUL_redemption.md` | CHARACTER | Saul works toward redemption |
| 11 | `3.11_EVENT_convergence.md` | EVENT | Multiple plot threads converge catastrophically |

### Year 4: Transformation
The group adapts and evolves in response to crisis.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `4.01_EVENT_iron_eaters_arrive.md` | EVENT | A major external threat arrives |
| 02 | `4.02_KAISER_rebuild.md` | CHARACTER | Kaiser works to rebuild the fractured group |
| 04 | `4.04_MURPHY_acceptance.md` | CHARACTER | Murphy finally accepts her role |
| 05 | `4.05_EVENT_defensive_stand.md` | EVENT | The group makes a stand against the threat |
| 07 | `4.07_RUSTY_legacy.md` | CHARACTER | Rusty considers her legacy and future |
| 09 | `4.09_SAUL_evolution.md` | CHARACTER | Saul shows significant growth and change |
| 10 | `4.10_EVENT_victory_and_loss.md` | EVENT | A pyrrhic victory with unexpected costs |
| 12 | `4.12_RAGHAVAN_renewal.md` | CHARACTER | Raghavan finds new purpose |

### Year 5: Hidden Depths
Deeper mysteries emerge about the COF universe.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `5.01_EVENT_ancient_knowledge.md` | EVENT | Something ancient awakens or is discovered |
| 02 | `5.02_MURPHY_connection.md` | CHARACTER | Murphy discovers she has a special connection |
| 04 | `5.04_KAISER_past_revealed.md` | CHARACTER | Kaiser's hidden past comes into focus |
| 06 | `5.06_KAISER_assassination.md` | CHARACTER | Kaiser narrowly escapes assassination attempt |
| 07 | `5.07_EVENT_fractured_timeline.md` | EVENT | Evidence suggests timeline inconsistencies |
| 08 | `5.08_RUSTY_inheritance.md` | CHARACTER | Rusty inherits something unexpected |
| 10 | `5.10_SAUL_transformation.md` | CHARACTER | Saul undergoes a fundamental transformation |
| 11 | `5.11_EVENT_convergence_point.md` | EVENT | Multiple forces converge at a critical juncture |

### Year 6: Escalation
The stakes become personal and cosmic simultaneously.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `6.01_RAGHAVAN_prophecy.md` | CHARACTER | Raghavan learns of a prophecy concerning him |
| 02 | `6.02_MURPHY_sacrifice.md` | CHARACTER | Murphy prepares for a great sacrifice |
| 03 | `6.03_EVENT_dimensional_breach.md` | EVENT | Something breaches between dimensions |
| 05 | `6.05_KAISER_recruitment.md` | CHARACTER | Kaiser recruits unexpected allies |
| 06 | `6.06_RUSTY_doubt.md` | CHARACTER | Rusty questions everything she believed |
| 07 | `6.07_EVENT_ritual_preparation.md` | EVENT | A complex ritual is prepared with multiple participants |
| 08 | `6.08a_SAUL_confrontation.md` | CHARACTER | Saul confronts his greatest fear (part 1 of 2) |
| 08b | `6.08b_SAUL_transformation.md` | CHARACTER | Saul is forever changed by the encounter (part 2 of 2) |
| 10 | `6.10_EVENT_eclipse.md` | EVENT | Something significant happens during an eclipse |

### Year 7: Culmination
The endgame begins to crystallize.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `7.01_EVENT_the_awakening.md` | EVENT | Something ancient and terrible awakens |
| 02 | `7.02_KAISER_last_gambit.md` | CHARACTER | Kaiser executes a final dangerous plan |
| 03 | `7.03_MURPHY_revelation.md` | CHARACTER | Murphy learns the truth about her origins |
| 04 | `7.04_EVENT_forces_gather.md` | EVENT | All factions gather for a final reckoning |
| 05 | `7.05_RUSTY_acceptance.md` | CHARACTER | Rusty comes to terms with her role |
| 06 | `7.06_SAUL_anchor.md` | CHARACTER | Saul becomes the anchor that holds reality |
| 07 | `7.07_RAGHAVAN_ascension.md` | CHARACTER | Raghavan undergoes a profound change |
| 09 | `7.09_EVENT_the_convergence.md` | EVENT | All plotlines converge in one moment |
| 11 | `7.11_EVENT_aftermath.md` | EVENT | The immediate aftermath of the convergence |

### Year 8: New Beginnings
The resolution and what comes after.

| Month | File | Type | Description |
|-------|------|------|-------------|
| 01 | `8.01_KAISER_reckoning.md` | CHARACTER | Kaiser must reckon with the changes |
| 02 | `8.02_MURPHY_rebirth.md` | CHARACTER | Murphy discovers what she has become |
| 03 | `8.03_EVENT_world_rebuilding.md` | EVENT | The group works to rebuild a changed world |
| 04 | `8.04_RUSTY_choice.md` | CHARACTER | Rusty must choose her next path |
| 05 | `8.05_SAUL_freedom.md` | CHARACTER | Saul experiences true freedom for first time |
| 06 | `8.06_RAGHAVAN_peace.md` | CHARACTER | Raghavan finds unexpected peace |
| 08 | `8.08_EVENT_new_threats.md` | EVENT | New threats emerge from the changes |
| 10 | `8.10_EVENT_epilogue.md` | EVENT | The world settles into its new normal |

---

## Naming Conventions

### Character Names
- **Always use UPPERCASE for character names**
- Use the character's primary name or recognizable nickname
- Examples: `RUSTY`, `KAISER`, `MURPHY`, `RAGHAVAN`, `SAUL`
- If a character goes by multiple names, choose the most canonical one for consistency

### Titles
- **Use lowercase with underscores for title separators**
- Replace spaces with underscores
- Keep titles descriptive but concise (3-7 words is ideal)
- Use present tense or noun forms
- Be specific enough to distinguish from other stories

**Good examples:**
- `return` (simple and clear)
- `bus_crash` (specific event)
- `assassination_attempt` (clear stakes)
- `first_contact` (notable moment)
- `dark_decision` (thematic)

**Avoid:**
- `thing_that_happened` (too vague)
- `chapter_1` (too generic)
- `part_one` (confusing with a/b notation)
- MIXED_Case_Titles (inconsistent)

### Months and Numbers
- **Always use leading zeros**: `01` not `1`, `09` not `9`
- Months are 1-12 representing in-universe months
- Years are 1-8 representing in-universe years
- Not tied to real-world calendar dates

### File Extensions
- All files use `.md` (Markdown format)
- No other extensions unless absolutely necessary

### Special Characters
- No spaces in filenames (use underscores instead)
- No special characters (@, #, $, etc.)
- No accented characters (use plain equivalents)
- No parentheses or brackets in filenames

---

## Handling Special Cases

### Multiple Characters in One Scene
**Decision Tree:**
1. Who has the primary POV? Use CHARACTER with that person's name
2. Do perspectives shift equally? Use EVENT
3. Is the scene brief, nested in another story? Include in the main character's file

**Examples:**
- Kaiser and Murphy confront an enemy, but it's mostly from Kaiser's perspective: `4.05_KAISER_interrogation.md`
- Kaiser and Murphy confront an enemy with equal POV weight: `4.05_EVENT_interrogation.md`
- A brief scene where Murphy observes Rusty's decision: Include in `5.03_RUSTY_decision.md` (don't make a separate file)

### Splitting Long Stories (A/B notation)
Use when a story is too long/complex or spans significant time gaps.

**Rules:**
- Use `a` and `b` (lowercase, no parentheses)
- Format: `YYYY.MM[a/b]_TYPE_title.md`
- Put the split marker right after the month: `5.06a_KAISER_escape.md` and `5.06b_KAISER_hideout.md`
- Keep part one and part two in the same month (or adjacent months if separated by time)
- Maximum 2-3 parts per story (if more needed, restructure into separate stories)

**Examples:**
- `6.08a_SAUL_confrontation.md` → `6.08b_SAUL_transformation.md`
- `3.11a_EVENT_betrayal_discovery.md` → `3.11b_EVENT_betrayal_fallout.md`

**When to use a/b:**
- Story is over 5,000 words
- Natural break point exists (scene change, time jump)
- Logical story division is clear

**When NOT to use a/b:**
- Just create separate monthly entries instead
- If you have `1.04a` and `1.04b`, consider making them `1.04` and `1.05` instead

### Uncertain Timing
If you're unsure when a story occurs:
1. **Use your best estimate** - place it where you think it belongs
2. **Add a note** at the top of the file: `<!-- Timeline: Estimated Year X, Month XX -->`
3. **Renumber later** - once you're certain, it's easy to rename and reorganize
4. **Don't let uncertainty paralyze you** - a file in the wrong month is better than no file

### Stories That Span Multiple Months
If a story naturally covers events across multiple months:
1. **Split them up** - create separate files for each month's action
2. **Use cross-references** - include links between files
3. **Create an EVENT file** - for the overall arc, linking to individual chapters

**Example:**
- `5.03_KAISER_investigation_begins.md` (Month 3 investigation start)
- `5.04_KAISER_trail_grows_warm.md` (Month 4 escalation)
- `5.05_EVENT_investigation_culmination.md` (Month 5 major revelation connecting both)

### Alternate Perspectives of Same Event
Create separate files for each character's POV, cross-reference them.

**Example:**
- `4.10_KAISER_the_stand.md` - Kaiser's perspective on the battle
- `4.10_MURPHY_the_stand.md` - Murphy's perspective on the same battle
- Both files reference each other: "See also: 4.10_KAISER_the_stand.md"

---

## Folder Organization Structure

Recommended directory structure:

```
COF_Universe/
├── Year_1/
│   ├── 1.01_RUSTY_return.md
│   ├── 1.02_RAGHAVAN_bus_crash.md
│   ├── 1.03_MURPHY_investigation.md
│   └── ... (through month 12)
├── Year_2/
│   ├── 2.01_KAISER_training.md
│   ├── 2.02_RUSTY_mentorship.md
│   └── ...
├── Year_3/
├── Year_4/
├── Year_5/
├── Year_6/
├── Year_7/
├── Year_8/
├── NAMING_SYSTEM_GUIDE.md (this file)
├── TIMELINE_OVERVIEW.md (optional: quick reference)
└── CHARACTER_INDEX.md (optional: all characters and their appearances)
```

Alternative flat structure (all files in one folder):
```
COF_Stories/
├── 1.01_RUSTY_return.md
├── 1.02_RAGHAVAN_bus_crash.md
├── 1.03_MURPHY_investigation.md
├── 2.01_KAISER_training.md
├── ... (files sort chronologically automatically)
└── NAMING_SYSTEM_GUIDE.md
```

---

## Quick Reference: Character Name Conventions

| Character | Use In Filenames | Alternate Forms (don't use) |
|-----------|------------------|---------------------------|
| Rusty | RUSTY | Rusty, rusty, Rust |
| Kaiser | KAISER | Kaiser, kaiser, The Kaiser |
| Murphy | MURPHY | Murphy, murphy, Murph |
| Raghavan | RAGHAVAN | Raghavan, raghavan, Ragh |
| Saul | SAUL | Saul, saul, Saulie |

*Add more characters as your universe expands*

---

## Practical Workflow

### When You Write a New Story:
1. **Identify the month** (best guess is fine)
2. **Determine CHARACTER or EVENT** (is it single or multiple POV?)
3. **Choose the character** (if CHARACTER file)
4. **Write a descriptive title** (lowercase, underscores, 3-7 words)
5. **Create file** in appropriate year folder
6. **Start writing** (you can always rename later)

### When Organizing Existing Stories:
1. **Read through your scattered files**
2. **Assign each to a month** (use internal story clues about timing)
3. **Identify POV type** (single character vs. EVENT)
4. **Rename systematically** (one folder at a time)
5. **Update cross-references** if you're linking files

### When Searching for a Story:
- Looking for a specific character? Search: `CHARACTERNAME`
- Looking for a specific month? Search: `X.MM_` (e.g., `4.06_`)
- Looking for a specific year? Navigate to `Year_X/` folder
- Looking for events? Search: `EVENT`

---

## Timeline Overview Table

**At a glance: What happens each year?**

| Year | Focus | Key Characters | Major Events |
|------|-------|-----------------|--------------|
| **Year 1** | Foundation | Rusty, Raghavan, Murphy, Kaiser | Rusty returns, group forms, first discoveries |
| **Year 2** | Growth | All main cast | Expansion, tensions rise, enemies emerge |
| **Year 3** | Conflict | All main cast | Betrayals, stakes escalate, low point |
| **Year 4** | Transformation | All main cast | External threat arrives, regrouping, victory |
| **Year 5** | Hidden Depths | Kaiser, Murphy | Ancient knowledge, special connections, prophecy hints |
| **Year 6** | Escalation | All main cast | Dimensional breach, preparation, transformations |
| **Year 7** | Culmination | All main cast | Awakening, final convergence, climax |
| **Year 8** | Resolution | All main cast | Reckoning, rebuilding, new normal |

---

## Troubleshooting Common Questions

### Q: I have a story but don't know which year/month it's in
**A:** Make your best guess based on:
- Character age/development
- References to other events
- Tone and urgency level
- Relationships between characters
- Add a comment at the top: `<!-- UNCERTAIN TIMING - REVIEW PLACEMENT -->`
- You can always renumber later when you have the full timeline

### Q: Should "The Awakening" be an EVENT or a CHARACTER file?
**A:** If multiple characters experience it differently and you show multiple perspectives in the file, use EVENT. If one character's reaction/experience is the focus, use CHARACTER and have them witness it.

### Q: Can I have multiple files with the same month?
**A:** Absolutely! This is the whole point. `4.03_KAISER_escape.md` and `4.03_MURPHY_arrival.md` both happen in Year 4, Month 3, just with different characters.

### Q: What if a story happens over multiple days but all in the same month?
**A:** Keep it in one file. Only split it into multiple months if there's a significant time gap (days become weeks, plot changes direction).

### Q: Should I include the year/month in the story text itself?
**A:** Not required, but helpful! Add it as metadata at the top:
```markdown
# Story Title

> Year 4, Month 3 | Kaiser's POV

Story text begins here...
```

### Q: Can I use abbreviations for character names?
**A:** No, keep them consistent and full. Use KAISER, not K or KAISE. This prevents search confusion and looks more professional.

### Q: What if a character doesn't have a clear name?
**A:** Use a descriptive identifier in ALL CAPS:
- `THEWANDERER` (if they're always called The Wanderer)
- `SHADOWFIGURE` (if they're mysterious)
- `PRIESTESS` (if role defines them)
- Then use that consistently

### Q: How do I handle prequels or side stories set outside Years 1-8?
**A:** You have options:
- `0.01_CHARACTER_backstory.md` (for Year 0 prequels)
- `X.MM_CHARACTER_history.md` (if it's referenced in-universe)
- `SIDE_CHARACTER_sidequest.md` (for alternate universe/side stories)
- Create a separate `Supplementary/` folder for non-canon or optional stories

---

## Version Control Hints (for Git users)

The naming system works beautifully with git:

```bash
# See the entire timeline in commit order
git log --oneline

# Find all Kaiser stories
git log --follow --name-only | grep KAISER

# See what happened in Year 4
git log --follow --name-only | grep "^4\."

# View changes to a specific story
git log -p 4.05_EVENT_defensive_stand.md

# See the timeline visually
ls -la | grep "^[0-8]\.[0-9]"
```

---

## Final Tips

1. **Consistency is key** - Always use the same character names
2. **Start simple** - Don't overthink the timing, just write
3. **Renumber fearlessly** - It's easy to rename files later
4. **Use descriptive titles** - Future you will thank present you
5. **Link between stories** - Add "See also: [filename]" references in your files
6. **Keep a notes file** - Track what you know about timing and character arcs
7. **Review quarterly** - Every few months, look at your file structure and clean up
8. **Trust the system** - Once you're in it, it scales beautifully

---

## Summary

The COF naming system is simple, elegant, and powerful:

- **Format**: `YYYY.MM_TYPE_title.md`
- **Types**: CHARACTER (single POV) or EVENT (multiple POV)
- **Benefits**: Auto-sorting, visual timeline, searchable, scalable
- **Rules**: Leading zeros, UPPERCASE names, lowercase_titles, underscores not spaces
- **Flexibility**: Handle complex cases with a/b splits, uncertain timing, multiple perspectives

Start using it now, and your entire universe of stories will organize itself. Happy writing!
