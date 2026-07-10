#!/usr/bin/env node
/**
 * SPEAR — Global LSW Intelligence Console (build)
 * Compiles canon + bible + country sheets into one self-contained spear.html.
 *
 * Usage:  node tools/spear/build.mjs
 * Output: spear.html (repo root)
 *
 * Zero dependencies. Reads:
 *   canon/countries/Country Master Sheet - Country.csv   (canonical geopolitical spine)
 *   canon/countries/Country Master Sheet - Cities.csv
 *   bible/CHARACTER_ROSTER.md                            (cast of record)
 *   bible/characters/*.md, bible/factions/*.md, bible/powers/*.md
 *   canon/characters/*, canon/aliens/*, prose/*
 *   tools/spear/vendor/countries-110m.json               (world geometry)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const rd = (...p) => fs.readFileSync(path.join(ROOT, ...p), 'utf8');
const exists = (...p) => fs.existsSync(path.join(ROOT, ...p));
const listDir = (...p) => (exists(...p) ? fs.readdirSync(path.join(ROOT, ...p)) : []);
const warn = (m) => console.warn('  [warn] ' + m);

// ---------------------------------------------------------------- CSV parser
function parseCSV(text) {
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n') { row.push(cur.replace(/\r$/, '')); rows.push(row); row = []; cur = ''; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur.replace(/\r$/, '')); rows.push(row); }
  return rows;
}
const num = (v) => { const n = parseFloat(String(v).replace(/[, ]/g, '')); return Number.isFinite(n) ? n : null; };
const clean = (v) => String(v ?? '').trim();

// ---------------------------------------------------------------- countries
const countryRows = parseCSV(rd('canon', 'countries', 'Country Master Sheet - Country.csv'));
const countries = [];
for (const r of countryRows.slice(2)) {
  const name = clean(r[1]);
  if (!name) continue;
  countries.push({
    code: clean(r[0]) || null, name,
    pop: num(r[2]), popRating: num(r[3]),
    motto: clean(r[4]) || null, nationalities: clean(r[5]) || null,
    govType: clean(r[6]) || null, govPerception: clean(r[7]) || null,
    corruption: num(r[8]), presTerm: num(r[9]),
    military: num(r[10]), milBudget: num(r[11]),
    intel: num(r[12]), intelBudget: num(r[13]),
    capPun: clean(r[14]) || null, mediaFreedom: num(r[15]),
    lawEnf: num(r[16]), lawEnfBudget: num(r[17]),
    gdp: num(r[18]), gdpPC: num(r[19]),
    healthcare: num(r[20]), higherEd: num(r[21]),
    socialDev: num(r[22]), lifestyle: num(r[23]),
    terrorism: num(r[24]), cyber: num(r[25]),
    digital: num(r[26]), science: num(r[27]),
    cloning: clean(r[28]) || null, lswActivity: num(r[29]),
    lswReg: clean(r[30]) || null, leaderTitle: clean(r[31]) || null,
    vigilantism: clean(r[32]) || null,
    president: clean(r[33]) || null, presGender: clean(r[34]) || null,
    cities: [],
  });
}
console.log(`countries: ${countries.length}`);

// ---------------------------------------------------------------- cities
const cityRows = parseCSV(rd('canon', 'countries', 'Country Master Sheet - Cities.csv'));
const byCountry = new Map(countries.map(c => [c.name.toLowerCase(), c]));
let cityCount = 0;
for (const r of cityRows.slice(1)) {
  const cityName = clean(r[3]), countryName = clean(r[4]);
  if (!cityName || !countryName || num(r[5]) === null) continue;
  const c = byCountry.get(countryName.toLowerCase());
  const city = {
    name: cityName, pop: num(r[5]),
    types: [r[8], r[9], r[10], r[11]].map(clean).filter(Boolean),
    hvt: clean(r[12]) || null, crime: num(r[13]), safety: num(r[14]),
  };
  if (c) { c.cities.push(city); cityCount++; }
}
for (const c of countries) c.cities.sort((a, b) => (b.pop || 0) - (a.pop || 0));
console.log(`cities linked: ${cityCount}`);

// ---------------------------------------------------------------- world map (TopoJSON 110m -> SVG paths)
const topo = JSON.parse(rd('tools', 'spear', 'vendor', 'countries-110m.json'));
const TR = topo.transform;
const decodedArcs = topo.arcs.map(arc => {
  let x = 0, y = 0;
  return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * TR.scale[0] + TR.translate[0], y * TR.scale[1] + TR.translate[1]]; });
});
const W = 1000, H = 500;
const proj = ([lon, lat]) => [((lon + 180) / 360) * W, ((90 - lat) / 180) * H];
function ringFromArcs(arcIdxs) {
  const pts = [];
  for (const ai of arcIdxs) {
    let arc = ai >= 0 ? decodedArcs[ai] : decodedArcs[~ai].slice().reverse();
    if (pts.length) arc = arc.slice(1);
    pts.push(...arc);
  }
  // unwrap the antimeridian: keep longitudes continuous so rings that cross
  // ±180° (Russia, Fiji) don't smear across the canvas; recentre if needed
  let prev = null;
  const un = pts.map(([lon, lat]) => {
    if (prev != null) { while (lon - prev > 180) lon -= 360; while (lon - prev < -180) lon += 360; }
    prev = lon;
    return [lon, lat];
  });
  const mean = un.reduce((a, p) => a + p[0], 0) / un.length;
  const shift = mean > 180 ? -360 : mean < -180 ? 360 : 0;
  return shift ? un.map(([lon, lat]) => [lon + shift, lat]) : un;
}
function geomToPath(geom) {
  const polys = geom.type === 'Polygon' ? [geom.arcs] : geom.type === 'MultiPolygon' ? geom.arcs : [];
  let d = '';
  for (const poly of polys) for (const ring of poly) {
    const pts = ringFromArcs(ring).map(proj);
    if (pts.length < 3) continue;
    d += 'M' + pts.map(([x, y]) => `${Math.round(x * 10) / 10} ${Math.round(y * 10) / 10}`).join('L') + 'Z';
  }
  return d;
}
// CSV name -> map name aliases (110m naming)
const MAP_ALIAS = {
  'united states': 'United States of America',
  'czech republic': 'Czechia',
  'ivory coast': "Côte d'Ivoire",
  'north macedonia': 'Macedonia',
  'bosnia and herzegovina': 'Bosnia and Herz.',
  'solomon islands': 'Solomon Is.',
  'equatorial guinea': 'Eq. Guinea',
  'western sahara': 'W. Sahara',
  'central african republic': 'Central African Rep.',
  'south sudan': 'S. Sudan',
  'dominican republic': 'Dominican Rep.',
  'the bahamas': 'Bahamas',
  // Joined by population (flagged on the Canon Desk): the sheet's "Republic of the
  // Congo" (89.5M) carries DR Congo's numbers; "Congo" (5.6M) carries the Republic's.
  'republic of the congo': 'Dem. Rep. Congo',
  'congo': 'Congo',
};
// mapless micro-territories -> lon/lat markers
const MARKERS = {
  'Monaco': [7.42, 43.73], 'Andorra': [1.52, 42.51], 'Singapore': [103.82, 1.35],
  'Hong Kong': [114.17, 22.32], 'Bahrain': [50.55, 26.07], 'São Tomé and Príncipe': [6.61, 0.19],
};

const geoms = topo.objects.countries.geometries.filter(g => g.properties.name !== 'Antarctica');
const mapByName = new Map(geoms.map(g => [g.properties.name.toLowerCase(), g]));
const mapPaths = []; const matched = new Set();
for (const c of countries) {
  const key = c.name.toLowerCase();
  const mapName = MAP_ALIAS[key] || c.name;
  const g = mapByName.get(mapName.toLowerCase());
  if (g) { c.mapKey = g.properties.name; matched.add(g.properties.name); }
  else if (MARKERS[c.name]) { const [x, y] = proj(MARKERS[c.name]); c.marker = [Math.round(x * 10) / 10, Math.round(y * 10) / 10]; }
  else warn(`no map geometry: ${c.name}`);
}
for (const g of geoms) {
  mapPaths.push({ key: g.properties.name, d: geomToPath(g), file: matched.has(g.properties.name) });
}
console.log(`map: ${mapPaths.length} shapes, ${matched.size} with country files`);

// ---------------------------------------------------------------- trust layer
function layerOf(relPath) {
  const base = path.basename(relPath);
  if (relPath.startsWith('bible/')) return 'BIBLE';
  if (/^[A-Z0-9_]+\.(md|txt)$/.test(base.replace(/[ ()'-]/g, '_'))) return 'VERIFY';
  if (base === base.toUpperCase() && /\.md$/i.test(base)) return 'VERIFY';
  if (/[a-z]/.test(base.replace(/\.(txt|md|docx)$/i, ''))) return 'TRUST';
  return 'VERIFY';
}
const CAP = 18000;
function docOf(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;
  let text = fs.readFileSync(abs, 'utf8');
  const words = (text.match(/\S+/g) || []).length;
  let truncated = false;
  if (text.length > CAP) { text = text.slice(0, CAP); truncated = true; }
  return { path: relPath, layer: layerOf(relPath), words, truncated, text };
}

// ---------------------------------------------------------------- characters (roster of record)
const roster = rd('bible', 'CHARACTER_ROSTER.md');
const stripMd = (s) => s.replace(/\*\*/g, '').replace(/\`/g, '').trim();

function tableRows(md, heading) {
  const start = md.indexOf(heading);
  if (start < 0) return [];
  const sect = md.slice(start, md.indexOf('\n## ', start + 1) > -1 ? md.indexOf('\n## ', start + 1) : md.length);
  return sect.split('\n').filter(l => l.startsWith('|') && !/^\|[-\s|]+\|$/.test(l) && !/^\| ?Name/.test(l))
    .map(l => l.slice(1, -1).split('|').map(c => c.trim()));
}

const LEAD_COUNTRY = {
  'Rusty Richards': ['United States'], 'John Rivers "Stampede"': ['United States'],
  'Kaiser Eziobi': ['Nigeria'], 'Moses Apio': ['Uganda'], 'Johnny Rain': ['Uganda'],
  'Charles Sapphire': ['United States'], 'Vaughn Galloway': ['United States'],
  'Todd "Shogun" Benchley': ['United States'], 'Col. Raghavan Reddy': ['India'], 'Asha': ['India'],
  'Liu Xiao': ['China'], 'Zhang Wei': ['China'], 'Cissy Oliva': ['Uganda'],
  'Sgt. Eugene "Gene" Bonny': ['United States'], 'Rob Holt': ['United States'],
  'Jance Bloomberg': ['United States', 'Mexico'], 'King Stefanos': ['Greece'],
  'Jawah Matu': ['Tanzania'], 'Hank "Crossfire" Foster': ['United States'],
  'Janine Lober': ['United States'], 'Pole Zimmerman': ['United States'],
  'Karine Abrahamian': ['Armenia'], 'Ramiro Guzman': ['Mexico'], 'Sandra': ['United States'],
};
const COUNTRY_NORMALIZE = { 'USA': 'United States', 'UK': 'United Kingdom' };
const slug = (s) => s.toLowerCase().replace(/["'.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const characters = [];
const seen = new Set();
function pushChar(ch) {
  const k = slug(ch.name);
  if (seen.has(k)) return null;
  seen.add(k); ch.id = k; characters.push(ch); return ch;
}

for (const cells of tableRows(roster, '## Leads / developed characters')) {
  if (cells.length < 5) continue;
  const rawName = cells[0];
  const name = stripMd((rawName.match(/\*\*([^*]+)\*\*/) || [, rawName])[1]);
  const aliases = [...rawName.matchAll(/"([^"]+)"/g)].map(m => stripMd(m[1])).filter(a => a !== name);
  const inner = rawName.match(/\(([^)]*)\)/); // relatives etc live here too
  const dev = stripMd((cells[4].match(/\*\*([A-Z][A-Za-z→ /-]+)\*\*/) || [, 'SOLID'])[1]);
  const flags = [];
  if (/CONTAMINATED/i.test(cells[4])) flags.push('CONTAMINATED DOWNSTREAM');
  if (/uncatalogued|MISFILED|NOT in index/i.test(cells[4] + cells[0])) flags.push('INDEX GAP');
  if (/⚠|flag/i.test(cells[4])) flags.push('OPEN FLAG');
  pushChar({
    name, aliases, tier: 'lead',
    affiliation: stripMd(cells[1]),
    countries: LEAD_COUNTRY[name] || [],
    power: stripMd(cells[2]),
    powered: !/non-powered/i.test(cells[2]),
    dev, devNote: stripMd(cells[4]),
    sources: stripMd(cells[3]),
    kin: inner ? stripMd(inner[1]) : null,
    flags, docs: [],
  });
}
console.log(`leads: ${characters.length}`);

for (const cells of tableRows(roster, '## The wider roster (index-only one-liners)')) {
  if (cells.length < 3) continue;
  const name = stripMd(cells[0]);
  if (/black woman jackal/i.test(name)) continue; // merged into Sandra per roster
  const country = COUNTRY_NORMALIZE[stripMd(cells[1])] || stripMd(cells[1]);
  pushChar({
    name, aliases: [], tier: 'index',
    affiliation: country,
    countries: byCountry.has(country.toLowerCase()) ? [country] : [],
    power: stripMd(cells[2]),
    powered: !/non-powered/i.test(cells[2]),
    dev: 'INDEX', devNote: 'Index-only one-liner — a story card waiting to be played.',
    sources: 'CHARACTER_INDEX.md via bible/CHARACTER_ROSTER.md',
    kin: null, flags: [], docs: [],
  });
}

// supporting cast — bold names inside the faction + 2026-06-26 sections
const SUPPORT_BLOCKS = [
  ['## Factions / organizations', {
    'Deck 52': ['United States'], 'FIST': ['United States'], 'Establishment 24': ['India'],
    "Shooter's Club": ['United States'], 'Cuatro Dedos': ['Mexico'], 'Hand of Uganda': ['Uganda'],
    'I Deserve Better': ['United States'], 'Grays': [], 'Otherworld': [],
  }],
  ['## Added 2026-06-26', {
    'Cuatro Dedos': ['Mexico'], 'China': ['China'], 'Establishment 24': ['India'],
    'Shooters Club': ['United States'], 'Deck 52': ['United States'],
    'Its Voice': ['United States'], 'I Deserve Better': ['United States'],
  }],
];
const NOT_PEOPLE = /^(Deck 52|FIST|SPEAR|Establishment 24|The Shooter's Club|Cuatro Dedos|Hand of Uganda|I Deserve Better|The Grays|Zuma Rock|The Alliance of Four|The Jackals|EagleSoft|The Otherworld|TASK|Iron Eaters|The Slaught|The Deep|CONDEMNED|SHOT|PRODUCED|DRAFT|NEW|PROPOSED|RULED|RESOLVED|NOT|Q |K |Ace |NuroNuro|RoboForge|MIT|Bitcoin|Cheat Check|DARK IRONY|Akrahuhum|✅.*)/i;
for (const [heading, ctxMap] of SUPPORT_BLOCKS) {
  const start = roster.indexOf(heading);
  if (start < 0) continue;
  const sect = roster.slice(start, roster.indexOf('\n## ', start + 1));
  for (const line of sect.split('\n')) {
    if (!line.startsWith('-')) continue;
    let ctxName = 'Supporting cast', ctxCountries = [];
    for (const [k, v] of Object.entries(ctxMap)) if (line.slice(0, 90).includes(k)) { ctxName = k; ctxCountries = v; break; }
    for (const m of line.matchAll(/\*\*([^*]+)\*\*/g)) {
      let nm = stripMd(m[1]).replace(/[",]/g, '').replace(/\.$/, '').trim();
      nm = nm.replace(/^["“”']|["“”']$/g, '');
      if (nm.length < 3 || nm.length > 40 || NOT_PEOPLE.test(nm)) continue;
      if (!/^[A-ZÀ-Ž]/.test(nm) || /^(SOLID|THIN|CHECK|SCATTERED|Dr\.$)/.test(nm)) continue;
      if (/RULED|✅|⚠|the |The$/.test(nm) && !/^The [A-Z]/.test(nm)) continue;
      const after = line.slice(m.index + m[0].length, m.index + m[0].length + 90);
      const role = (after.match(/\(([^)]{2,80})\)/) || [])[1] || null;
      pushChar({
        name: nm, aliases: [], tier: 'support',
        affiliation: ctxName, countries: ctxCountries,
        power: role ? stripMd(role) : 'Supporting cast', powered: false,
        dev: 'SUPPORT', devNote: `Named in the ${ctxName} material — supporting cast.`,
        sources: 'bible/CHARACTER_ROSTER.md', kin: null, flags: [], docs: [],
      });
    }
  }
}
console.log(`characters total: ${characters.length}`);

// attach per-character documents (bible locked notes + canon originals)
const CHAR_DOCS = {
  'john-rivers-stampede': ['bible/characters/STAMPEDE.md', 'canon/characters/Stampede.txt'],
  'kaiser-eziobi': ['bible/characters/KAISER_EZIOBI.md', 'canon/characters/Eziobi.txt', 'canon/characters/KAISER_STRATEGIC_ABILITIES.md'],
  'king-stefanos': ['bible/characters/KING_STEFANOS.md', 'canon/characters/King Stefanos_ These Wounds, They Will Not Heal.txt'],
  'liu-xiao': ['bible/characters/LIU_XIAO.md', 'canon/characters/Liu Xaio Story Spine.txt'],
  'zhang-wei': ['bible/characters/ZHANG_WEI.md'],
  'jawah-matu': ['bible/characters/JAWAH_MATU.md', 'canon/characters/Jawah Matu .txt', 'canon/characters/Lawal.txt'],
  'todd-shogun-benchley': ['bible/characters/TODD_BENCHLEY.md', 'canon/characters/Benchley Series.txt'],
  'zephaniah-mwangaza': ['bible/characters/ZEPHANIAH_MWANGAZA.md'],
  'johnny-rain': ['canon/characters/Jonny Rain.txt'],
  'jance-bloomberg': ['canon/characters/Jance Bloomberg.txt', 'canon/characters/Mexico Kid.txt'],
  'karine-abrahamian': ['canon/characters/Karina.txt'],
  'pole-zimmerman': ['canon/characters/Pole Zimmerman.txt'],
  'senator-waxly-sen-miller': ['canon/characters/Senator Waxly.txt'],
  'rusty-richards': ['prose/Episode 0.txt'],
  'moses-apio': ['prose/Atlas Protocol Episodes.txt', 'prose/The Atlas Protocol notes.txt'],
  'janine-lober': ['prose/I Deserve Better.txt'],
  'hank-crossfire-foster': ['canon/characters/Hank Foster.txt'],
};
const charById = new Map(characters.map(c => [c.id, c]));
for (const [id, files] of Object.entries(CHAR_DOCS)) {
  const ch = charById.get(id);
  if (!ch) { warn(`doc target missing: ${id}`); continue; }
  for (const f of files) { const d = docOf(f); if (d) ch.docs.push(d); else warn(`missing doc ${f} for ${id}`); }
}

// ---------------------------------------------------------------- factions
const FACTION_META = {
  'DECK_52': { name: 'Deck 52', match: /deck 52/i, blurb: null },
  'FIST_SPEAR': { name: 'FIST / SPEAR', match: /FIST|SPEAR/, blurb: null },
  'ESTABLISHMENT_24': { name: 'Establishment 24', match: /establishment 24/i, blurb: null },
  'SHOOTERS_CLUB': { name: "The Shooter's Club (LAPD)", match: /shooter/i, blurb: null },
  'CUATRO_DEDOS': { name: 'Cuatro Dedos Cartel', match: /cuatro dedos|cartel/i, blurb: null },
  'THE_JACKALS': { name: 'The Jackals', match: /jackal/i, blurb: null },
  'ITS_VOICE': { name: '"Its Voice"', match: /its voice/i, blurb: null },
  'THE_GREYS': { name: 'The Greys', match: /grey|gray/i, blurb: null },
  'THE_ALLIANCE_OF_FOUR': { name: 'The Alliance of Four', match: /alliance/i, blurb: null },
  'THE_OTHERWORLD': { name: 'The Otherworld', match: /otherworld/i, blurb: null },
};
const factions = [];
const factionFiles = listDir('bible', 'factions').filter(f => f.endsWith('.md'));
for (const [prefix, meta] of Object.entries(FACTION_META)) {
  const files = factionFiles.filter(f => f.startsWith(prefix)).sort();
  const docs = files.map(f => docOf('bible/factions/' + f)).filter(Boolean);
  const first = docs[0];
  let summary = '';
  if (first) {
    const body = first.text.replace(/^#.*\n/, '').trim();
    const para = body.split(/\n\s*\n/).find(p => p.replace(/[*>#\-\s]/g, '').length > 60) || body.slice(0, 400);
    summary = stripMd(para).replace(/\s+/g, ' ').slice(0, 420);
  }
  const members = characters.filter(c => meta.match.test(c.affiliation)).map(c => c.id);
  factions.push({ id: slug(meta.name), name: meta.name, summary, members, docs, kind: 'human' });
}
// factions with no bible file yet (from roster bullets)
const EXTRA_FACTIONS = [
  ['Hand of Uganda', /hand of uganda|uganda \/ govt/i, 'Uganda\'s PMC and government LSW apparatus — Mr. Paul (Paul M. Wucooba), Moses Apio, and the presidential LSW bodyguards Abeo, Jelani, and Kamaria under President Ronald Opio "Mugisha."'],
  ['"I Deserve Better"', /deserve better/i, 'The justice movement that rises after Tyrell Lober is killed by police over a drone controller — fronted by his sister Janine and quietly run by the AI "TASK." A produced short film exists.'],
  ['EagleSoft', /eaglesoft/i, 'Hacker collective. Barely sketched — a card to play.'],
];
for (const [name, match, summary] of EXTRA_FACTIONS) {
  const members = characters.filter(c => match.test(c.affiliation) || match.test(c.devNote)).map(c => c.id);
  factions.push({ id: slug(name), name, summary, members, docs: [], kind: 'human' });
}
// alien threat docs attach to Alliance + Greys
const alienDocs = listDir('canon', 'aliens').map(f => docOf('canon/aliens/' + f)).filter(Boolean);
const alliance = factions.find(f => f.name === 'The Alliance of Four');
if (alliance) { alliance.kind = 'alien'; alliance.docs.push(...alienDocs.filter(d => !/zuma|radio/i.test(d.path))); }
const greys = factions.find(f => f.name === 'The Greys');
if (greys) { greys.kind = 'alien'; greys.docs.push(...alienDocs.filter(d => /zuma|radio/i.test(d.path))); }
console.log(`factions: ${factions.length}`);

// ---------------------------------------------------------------- powers (CPI — from bible/powers/POWER_SYSTEM.md)
const powers = {
  status: '[PROPOSED v0.1 — architecture] — pairs with bible/powers/POWER_SYSTEM.md',
  ladder: [
    [0, 'Negligible'], [1, 'Average human'], [2, 'Peak human (Olympian, elite soldier)'],
    [3, 'Enhanced (low-tier LSW)'], [4, 'Superhuman'], [5, 'City-block scale'],
    [6, 'City / regional scale'], [7, 'National scale'], [8, 'Continental scale'],
    [9, 'World-ending'], ['X', 'Cosmic — reserved for the Alliance of Four / Iron Eaters'],
  ],
  ceiling: 'Human LSWs cap around 7–8; 9–X is alien-only. The scariest human stays below the threat the series counts down to. (Legacy LSW Lv1–5 maps ≈ 3…7.)',
  attributes: [
    ['MIGHT', 'raw force / strength'], ['FINESSE', 'agility, reflexes, combat skill'],
    ['BODY', 'durability, endurance, constitution'], ['MIND', 'reason, knowledge — a Sage spikes this'],
    ['INSTINCT', 'perception, intuition, awareness'], ['WILL', 'resolve, mental defense'],
    ['PRESENCE', 'influence, command, manipulation — how a president "wins" a scene'],
  ],
  profile: [
    ['Intensity', 'ladder rank of the effect'], ['Range / Area / Duration', 'the physics envelope'],
    ['Cost / Drawback', 'MANDATORY — every power has a real price'],
    ['Requirement / Lock', 'a condition to use it'], ['Scaling', 'can it grow, and how'],
    ['Counters', 'what neutralizes it'],
  ],
  tags: ['Grey-LSW', 'Sage', 'Symbiont', 'Tech', 'Precursor', 'Baseline'],
  resolution: 'Pick the contested axis. Rank gap = edge; a 2+ gap = dominance — unless a Counter, Cost, or unmet Requirement flips it. That gap-flipper is your drama. If nothing flips it, the higher number wins. No convenient miracles.',
  sage: 'A Sage is MIND 9 in ONE college course but APPLICATION ~1 — all the knowledge, none of the practice. Stat them as two numbers: Knowledge (high) / Application (low). The college-course source is a late reveal.',
  worked: [
    { name: 'Jawah Matu', charId: 'jawah-matu', stats: { MIGHT: 3, FINESSE: 5, BODY: 4, MIND: 4, INSTINCT: 6, WILL: 5, PRESENCE: 4 }, power: 'Sound-absorption · Intensity 5 (≤70 dB, scales)', cost: "Can't silence the noise in his own head", counter: '>70 dB / vacuum' },
    { name: 'Charles Sapphire', charId: 'charles-sapphire', stats: { MIGHT: 2, FINESSE: 2, BODY: 3, MIND: 9, INSTINCT: 8, WILL: 8, PRESENCE: 8 }, power: 'Baseline — his "power" is a secret AI + Deck 52\'s resources', cost: 'Beats most LSWs before the room even meets', counter: '—' },
    { name: 'John Rivers "Stampede"', charId: 'john-rivers-stampede', stats: null, power: 'High-Intensity collapse fields (micro black holes)', cost: 'Heavy physical cost ("Swallow" wrecks him)', counter: 'The "know the space" Lock' },
    { name: 'The Xanthi', charId: null, stats: null, power: 'Intensity 9 infiltration (Doorwalkers)', cost: '—', counter: 'Anchor-Lock + body-only rule' },
  ],
  forks: [
    'Attributes: keep these 7 (FASERIP-style), or fewer/simpler?',
    'Ceiling: is alien-only 9–X right — do humans cap at 7 or 8?',
    'Growth: story-driven, or a defined tier-up logic over the 8 years?',
    'Drawback rule: make a hard Cost mandatory on every power?',
    'Scope: stat all ~110, or just the SOLID leads first?',
  ],
};

// power-source tag per character (keyword classification)
for (const c of characters) {
  const p = (c.power || '').toLowerCase();
  c.powerTag =
    !c.powered ? 'Baseline' :
    /sage/.test(p) ? 'Sage' :
    /symbiont|atlas protocol|life form|muo|mother/.test(p) ? 'Symbiont' :
    /nano|nuronuro|tech|roboforge|implant/.test(p) ? 'Tech' :
    /iron.?eater|precursor/.test(p) ? 'Precursor' : 'Grey-LSW';
}

// ---------------------------------------------------------------- archive (stories & documents)
const stories = [];
function addStory(relPath, status, note) {
  const d = docOf(relPath);
  if (!d) { warn('missing story ' + relPath); return; }
  // full-name, word-boundary scan (strict on purpose — quoted epithets stripped)
  const cast = characters.filter(c => {
    if (c.tier !== 'lead') return false;
    const bare = c.name.replace(/"[^"]*"/g, ' ').replace(/\s+/g, ' ').trim();
    const pat = new RegExp('\\b' + bare.split(' ').map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+') + '\\b', 'i');
    return pat.test(d.text) || (c.aliases[0] && d.text.toLowerCase().includes(c.aliases[0].toLowerCase()));
  }).map(c => c.id).slice(0, 8);
  stories.push({
    title: path.basename(relPath).replace(/\.(txt|md)$/i, ''), path: relPath,
    words: d.words, layer: d.layer, status, note: note || null,
    excerpt: d.text.slice(0, 900), cast,
  });
}
(function walkProse(rel) {
  for (const f of listDir(...rel.split('/'))) {
    const sub = rel + '/' + f;
    if (fs.statSync(path.join(ROOT, sub)).isDirectory()) { walkProse(sub); continue; }
    if (!/\.(txt|md)$/i.test(f)) continue;
    const status = /^[A-Z0-9_]+\.md$/.test(f) ? 'AI EXPANSION' : 'PROSE';
    addStory(sub, status);
  }
})('prose');
// shot-and-posted catalog (from CANON_STATUS / PRODUCTION_INVENTORY)
const PRODUCED = [
  ['Its Voice — Web Series S01E01–07 (+ trailers)', 'Trailer #1 hit 6.6K. Daniel Carlson under the ring\'s voice. Shipped before the universe was coherent — the lesson, not a failure.'],
  ['I Deserve Better — live-action short', 'The Tyrell Lober killing and the movement it births. Produced.'],
  ['Atlas Protocol — Part 1', 'Moses Apio, Lake Victoria. Produced.'],
  ['CoF Teasers #1–2', 'Early universe teasers. Produced.'],
];
console.log(`stories: ${stories.length}`);

// ---------------------------------------------------------------- canon desk (open rulings — curated from bible/CANON_STATUS.md)
const rulings = [
  // OPEN
  { s: 'OPEN', area: 'Alliance of Four', title: 'The Mountain-Eaters — SOLVE or SWAP (the real blocker)', detail: 'Creator (twice): "too slow to threaten Earth — 30 years to do anything." Solve it (candidate: delivered/grown as the unkillable occupation endgame — the slowness IS the horror) or swap a species from the bank.', ref: 'bible/CANON_STATUS.md · Greys/Alliance session 2026-06-29' },
  { s: 'OPEN', area: 'Timeline', title: 'Iron Eaters arrival — Year 3 vs Year 4', detail: 'Creator narrated end-Year-2/Year-3 to Jay; the novel/CANON locked the South America crash at Year 4. Confirm which.', ref: 'bible/CANON_STATUS.md ⚠ 2026-06-28' },
  { s: 'OPEN', area: 'Titles', title: '"Son of the Soil" (Kaiser) vs "Sun of the Soil" (Johnny Rain)', detail: 'Title overlap between the two Pan-African leads — intentional echo or collision?', ref: 'Jay conversation 2026-06-28' },
  { s: 'OPEN', area: 'Deck 52', title: 'Founders\' race', detail: 'Brain-dump said "two white guys"; the originals wrote a mixed white/Black Charles. Originals win pending ruling.', ref: 'bible/CANON_STATUS.md' },
  { s: 'OPEN', area: 'Deck 52', title: 'Vaughn\'s hometown — Ohio vs near San Francisco', detail: 'Your own material fights itself.', ref: 'CANON_STATUS · Deck 52 contradictions' },
  { s: 'OPEN', area: 'Deck 52', title: 'Benchley\'s ransom — $4M vs $6M', detail: 'Two figures in the originals.', ref: 'CANON_STATUS · Deck 52 contradictions' },
  { s: 'OPEN', area: 'Deck 52', title: 'US president of the era — Williamson vs Anthony vs Parker', detail: 'Parker also appears in Senator Waxly\'s material.', ref: 'CANON_STATUS · Deck 52 contradictions' },
  { s: 'OPEN', area: 'Deck 52', title: 'Fashion line — "Rhaige Sapphire" vs "Rhaige Elegance"; is "52 Holdings" canon?', detail: 'Charles\'s brand naming + the parent-company question.', ref: 'CANON_STATUS · Deck 52 contradictions' },
  { s: 'OPEN', area: 'Kaiser', title: 'Are the big AI "enhanced/strategic abilities" docs canon?', detail: 'Or trust only Eziobi.txt + COF Notes (Okigwe, 56, memories of the dead, betrayed partner) and mark the ~20k-word expansions [PROPOSED]?', ref: 'CANON_STATUS · Kaiser' },
  { s: 'OPEN', area: 'Otherworld', title: 'The death beat — two options, undecided', detail: 'How the Vessel of the Trapped dies (and so opens the gate for good).', ref: 'Jay conversation 2026-06-28' },
  { s: 'OPEN', area: 'Its Voice', title: 'Loyal to the Greys — or its own ends?', detail: 'Does it steer Sandra? How many pieces/bearers exist? Does it have a name? (Archive-species origin now canon.)', ref: 'bible/factions/ITS_VOICE.md' },
  { s: 'OPEN', area: 'King Stefanos', title: 'How does he acquire shapeshifting?', detail: '"Wears Marletta\'s face" = acquired shapeshifting — mechanism open. Plus: design Sandra\'s break-in extraction that "goes wrong" (the climax).', ref: 'bible/characters/KING_STEFANOS.md' },
  { s: 'OPEN', area: 'FIST / SPEAR', title: 'Flagged WEAK — needs real development', detail: 'Strongest hook on file: FIST unknowingly guards the "supercomputer" — a node of Its Voice.', ref: 'CANON_STATUS' },
  { s: 'OPEN', area: 'Roster', title: 'Hank Foster — Arkansas (original) vs Canada (index)', detail: 'Country conflict to reconcile.', ref: 'CHARACTER_ROSTER · conflicts' },
  { s: 'OPEN', area: 'Roster', title: 'Uganda president — Mugisha/Ronald Opio vs original Akena', detail: 'Name drift between sources.', ref: 'CHARACTER_ROSTER · conflicts' },
  { s: 'OPEN', area: 'Roster', title: 'Two "Shooter\'s Clubs" — disambiguate', detail: 'The corrupt LAPD unit (Stampede\'s origin) vs Pole Zimmerman\'s white-supremacist biker gang share a name.', ref: 'CHARACTER_ROSTER · conflicts' },
  { s: 'OPEN', area: 'Powers', title: 'CPI open forks ×5', detail: 'Attributes count · human ceiling · growth logic · mandatory Cost rule · stat-the-roster scope. See POWERS module.', ref: 'bible/powers/POWER_SYSTEM.md' },
  { s: 'OPEN', area: 'Liu Xiao', title: 'Fold in the return scene', detail: 'Muo spheres grant bystanders temporary medical knowledge to save him — capture into LIU_XIAO.md next pass.', ref: 'Jay conversation 2026-06-28' },
  { s: 'OPEN', area: 'Production', title: 'Owed to the room', detail: 'What killed Mars → the room. Full Its Voice S1+S2 → send to the room.', ref: 'Session bookmark 2026-06-29' },
  { s: 'OPEN', area: 'Country sheet', title: 'Congo rows — labels likely swapped', detail: 'The sheet\'s "Republic of the Congo" (№75, pop 89.5M, no president) carries DR Congo\'s population; "Congo" (№19, 5.6M) carries the Republic\'s. SPEAR joins them to the map by population; confirm intended naming + add the missing presidents.', ref: 'Country Master Sheet - Country.csv' },
  // RECENT RULINGS (RESOLVED)
  { s: 'RESOLVED', area: 'Jackals', title: 'Sandra = a Black woman, THE FIRST Jackal', detail: 'Resolves the long-open white-vs-black flag; the ring passed to her after the web-series man.', ref: '2026-06-28' },
  { s: 'RESOLVED', area: 'Stampede', title: 'Murdered relative = his COUSIN (Rebecca Carranza)', detail: 'Creator said "cousin" a third time — spoken word overrides Stampede.txt\'s "sister."', ref: '2026-06-28' },
  { s: 'RESOLVED', area: 'Aliens', title: 'Alliance re-cut: Slaught KEPT · Xanthi KEPT (non-humanoid redesign) · Ash-Weather in [PROPOSED] · Auralith adopted', detail: 'The Deep + Strategist Race dumped as generic; Mountain-Eaters pending (see OPEN). Greys\' true name "Veyr" parked.', ref: '2026-06-29 session' },
  { s: 'RESOLVED', area: 'Greys', title: 'Deep-time spine: Mars → the Long Burial (Yucatán) → the Silent Requiem', detail: 'Zuma = the one active gateway (Zuma↔Mars). The deep-time sites become the proof that confirms Rusty Richards.', ref: '2026-06-29 session' },
  { s: 'RESOLVED', area: 'Treaty', title: 'Name LOCKED: "Living Super Weapon Threshold Treaty"', detail: 'Ties to the core term LSW; the "Lethal…" variant is retired. Governments may not wield LSWs — only companies. A head of state doing it = the ultimate violation (Stefanos).', ref: 'CANON_STATUS' },
  { s: 'RESOLVED', area: 'FIST / SPEAR', title: 'SPEAR is never created', detail: 'Galloway\'s vision (all nations unite) is rejected by the UN; FIST is the US-only fallback he actually builds. Kill any "UN is forming SPEAR" line.', ref: 'CANON_STATUS' },
  { s: 'RESOLVED', area: 'Rusty Richards', title: 'Non-powered herald — "the Tomorrow Man"', detail: 'Lobbies world leaders; does NOT lead LSWs in battle.', ref: 'CANON_STATUS' },
  { s: 'RESOLVED', area: 'Kaiser', title: 'Origin: partner turned him in for being gay; hometown Okigwe; "Son of the Soil"', detail: 'Memories of everyone who ever lived in a large radius of Africa; recruits across Africa on a road/water/laptop platform.', ref: '2026-06-28' },
  { s: 'RESOLVED', area: 'Cuatro Dedos', title: 'Diego "El Maestro" Rivera DIES', detail: 'His death opens the vacuum Jance Bloomberg fills — taking dead heir Alex\'s identity to seize & reform the cartel.', ref: '2026-06-26' },
  { s: 'RESOLVED', area: 'Time travel', title: 'Exactly TWO time-travelers', detail: 'Asha = future · Zhang Wei = past. Zephaniah Mwangaza is a precognitive SEER [PROPOSED], not a traveler.', ref: 'CANON_STATUS' },
  { s: 'RESOLVED', area: 'Benchley', title: 'Wife DIVORCES him; Olympic "Maria killed" beat DROPPED', detail: 'The kidnapping = the Akrahuhum capture Galloway ransoms him from. Callsign "Shogun," not "Ravage."', ref: '2026-06-26' },
  { s: 'RESOLVED', area: 'Roster', title: 'Kali Mwangi merged into Jawah Matu', detail: 'Jawah is THE albino sound-absorber (Tanzania). The index had filed one man as two Indians.', ref: 'CHARACTER_ROSTER' },
];
console.log(`rulings: ${rulings.length} (${rulings.filter(r => r.s === 'OPEN').length} open)`);

// ---------------------------------------------------------------- doctrine + totals
const proseWords = stories.reduce((a, s) => a + (s.layer !== 'VERIFY' ? s.words : 0), 0);
const allWords = stories.reduce((a, s) => a + s.words, 0);

const DATA = {
  meta: {
    built: new Date().toISOString().slice(0, 10),
    counts: {
      countries: countries.length,
      persons: characters.length,
      leads: characters.filter(c => c.tier === 'lead').length,
      solid: characters.filter(c => /SOLID/.test(c.dev)).length,
      factions: factions.length,
      openRulings: rulings.filter(r => r.s === 'OPEN').length,
      stories: stories.length,
      proseWords, allWords, cities: cityCount,
    },
  },
  doctrine: {
    golden: 'Creator originals + the creator\'s word beat the AI-rewrite layer. Conflicts are flagged, never silently resolved. Anything invented to fill a gap is [PROPOSED] until blessed.',
    layers: [
      ['TRUST', 'RAW SOURCE — the creator\'s hand', 'lowercase / natural-name files (Stampede.txt, Eziobi.txt, Episode 0.txt…)'],
      ['VERIFY', 'DERIVED SIGNAL — AI-rewrite layer', 'ALL-CAPS .md (BATCH_*, NOVEL_PART_*, CHARACTER_*…) — a prior pass reworded and sometimes reinvented; cross-check before trusting'],
      ['BIBLE', 'CONSOLIDATED INTEL — the bible', 'bible/*.md — compiled ground truth; correct it and it becomes law'],
    ],
  },
  countries, mapPaths,
  markers: countries.filter(c => c.marker).map(c => ({ name: c.name, xy: c.marker })),
  characters, factions, powers, stories, produced: PRODUCED, rulings,
};

// ---------------------------------------------------------------- emit
const template = fs.readFileSync(path.join(HERE, 'template.html'), 'utf8');
const json = JSON.stringify(DATA).replace(/</g, '\\u003c').split('\u2028').join('\\u2028').split('\u2029').join('\\u2029');
const out = template.replace('"__SPEAR_DATA__"', json);
fs.writeFileSync(path.join(ROOT, 'spear.html'), out);
console.log(`\nspear.html written — ${(out.length / 1024 / 1024).toFixed(2)} MB`);
console.log(`persons ${DATA.meta.counts.persons} · countries ${DATA.meta.counts.countries} · open rulings ${DATA.meta.counts.openRulings} · words ${allWords.toLocaleString()}`);
