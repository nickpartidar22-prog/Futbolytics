/* ═══════════════════════════════════════════════════════════════
   WCQF · Mobile App CSS  — Pickswise-inspired
   Target: 375–430px wide (iPhone SE → 14 Pro Max)
   ═══════════════════════════════════════════════════════════════ */

/* ── Reset & Base ─────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-text-size-adjust: 100%; }
body {
  font-family: -apple-system, 'SF Pro Text', 'IBM Plex Sans', 'Segoe UI', sans-serif;
  background: #f0f2f5;
  color: #0f1b2d;
  min-height: 100dvh;
  overscroll-behavior: none;
}
a { color: #1c84ff; text-decoration: none; }
a:hover { text-decoration: underline; }
summary { cursor: pointer; }

/* ── Variables ────────────────────────────────────────────────── */
:root {
  --blue:    #1c84ff;
  --green:   #16a34a;
  --amber:   #f59e0b;
  --red:     #e5484d;
  --gold:    #f5a623;
  --purple:  #7c3aed;
  --bg:      #f0f2f5;
  --card:    #ffffff;
  --border:  #e8ebf0;
  --txt:     #0f1b2d;
  --muted:   #6b7280;
  --dim:     #9ca3af;
  --nav-h:   58px;
  --head-h:  52px;
  --safe-b:  env(safe-area-inset-bottom, 0px);
}

/* ── Header ───────────────────────────────────────────────────── */
.app-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  height: var(--head-h);
  background: #0f1b2d;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 16px;
  padding-top: env(safe-area-inset-top, 0px);
}
.header-brand { display: flex; align-items: center; gap: 10px; }
.header-logo {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 18px; font-weight: 800; color: #f5a623; letter-spacing: 1px;
}
.header-sub { font-size: 10px; color: #6b7280; letter-spacing: .5px; }
.header-right { display: flex; align-items: center; gap: 12px; }
#clock { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #23d98a; }
#refresh-btn {
  background: none; border: 1px solid #2d3f52; border-radius: 6px;
  color: #a0aec0; padding: 5px 9px; font-size: 14px; cursor: pointer;
}
#refresh-btn:active { background: #1a2840; }

/* ── Layout ───────────────────────────────────────────────────── */
.app-body {
  padding-top: calc(var(--head-h) + env(safe-area-inset-top, 0px));
  padding-bottom: calc(var(--nav-h) + var(--safe-b) + 8px);
  min-height: 100dvh;
}

/* ── Tab panels ───────────────────────────────────────────────── */
.tab-panel { display: none; padding: 12px 12px 0; }
.tab-panel.active { display: block; }

/* ── Bottom nav ───────────────────────────────────────────────── */
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
  height: calc(var(--nav-h) + var(--safe-b));
  padding-bottom: var(--safe-b);
  background: #fff;
  border-top: 1px solid var(--border);
  display: flex; align-items: center;
}
.nav-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 3px; background: none; border: none; cursor: pointer; padding: 6px 0;
  color: var(--dim); font-size: 10px; font-weight: 600; letter-spacing: .3px;
  -webkit-tap-highlight-color: transparent;
}
.nav-btn .nav-icon { font-size: 20px; line-height: 1; }
.nav-btn.active { color: var(--blue); }
.nav-btn.active .nav-icon { filter: saturate(2); }

