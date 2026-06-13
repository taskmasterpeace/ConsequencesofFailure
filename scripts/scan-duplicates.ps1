#requires -Version 5.1
<#
.SYNOPSIS
  Scans the COF repo for EXACT-content duplicate files (same SHA256) and
  builds an interactive HTML "Duplicate Manager" you use to decide what to
  keep, then generates a safe, reviewable PowerShell cleanup script.

.DESCRIPTION
  Only byte-identical files are reported, so deleting down to one copy never
  loses content. The generated HTML is self-contained (data embedded) and can
  be opened offline. Re-run this script any time duplicates pile up again.

.PARAMETER Root
  Repo root to scan. Defaults to the parent of this script's folder.

.PARAMETER Out
  Output HTML path. Defaults to <Root>\duplicate-manager.html

.PARAMETER NoOpen
  Don't auto-open the report in the browser.

.EXAMPLE
  pwsh ./scripts/scan-duplicates.ps1
#>
param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot),
  [string]$Out  = (Join-Path (Split-Path -Parent $PSScriptRoot) 'duplicate-manager.html'),
  [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'

# Folders we never want to scan (VCS internals, tooling, vendored code)
$excludePatterns = @('\\\.git\\', '\\\.claude\\', '\\node_modules\\', '\\VisualStoryWriting\\')

Write-Host "Scanning $Root ..." -ForegroundColor Cyan

$files = Get-ChildItem -Path $Root -Recurse -File | Where-Object {
  $full = $_.FullName
  -not ($excludePatterns | Where-Object { $full -match $_ })
}

if (-not $files) { throw "No files found under $Root" }

Write-Host ("Hashing {0} files ..." -f $files.Count) -ForegroundColor Cyan
$hashed = $files | Get-FileHash -Algorithm SHA256

function Get-Zone([string]$rel) {
  if ($rel -notmatch '[\\/]') { return 'root' }
  $seg = ($rel -split '[\\/]')[0]
  switch ($seg) {
    'canon'           { 'canon' }
    'prose'           { 'prose' }
    'reference'       { 'reference' }
    'archive'         { if ($rel -match '^archive[\\/]duplicates[\\/]') { 'archivedup' } else { 'archive' } }
    'COF_Stories'     { 'stories' }
    'extracted_files' { 'extracted' }
    default           { 'other' }
  }
}

$groups = New-Object System.Collections.ArrayList
$gid = 0
$hashed | Group-Object Hash | Where-Object { $_.Count -gt 1 } | Sort-Object { $_.Group[0].Path } | ForEach-Object {
  $size = (Get-Item -LiteralPath $_.Group[0].Path).Length
  $fileObjs = New-Object System.Collections.ArrayList
  foreach ($m in ($_.Group | Sort-Object Path)) {
    $rel = $m.Path.Substring($Root.Length).TrimStart('\', '/')
    [void]$fileObjs.Add([PSCustomObject]@{
      rel  = $rel
      full = $m.Path
      zone = (Get-Zone $rel)
      name = (Split-Path $m.Path -Leaf)
    })
  }
  [void]$groups.Add([PSCustomObject]@{
    id    = $gid
    hash  = $_.Name
    size  = $size
    files = @($fileObjs)
  })
  $gid++
}

$payload = [PSCustomObject]@{
  generated  = (Get-Date).ToString('yyyy-MM-dd HH:mm')
  root       = $Root
  totalFiles = $files.Count
  totalSize  = [int64]($files | Measure-Object Length -Sum).Sum
  groups     = @($groups)
}

$json = $payload | ConvertTo-Json -Depth 8 -Compress

$template = @'
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>COF Duplicate Manager</title>
<style>
  :root {
    --bg: oklch(0.17 0.02 290);
    --bg-2: oklch(0.21 0.025 290);
    --card: oklch(0.23 0.028 290);
    --card-hi: oklch(0.27 0.03 290);
    --border: oklch(0.33 0.03 290);
    --text: oklch(0.95 0.01 290);
    --muted: oklch(0.66 0.04 290);
    --accent: oklch(0.65 0.2 290);
    --accent-soft: oklch(0.4 0.12 290);
    --keep: oklch(0.72 0.17 150);
    --keep-soft: oklch(0.4 0.1 150);
    --del: oklch(0.66 0.2 25);
    --del-soft: oklch(0.42 0.13 25);
    --warn: oklch(0.78 0.16 75);
    --radius: 0.625rem;
    --shadow: 0 8px 24px oklch(0 0 0 / 0.35);
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--accent); }
  .wrap { max-width: 1400px; margin: 0 auto; padding: 1.5rem; }

  header h1 {
    font-size: 1.6rem; font-weight: 700; letter-spacing: -0.025em; margin: 0 0 0.2rem;
  }
  header .sub { color: var(--muted); font-size: 0.85rem; }
  header .sub code { background: var(--bg-2); padding: 0.1rem 0.4rem; border-radius: 0.35rem; }

  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr)); gap: 0.75rem; margin: 1.25rem 0; }
  .stat { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem; }
  .stat .n { font-size: 1.65rem; font-weight: 700; letter-spacing: -0.02em; }
  .stat .l { color: var(--muted); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.04em; }
  .stat.accent .n { color: var(--accent); }
  .stat.del .n { color: var(--del); }

  .toolbar { display: flex; flex-wrap: wrap; gap: 0.6rem; align-items: center; margin-bottom: 1rem; }
  .group-label { color: var(--muted); font-size: 0.78rem; margin-right: 0.2rem; }
  button {
    font: inherit; cursor: pointer; border-radius: var(--radius);
    border: 1px solid var(--border); background: var(--card);
    color: var(--text); padding: 0.5rem 0.85rem; transition: all 0.18s;
  }
  button:hover { background: var(--card-hi); border-color: var(--accent-soft); }
  button.preset.active { background: var(--accent-soft); border-color: var(--accent); color: var(--text); }
  button.primary { background: var(--accent); border-color: var(--accent); color: oklch(0.15 0.02 290); font-weight: 600; }
  button.primary:hover { filter: brightness(1.08); }
  button.ghost { background: transparent; }
  .search { flex: 1; min-width: 180px; padding: 0.5rem 0.75rem; background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text); }
  .toggle { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--muted); font-size: 0.82rem; user-select: none; cursor: pointer; }
  .chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
  .chip { font-size: 0.74rem; padding: 0.25rem 0.6rem; border-radius: 999px; border: 1px solid var(--border); background: var(--bg-2); color: var(--muted); cursor: pointer; transition: all 0.15s; }
  .chip.on { color: var(--text); border-color: var(--accent); background: var(--accent-soft); }

  .layout { display: grid; grid-template-columns: 1fr 380px; gap: 1.25rem; align-items: start; }
  @media (max-width: 1000px) { .layout { grid-template-columns: 1fr; } .panel { position: static !important; } }

  .group {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 0.9rem 1rem; margin-bottom: 0.75rem;
  }
  .group.warn { border-color: var(--warn); }
  .group .head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.65rem; flex-wrap: wrap; }
  .group .gname { font-weight: 600; letter-spacing: -0.01em; }
  .group .meta { color: var(--muted); font-size: 0.78rem; }
  .group .head .spacer { flex: 1; }
  .keepall { font-size: 0.74rem; padding: 0.2rem 0.55rem; }
  .badge { font-size: 0.68rem; padding: 0.15rem 0.5rem; border-radius: 999px; font-weight: 600; letter-spacing: 0.02em; }
  .badge.warn { background: oklch(0.78 0.16 75 / 0.18); color: var(--warn); border: 1px solid var(--warn); }
  .badge.cat { background: var(--bg-2); color: var(--muted); border: 1px solid var(--border); }

  .file { display: flex; align-items: center; gap: 0.65rem; padding: 0.45rem 0.55rem; border-radius: 0.45rem; cursor: pointer; transition: background 0.12s; border-left: 3px solid transparent; }
  .file:hover { background: var(--bg-2); }
  .file.keep { border-left-color: var(--keep); }
  .file.del { border-left-color: var(--del); opacity: 0.72; }
  .file.del .path { text-decoration: line-through; }
  .file .state { width: 1.4rem; height: 1.4rem; flex: none; display: grid; place-items: center; border-radius: 0.35rem; font-size: 0.9rem; }
  .file.keep .state { background: var(--keep-soft); color: var(--keep); }
  .file.del .state { background: var(--del-soft); color: var(--del); }
  .file .path { font-family: ui-monospace, 'Cascadia Code', Consolas, monospace; font-size: 0.8rem; word-break: break-all; }
  .file .zone { font-size: 0.64rem; padding: 0.1rem 0.45rem; border-radius: 999px; flex: none; font-weight: 600; }

  .panel { position: sticky; top: 1rem; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.1rem; box-shadow: var(--shadow); }
  .panel h2 { font-size: 1rem; margin: 0 0 0.75rem; letter-spacing: -0.01em; }
  .panel .row { display: flex; justify-content: space-between; padding: 0.3rem 0; color: var(--muted); font-size: 0.85rem; }
  .panel .row b { color: var(--text); }
  .panel .row.big b { color: var(--del); font-size: 1.05rem; }
  .actions { display: flex; gap: 0.5rem; margin: 0.85rem 0; }
  .actions button { flex: 1; }
  pre.script { background: oklch(0.13 0.02 290); border: 1px solid var(--border); border-radius: 0.5rem; padding: 0.75rem; font-family: ui-monospace, Consolas, monospace; font-size: 0.72rem; line-height: 1.45; max-height: 320px; overflow: auto; white-space: pre; margin: 0; color: oklch(0.85 0.02 150); }
  .note { color: var(--muted); font-size: 0.72rem; margin-top: 0.6rem; }
  .empty { text-align: center; color: var(--muted); padding: 3rem 1rem; }
  .toast { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); background: var(--accent); color: oklch(0.15 0.02 290); padding: 0.6rem 1.1rem; border-radius: var(--radius); font-weight: 600; box-shadow: var(--shadow); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
  .toast.show { opacity: 1; }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>COF Duplicate Manager</h1>
    <div class="sub">Scanned <code id="genRoot"></code> &middot; <span id="genTime"></span> &middot; exact-content (SHA256) duplicates only</div>
  </header>

  <div class="stats" id="stats"></div>

  <div class="toolbar">
    <span class="group-label">Strategy:</span>
    <button class="preset" data-preset="adopt">Adopt organized tree</button>
    <button class="preset" data-preset="flat">Keep flat (root)</button>
    <label class="toggle"><input type="checkbox" id="protect" checked> Protect groups with differing filenames</label>
    <input class="search" id="search" placeholder="Filter by path...">
  </div>
  <div class="chips" id="chips"></div>

  <div class="layout">
    <main id="groups"></main>
    <aside class="panel">
      <h2>Cleanup plan</h2>
      <div class="row"><span>Duplicate groups</span><b id="pGroups">0</b></div>
      <div class="row"><span>Redundant copies</span><b id="pRedundant">0</b></div>
      <div class="row"><span>Reclaimable total</span><b id="pReclaim">0</b></div>
      <div class="row big"><span>Selected to delete</span><b id="pDelete">0 files</b></div>
      <div class="row"><span>Space freed by selection</span><b id="pFreed">0</b></div>
      <div class="actions">
        <button class="primary" id="copyBtn">Copy script</button>
        <button id="dlBtn">Download .ps1</button>
      </div>
      <pre class="script" id="script"></pre>
      <div class="note">Review before running. Deletes are <b>real</b> &mdash; back up or commit first. After running, stage the removals with <code>git add -A</code>. One copy of every group is always kept.</div>
    </aside>
  </div>
