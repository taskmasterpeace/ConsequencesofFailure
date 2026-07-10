# SPEAR — Global LSW Intelligence Console

**Open `spear.html` (repo root) in any browser. That's it — one file, works offline.**

CIA-style situation console for the COF universe: the world map with intelligence
overlays, dossiers for all ~134 named persons, country files for all 168 nations,
faction/xeno files, the Power Index, the story archive, and the Canon Desk (every
open ruling in one place). In-universe wink: SPEAR is the global console the UN
rejected — the creator gets the tool the world never built.

## Rebuild (after canon changes)

```bash
node tools/spear/build.mjs
```

Reads, at build time:

| Source | Feeds |
|---|---|
| `canon/countries/Country Master Sheet - Country.csv` | country files + map overlays (canonical) |
| `canon/countries/Country Master Sheet - Cities.csv` | cities, HVT, crime/safety |
| `bible/CHARACTER_ROSTER.md` | the roster of record (leads / index / supporting) |
| `bible/characters/*.md`, `canon/characters/*` | per-person attached documents |
| `bible/factions/*.md`, `canon/aliens/*` | faction + xeno files |
| `bible/powers/POWER_SYSTEM.md` | the CPI module (ladder, attributes, worked examples) |
| `prose/**` | the archive (word counts, trust layer, cast scan) |
| `tools/spear/vendor/countries-110m.json` | world geometry (vendored, offline) |

## Where things are curated by hand (edit in `build.mjs`)

- **Canon Desk rulings** — the `rulings` array mirrors `bible/CANON_STATUS.md`.
  When a ruling lands, update both (or ask Claude to).
- **Lead → country map** (`LEAD_COUNTRY`), **character → document map** (`CHAR_DOCS`),
  **CSV → map-name aliases** (`MAP_ALIAS`), **micro-territory markers** (`MARKERS`).
- **Produced catalog** (`PRODUCED`).

## Conventions the console encodes

- **Trust doctrine**: every attached document carries a badge — `RAW SOURCE`
  (creator originals), `AI-DERIVED · VERIFY` (the rewrite layer), `BIBLE`
  (consolidated). Originals beat the rewrite layer; conflicts are flagged, never
  silently resolved.
- **Congo rows**: the sheet's two Congo entries look label-swapped (89.5M vs 5.6M);
  the build joins them to the map **by population** and the anomaly is flagged on
  the Canon Desk + in `CANON_STATUS.md` — creator to rule.

## Keyboard

`/` or `Ctrl+K` search everything · `1–6` switch modules · `Esc` close ·
wheel/drag to zoom/pan the map · click the wire (bottom) to jump to the Canon Desk.

Legacy consoles (`story-bible-explorer.html`, `duplicate-manager.html`,
`reference/DASHBOARD.html`) still work; SPEAR supersedes the explorer + dashboard.