/* ── Betfair status bar ───────────────────────────────────────── */
.bf-bar {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  background: #0f1b2d; border-radius: 8px; padding: 7px 11px;
  font-size: 11px; margin-bottom: 10px;
}
.bf-live  { color: #23d98a; font-weight: 700; }
.bf-cache { color: #f5a623; font-weight: 600; }
.bf-nc    { color: #6b7280; }
.bf-err   { color: #e5484d; font-weight: 600; }
.bf-time  { color: #9ca3af; }
.bf-stale { color: #e5484d; font-size: 10px; background: rgba(229,72,77,.12); padding: 1px 5px; border-radius: 4px; }
.bf-link  { color: #4d9bff; font-size: 10.5px; }
.bf-init  { color: #6b7280; }

/* ── PICKS — Scoreboard ───────────────────────────────────────── */
.acc-board {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 14px; margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(16,24,40,.06);
}
.acc-hd { display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 700; margin-bottom: 12px; flex-wrap: wrap; gap: 4px; }
.acc-n  { font-size: 10.5px; color: var(--muted); font-weight: 500; }
.acc-tiles { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.acc-tile {
  background: linear-gradient(160deg,#f7f9fc,#eef2f8);
  border: 1px solid var(--border); border-radius: 12px; padding: 11px 6px;
  text-align: center;
}
.acc-icon  { font-size: 18px; margin-bottom: 3px; }
.acc-pct   { font-size: 26px; font-weight: 800; color: var(--blue); line-height: 1; }
.acc-lbl   { font-size: 10.5px; color: var(--txt); font-weight: 700; margin-top: 3px; }
.acc-sub   { font-size: 10px; color: var(--muted); margin-top: 1px; }
.acc-det   { margin-top: 10px; }
.acc-det summary { font-size: 11.5px; color: var(--blue); font-weight: 600; padding: 4px 0; }
.acc-tab   { width:100%; border-collapse:collapse; margin-top:8px; font-size:11px; }
.acc-tab th { color:var(--muted); font-weight:600; padding:5px 3px; text-align:center; border-bottom:1px solid var(--border); }
.acc-tab td { padding:5px 3px; text-align:center; border-bottom:1px solid #f0f2f5; }
.td-team   { text-align:left; font-weight:600; }
.ok  { color: var(--green); font-weight: 800; }
.no  { color: var(--red); font-weight: 800; }

/* ── Form strip ───────────────────────────────────────────────── */
.form-strip {
  display: flex; flex-direction: column; gap: 5px;
  background: var(--card); border: 1px solid var(--border); border-radius: 12px;
  padding: 10px 12px; margin-bottom: 10px; font-size: 12px;
}
.form-col   { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.form-label { font-size: 10px; font-weight: 700; letter-spacing: .3px; min-width: 72px; }
.up-lbl { color: var(--green); }
.dn-lbl { color: var(--red); }
.trend-up { color: var(--green); font-size: 11px; font-weight: 700; }
.trend-dn { color: var(--red); font-size: 11px; font-weight: 700; }
.trend-fl { color: var(--dim); font-size: 11px; }

/* ── Search ───────────────────────────────────────────────────── */
.pk-search { margin-bottom: 8px; }
.pk-search input {
  width: 100%; padding: 12px 14px; border: 1px solid var(--border); border-radius: 12px;
  font-size: 14px; background: var(--card); color: var(--txt);
  -webkit-appearance: none;
}
.pk-search input:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(28,132,255,.1); }

/* ── Summary bar ──────────────────────────────────────────────── */
.pk-summary { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 12px; color: var(--muted); font-weight: 600; }
.pill-alpha-sm { background: rgba(124,58,237,.1); color: var(--purple); padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 700; }
.pill-val-sm   { background: rgba(22,163,74,.1);  color: var(--green);  padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 700; }

/* ── Pick card ────────────────────────────────────────────────── */
.cards-wrap { display: flex; flex-direction: column; gap: 10px; padding-bottom: 8px; }
.pk-card {
  background: var(--card); border: 1px solid var(--border); border-radius: 18px;
  padding: 14px; box-shadow: 0 1px 4px rgba(16,24,40,.06);
  overflow: hidden;
}
.card-alpha {
  border-color: rgba(124,58,237,.3);
  background: linear-gradient(180deg, #fefbff 0%, var(--card) 60px);
}

/* Top row */
.pk-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.pk-author { display: flex; align-items: center; gap: 7px; }
.pk-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--blue); color: #fff; font-size: 10px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  .card-alpha & { background: var(--purple); }
}
.card-alpha .pk-avatar { background: var(--purple); }
.pk-name   { font-size: 12.5px; font-weight: 700; }
.pk-verify { width: 16px; height: 16px; border-radius: 50%; background: var(--blue); color: #fff; font-size: 9px; display: flex; align-items: center; justify-content: center; }
.pk-top-stars .st, .chip-stars .st { font-size: 11px; color: #e2e6ec; }
.pk-top-stars .st.on { color: var(--gold); }
.chip-stars .st.on   { color: var(--gold); }

/* Mid row: teams + meta */
.pk-mid { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
.pk-teams { display: flex; flex-direction: column; gap: 7px; }
.pk-team  { display: flex; align-items: center; gap: 8px; }
.pk-flag  { font-size: 22px; line-height: 1; }
.pk-tname { font-size: 17px; font-weight: 800; line-height: 1.1; }
.pk-elo   { font-size: 10px; }
.pk-meta  { text-align: right; flex-shrink: 0; }
.pk-comp  { font-size: 10.5px; color: var(--muted); margin-bottom: 2px; }
.pk-date  { font-size: 13px; font-weight: 700; }

/* Badge */
.pk-badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 7px 11px; border-radius: 9px;
  font-size: 12px; font-weight: 800; margin-bottom: 11px;
  line-height: 1.2;
}
.badge-pick  { background: rgba(28,132,255,.1); color: var(--blue); }
.badge-value { background: rgba(22,163,74,.1);  color: var(--green); }
.badge-alpha {
  background: linear-gradient(135deg, rgba(124,58,237,.12), rgba(245,166,35,.1));
  color: var(--purple); border: 1px solid rgba(124,58,237,.25);
}

/* Chips */
.pk-chips { display: grid; grid-template-columns: repeat(3,1fr); gap: 7px; margin-bottom: 11px; }
.chip {
  border: 1px solid var(--border); border-radius: 12px; padding: 9px 6px;
  text-align: center; background: #fafbfd; display: flex; flex-direction: column; gap: 3px;
}
.chip-main { border-color: var(--blue); background: rgba(28,132,255,.05); }
.card-alpha .chip-main { border-color: var(--purple); background: rgba(124,58,237,.05); }
.chip-mkt  { font-size: 9px; color: var(--muted); font-weight: 700; letter-spacing: .3px; text-transform: uppercase; }
.chip-sel  {
  font-size: 12px; font-weight: 700; color: var(--txt); line-height: 1.2;
  min-height: 28px; display: flex; align-items: center; justify-content: center;
}
.chip-p    { font-size: 14px; font-weight: 800; color: var(--blue); font-variant-numeric: tabular-nums; }
.chip-main .chip-p { color: var(--blue); }
.card-alpha .chip-main .chip-p { color: var(--purple); }
.eq-tag    { font-size: 8.5px; color: var(--amber); display: block; }
.chip-stars { line-height: 1; }

/* Reason */
.pk-reason {
  font-size: 12.5px; line-height: 1.6; color: #3a4658;
  border-top: 1px solid var(--border); padding-top: 10px;
}

/* ── PARTIDOS TAB ─────────────────────────────────────────────── */
.grp-bar { margin-bottom: 10px; }
.grp-sel {
  width: 100%; padding: 10px 12px; border: 1px solid var(--border); border-radius: 12px;
  font-size: 14px; font-weight: 600; background: var(--card); color: var(--txt); -webkit-appearance: none;
}
.stand-wrap { background: var(--card); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 10px; overflow: hidden; }
.stand-hd   { font-size: 10px; letter-spacing: .8px; font-weight: 700; color: var(--amber); padding: 9px 12px; border-bottom: 1px solid var(--border); }
.stand-tab  { width:100%; border-collapse:collapse; font-size:12px; }
.stand-tab th { color:var(--muted); font-weight:600; font-size:9.5px; padding:6px 4px; text-align:center; border-bottom:1px solid var(--border); }
.stand-tab td { padding:8px 4px; text-align:center; border-bottom:1px solid #f5f7fa; }
.stand-tab .pos  { color:var(--dim); width:20px; }
.stand-tab .pts  { font-weight:700; }
.stand-tab tr.q1 .pos { color:var(--green); font-weight:700; }
.stand-tab tr.q3 .pos { color:var(--amber); font-weight:700; }

.fixture {
  background: var(--card); border: 1px solid var(--border); border-radius: 14px;
  margin-bottom: 8px; overflow: hidden;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 8px; padding: 11px;
}
.fixture.final { background: #fafbfc; }
.fix-team { font-size: 12.5px; font-weight: 700; }
.fix-away { text-align: right; }
.fix-center { text-align: center; }
.fin-sc { font-size: 20px; font-weight: 800; font-variant-numeric: tabular-nums; }
.fin-tag { font-size: 8.5px; letter-spacing: .5px; color: var(--red); font-weight: 700; }
.wdl-bar { display: flex; height: 20px; border-radius: 5px; overflow: hidden; gap: 2px; }
.wdl-w, .wdl-d, .wdl-l {
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; font-weight: 700; color: #fff;
  min-width: 14px;
}
.wdl-w { background: var(--green); }
.wdl-d { background: var(--muted); }
.wdl-l { background: var(--red); }
.fix-proj { font-size: 10px; color: var(--muted); margin-top: 3px; }

/* ── FUTUROS TAB ──────────────────────────────────────────────── */
.mc-loading { display: flex; flex-direction: column; align-items: center; gap: 14px; padding: 40px 20px; }
.mc-spin { font-size: 40px; animation: spin 2s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.mc-txt { font-size: 13px; color: var(--muted); }
.mc-bar-wrap { width: 100%; max-width: 280px; height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
.mc-bar { height: 100%; background: var(--blue); border-radius: 3px; width: 0; transition: width .1s; }

.fut-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 11px; color: var(--muted); flex-wrap: wrap; gap: 6px; }
.fut-legend { display: flex; gap: 10px; }
.leg-q  { color: var(--blue); font-weight: 700; }
.leg-sf { color: var(--amber); font-weight: 700; }
.leg-ch { color: var(--green); font-weight: 700; }
.fut-re { color: var(--blue); cursor: pointer; font-weight: 700; }
.fut-header-row { display: flex; align-items: center; font-size: 10px; color: var(--muted); padding: 0 8px 6px; gap: 6px; }
.fut-bars-hd { flex: 1; }
.fut-champ-hd, .fut-mkt-hd { width: 38px; text-align: right; }
.fut-row {
  display: flex; align-items: center; gap: 6px;
  background: var(--card); border: 1px solid var(--border); border-radius: 12px;
  padding: 9px 10px; margin-bottom: 6px; font-size: 12px;
}
.fut-pos  { width: 18px; color: var(--dim); font-size: 11px; }
.fut-flag { font-size: 18px; }
.fut-name { flex: 1; font-weight: 700; font-size: 13px; }
.fut-bars { width: 90px; display: flex; flex-direction: column; gap: 3px; }
.fut-bar-wrap { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }
.fut-bar-fill { height: 100%; border-radius: 3px; }
.fut-q  { background: rgba(28,132,255,.5); }
.fut-sf { background: var(--amber); }
.fut-ch { background: var(--green); }
.fut-champ { width: 38px; text-align: right; font-weight: 800; font-size: 13px; color: var(--green); }
.fut-mkt   { width: 38px; text-align: right; font-size: 10.5px; color: var(--muted); }

/* ── VALOR TAB ────────────────────────────────────────────────── */
.val-hd { font-size: 12.5px; color: var(--muted); margin-bottom: 10px; display: flex; gap: 6px; align-items: baseline; flex-wrap: wrap; }
.val-hd b { font-size: 18px; color: var(--txt); }
.val-note { font-size: 10.5px; }
.empty-state { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 50px 20px; text-align: center; color: var(--muted); font-size: 13px; }
.empty-icon { font-size: 48px; }
.empty-sub { font-size: 12px; line-height: 1.5; max-width: 280px; }

/* ── INFO TAB ─────────────────────────────────────────────────── */
.info-card {
  background: var(--card); border: 1px solid var(--border); border-radius: 16px;
  padding: 16px; margin-bottom: 10px;
}
.info-card h2 { font-size: 15px; margin-bottom: 10px; }
.info-card p  { font-size: 13px; line-height: 1.6; color: #3a4658; margin-bottom: 8px; }
.info-card ol, .info-card ul { padding-left: 18px; font-size: 13px; line-height: 1.8; color: #3a4658; }
.info-card li { margin-bottom: 3px; }
.info-card code { background: #f0f2f5; padding: 1px 5px; border-radius: 4px; font-family: monospace; font-size: 12px; }
.info-note { font-size: 11.5px; color: var(--muted); padding: 8px; background: #f7f9fc; border-radius: 8px; }

/* ── Splash / loading overlay ─────────────────────────────────── */
#splash {
  position: fixed; inset: 0; z-index: 9999;
  background: #0f1b2d; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 14px;
}
#splash .sp-logo { font-family: monospace; font-size: 36px; font-weight: 900; color: #f5a623; }
#splash .sp-sub  { font-size: 12px; color: #4d6680; letter-spacing: 1px; }
#splash .sp-bar  { width: 160px; height: 3px; background: #1a2840; border-radius: 2px; overflow: hidden; }
#splash .sp-fill { height: 100%; background: #f5a623; animation: load 1.2s ease forwards; }
@keyframes load { from { width:0 } to { width:100% } }

/* ── Misc ─────────────────────────────────────────────────────── */
.flex-1 { flex: 1; }
