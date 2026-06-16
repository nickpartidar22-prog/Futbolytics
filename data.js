// netlify/functions/odds.js
// ─── Netlify Serverless Function — The Odds API proxy ────────────────────────
// Variable de entorno (Netlify → Site Settings → Environment Variables):
//   ODDS_API_KEY  →  tu API key de https://the-odds-api.com (gratis, 500 req/mes)
//
// Ruta automática vía netlify.toml: /api/odds → /.netlify/functions/odds
// Mercados: 1X2 (h2h) + Over/Under 2.5 (totals) + Ambos anotan (btts)
// ─────────────────────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

const TEAM_MAP = {
  'Spain':'ESP','France':'FRA','Argentina':'ARG','England':'ENG',
  'Brazil':'BRA','Portugal':'POR','Germany':'GER','Netherlands':'NED',
  'Japan':'JPN','Morocco':'MAR','Senegal':'SEN','Colombia':'COL',
  'Uruguay':'URU','Belgium':'BEL','Croatia':'CRO','Norway':'NOR',
  'Switzerland':'SUI','Ecuador':'ECU','Turkey':'TUR','Türkiye':'TUR',
  'South Korea':'KOR','Korea Republic':'KOR','Mexico':'MEX','United States':'USA',
  'USA':'USA','Canada':'CAN','Australia':'AUS','Austria':'AUT',
  'Sweden':'SWE','Tunisia':'TUN','Egypt':'EGY','Iran':'IRN',
  'Saudi Arabia':'KSA','New Zealand':'NZL','Bosnia and Herzegovina':'BIH',
  'Qatar':'QAT','Cape Verde':'CPV','Paraguay':'PAR','South Africa':'RSA',
  'Czech Republic':'CZE','Czechia':'CZE','Scotland':'SCO','Haiti':'HAI',
  'Curacao':'CUW','Curaçao':'CUW',"Côte d'Ivoire":'CIV','Ivory Coast':'CIV',
  'Algeria':'ALG','Jordan':'JOR','DR Congo':'COD','Congo DR':'COD',
  'Uzbekistan':'UZB','Ghana':'GHA','Panama':'PAN','Iraq':'IRQ',
};

const WC_SPORT_KEYS = [
  'soccer_fifa_world_cup',
  'soccer_fifa_world_cup_2026',
  'soccer_world_cup',
];

function avg(arr) {
  const valid = arr.filter(x => x != null && x > 1);
  return valid.length ? valid.reduce((a, b) => a + b) / valid.length : null;
}

function parseGame(game) {
  const homeCode = TEAM_MAP[game.home_team];
  const awayCode = TEAM_MAP[game.away_team];
  if (!homeCode || !awayCode) return null;

  const h2h  = { home:[], draw:[], away:[] };
  const tot  = { over:[], under:[] };
  const btts = { yes:[], no:[] };

  for (const bk of (game.bookmakers || [])) {
    for (const mkt of (bk.markets || [])) {
      if (mkt.key === 'h2h') {
        for (const o of mkt.outcomes) {
          if (o.name === game.home_team)       h2h.home.push(o.price);
          else if (o.name === game.away_team)  h2h.away.push(o.price);
          else if (o.name === 'Draw')          h2h.draw.push(o.price);
        }
      } else if (mkt.key === 'totals') {
        for (const o of mkt.outcomes) {
          if (o.point !== 2.5 && o.point !== '2.5') continue;
          if (o.name === 'Over')       tot.over.push(o.price);
          else if (o.name === 'Under') tot.under.push(o.price);
        }
      } else if (mkt.key === 'btts' || mkt.key === 'both_teams_score') {
        for (const o of mkt.outcomes) {
          if (o.name === 'Yes')      btts.yes.push(o.price);
          else if (o.name === 'No') btts.no.push(o.price);
        }
      }
    }
  }

  const h1 = avg(h2h.home), hX = avg(h2h.draw), h2 = avg(h2h.away);
  if (!h1 || !hX || !h2) return null;

  const vig  = (1/h1 + 1/hX + 1/h2);
  const imp1 = (1/h1)/vig, impX = (1/hX)/vig, imp2 = (1/h2)/vig;

  return {
    key: `${homeCode}|${awayCode}`,
    h1, hX, h2,
    imp1: +imp1.toFixed(4), impX: +impX.toFixed(4), imp2: +imp2.toFixed(4),
    over25:  avg(tot.over),
    under25: avg(tot.under),
    bttsY:   avg(btts.yes),
    bttsN:   avg(btts.no),
    books:   (game.bookmakers || []).length,
    commenceTime: game.commence_time,
  };
}

exports.handler = async (event) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS };
  }

  const API_KEY = process.env.ODDS_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        data: null,
        source: 'no_credentials',
        message: 'Agrega ODDS_API_KEY en Netlify → Site Settings → Environment Variables.',
      }),
    };
  }

  let games = null, sportKey = null, reqLeft = null, reqUsed = null;

  for (const key of WC_SPORT_KEYS) {
    try {
      const url = new URL(`https://api.the-odds-api.com/v4/sports/${key}/odds/`);
      url.searchParams.set('apiKey', API_KEY);
      url.searchParams.set('regions', 'eu,uk');
      url.searchParams.set('markets', 'h2h,totals,btts');
      url.searchParams.set('oddsFormat', 'decimal');
      url.searchParams.set('daysFrom', '8');

      const r = await fetch(url.toString());
      reqLeft = r.headers.get('x-requests-remaining');
      reqUsed = r.headers.get('x-requests-used');

      if (r.status === 404) continue;
      if (!r.ok) throw new Error(`HTTP ${r.status}`);

      games    = await r.json();
      sportKey = key;
      break;
    } catch (err) {
      if (err.message.startsWith('HTTP')) continue;
      throw err;
    }
  }

  if (!games) {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        data: null,
        source: 'no_sport',
        message: 'El Mundial 2026 no está disponible aún en The Odds API.',
      }),
    };
  }

  const now    = new Date().toISOString();
  const result = {};

  for (const game of games) {
    const parsed = parseGame(game);
    if (parsed) result[parsed.key] = { ...parsed, fetchedAt: now };
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      data:      result,
      fetchedAt: now,
      source:    'odds_api_live',
      sport:     sportKey,
      count:     Object.keys(result).length,
      reqLeft:   reqLeft ? +reqLeft : null,
      reqUsed:   reqUsed ? +reqUsed : null,
    }),
  };
};