</div>
<div class="toast" id="toast"></div>

<script>
const DATA = __DATA__;
const groups = DATA.groups;

const ZONES = {
  canon:     { label: 'canon',     hue: 265 },
  prose:     { label: 'prose',     hue: 200 },
  reference: { label: 'reference', hue: 160 },
  archive:   { label: 'archive',   hue: 35  },
  stories:   { label: 'stories',   hue: 320 },
  extracted: { label: 'extracted', hue: 50  },
  archivedup:{ label: 'archive/dup', hue: 25 },
  root:      { label: 'root',      hue: 15  },
  other:     { label: 'other',     hue: 290 }
};
// Each strategy is a priority map; per group the single highest-priority copy
// is kept and the rest are deleted. 'archivedup' (archive/duplicates/) is trash.
const PRESETS = {
  adopt: { canon: 6, prose: 6, reference: 5, archive: 4, root: 2, stories: 1, extracted: 1, archivedup: 0, other: 0 },
  flat:  { root: 6, canon: 5, prose: 5, reference: 4, archive: 3, stories: 2, extracted: 2, archivedup: 1, other: 1 }
};

const keep = {};            // gid -> [bool,...]
let currentPreset = 'adopt';
let protectVariants = true;
let searchTerm = '';
const zoneFilter = new Set();

const $ = (id) => document.getElementById(id);

function fmtBytes(n) {
  if (n < 1024) return n + ' B';
  if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
  return (n / 1048576).toFixed(1) + ' MB';
}
function normName(n) { return n.toLowerCase().replace(/\s*\(\d+\)/g, '').replace(/\s+/g, ' ').trim(); }
function distinctNames(g) { return new Set(g.files.map(f => normName(f.name))).size > 1; }
function category(g) {
  const z = new Set(g.files.map(f => f.zone));
  if (distinctNames(g)) return 'name variants';
  if (z.has('archivedup')) return 'parked duplicate';
  if (z.has('root') && (z.has('canon') || z.has('prose') || z.has('reference'))) return 'reorg copy';
  if (z.has('extracted') && z.has('archive')) return 'extracted mirror';
  if (z.has('stories')) return 'source mirror';
  if (z.has('archive')) return 'archived copy';
  return 'duplicate';
}
function applyPreset(name) {
  currentPreset = name;
  const pri = PRESETS[name] || PRESETS.adopt;
  groups.forEach(g => {
    if (protectVariants && distinctNames(g)) { keep[g.id] = g.files.map(() => true); return; }
    let best = 0, bs = -Infinity;
    g.files.forEach((f, i) => { const s = pri[f.zone] ?? 0; if (s > bs) { bs = s; best = i; } });
    keep[g.id] = g.files.map((_, i) => i === best);
  });
  document.querySelectorAll('.preset').forEach(b => b.classList.toggle('active', b.dataset.preset === name));
  render();
}
function toggleFile(gid, idx) {
  const next = keep[gid].slice();
  next[idx] = !next[idx];
  if (!next.some(Boolean)) { toast('Keep at least one copy'); return; }
  keep[gid] = next;
  render();
}
function keepAll(gid) { keep[gid] = keep[gid].map(() => true); render(); }

function visibleGroups() {
  return groups.filter(g => {
    if (searchTerm && !g.files.some(f => f.rel.toLowerCase().includes(searchTerm))) return false;
    if (zoneFilter.size && !g.files.some(f => zoneFilter.has(f.zone))) return false;
    return true;
  });
}

function buildScriptLines() {
  const dels = [];
  let bytes = 0;
  groups.forEach(g => keep[g.id].forEach((k, i) => { if (!k) { dels.push(g.files[i]); bytes += g.size; } }));
  return { dels, bytes };
}

function render() {
  // stats
  const totalGroups = groups.length;
  const redundant = groups.reduce((s, g) => s + g.files.length - 1, 0);
  const reclaim = groups.reduce((s, g) => s + g.size * (g.files.length - 1), 0);
  $('stats').innerHTML = [
    ['accent', DATA.totalFiles, 'files scanned'],
    ['', totalGroups, 'duplicate groups'],
    ['', redundant, 'redundant copies'],
    ['accent', fmtBytes(reclaim), 'reclaimable']
  ].map(([c, n, l]) => `<div class="stat ${c}"><div class="n">${n}</div><div class="l">${l}</div></div>`).join('');

  // groups
  const vis = visibleGroups();
  const host = $('groups');
  if (!vis.length) { host.innerHTML = '<div class="empty">No groups match your filter.</div>'; }
  else {
    host.innerHTML = vis.map(g => {
      const warn = distinctNames(g);
      const rows = g.files.map((f, i) => {
        const k = keep[g.id][i];
        const z = ZONES[f.zone] || ZONES.other;
        const zc = `oklch(0.7 0.16 ${z.hue})`;
        const zbg = `oklch(0.7 0.16 ${z.hue} / 0.16)`;
        return `<div class="file ${k ? 'keep' : 'del'}" onclick="toggleFile(${g.id},${i})">
          <span class="state">${k ? '&#10003;' : '&#10005;'}</span>
          <span class="zone" style="color:${zc};background:${zbg}">${z.label}</span>
          <span class="path">${f.rel.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>
        </div>`;
      }).join('');
      return `<div class="group ${warn ? 'warn' : ''}">
        <div class="head">
          <span class="gname">${g.files[0].name.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>
          <span class="badge cat">${category(g)}</span>
          ${warn ? '<span class="badge warn">&#9888; filenames differ</span>' : ''}
          <span class="spacer"></span>
          <span class="meta">${g.files.length} copies &middot; ${fmtBytes(g.size)} each</span>
          <button class="keepall ghost" onclick="event.stopPropagation();keepAll(${g.id})">keep all</button>
        </div>
        ${rows}
      </div>`;
    }).join('');
  }

  // plan panel
  const { dels, bytes } = buildScriptLines();
  $('pGroups').textContent = totalGroups;
  $('pRedundant').textContent = redundant;
  $('pReclaim').textContent = fmtBytes(reclaim);
  $('pDelete').textContent = dels.length + ' files';
  $('pFreed').textContent = fmtBytes(bytes);

  const header = [
    '# COF duplicate cleanup - generated by the Duplicate Manager',
    '# Strategy: ' + currentPreset + '  |  ' + dels.length + ' files, ' + fmtBytes(bytes) + ' freed',
    '# Review before running. One copy of every group is preserved.',
    '$ErrorActionPreference = "Stop"',
    ''
  ];
  const lines = dels.map(f => "Remove-Item -LiteralPath '" + f.full.replace(/'/g, "''") + "' -Force");
  const footer = dels.length ? ['', 'Write-Host "Deleted ' + dels.length + ' duplicate files." -ForegroundColor Green', '# Then stage removals:  git add -A'] : ['# Nothing selected for deletion.'];
  $('script').textContent = header.concat(lines, footer).join('\n');
}

function toast(msg) {
  const t = $('toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1600);
}

// chips
function buildChips() {
  const present = [...new Set(groups.flatMap(g => g.files.map(f => f.zone)))];
  $('chips').innerHTML = present.map(z => `<span class="chip" data-zone="${z}">${(ZONES[z] || ZONES.other).label}</span>`).join('');
  document.querySelectorAll('.chip').forEach(c => c.onclick = () => {
    const z = c.dataset.zone;
    if (zoneFilter.has(z)) zoneFilter.delete(z); else zoneFilter.add(z);
    c.classList.toggle('on');
    render();
  });
}

// wire up
$('genRoot').textContent = DATA.root;
$('genTime').textContent = DATA.generated;
document.querySelectorAll('.preset').forEach(b => b.onclick = () => applyPreset(b.dataset.preset));
$('protect').onchange = (e) => { protectVariants = e.target.checked; applyPreset(currentPreset); };
$('search').oninput = (e) => { searchTerm = e.target.value.toLowerCase().trim(); render(); };
$('copyBtn').onclick = () => { navigator.clipboard.writeText($('script').textContent).then(() => toast('Script copied')); };
$('dlBtn').onclick = () => {
  const blob = new Blob([$('script').textContent], { type: 'text/plain' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'cof-cleanup.ps1'; a.click();
  toast('Downloaded cof-cleanup.ps1');
};

buildChips();
applyPreset('adopt');
</script>
</body>
</html>
'@

$html = $template.Replace('__DATA__', $json)
Set-Content -LiteralPath $Out -Value $html -Encoding UTF8

Write-Host ""
Write-Host ("Found {0} duplicate groups across {1} scanned files." -f $groups.Count, $files.Count) -ForegroundColor Green
$redundant = ($groups | ForEach-Object { $_.files.Count - 1 } | Measure-Object -Sum).Sum
$reclaim = ($groups | ForEach-Object { $_.size * ($_.files.Count - 1) } | Measure-Object -Sum).Sum
Write-Host ("{0} redundant copies, {1:N1} MB reclaimable." -f $redundant, ($reclaim / 1MB)) -ForegroundColor Green
Write-Host "Report: $Out" -ForegroundColor Cyan
if (-not $NoOpen) { Start-Process $Out }
