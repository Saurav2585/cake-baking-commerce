const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const masters = path.join(root, 'masters');
const exportsDir = path.join(root, 'exports');
const previews = path.join(root, 'previews');
for (const dir of [masters, exportsDir, previews]) fs.mkdirSync(dir, { recursive: true });

const palette = { ink: '#241712', cocoa: '#5b2f23', cocoa2: '#784534', cream: '#f4ead8', paper: '#fffaf1', saffron: '#d8892d', coral: '#c75a44', blue: '#2356a8' };
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const svg = (w, h, body) => `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">${body}</svg>`;
const defs = `<defs><filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="30" stdDeviation="24" flood-color="#241712" flood-opacity=".22"/></filter><linearGradient id="pouch" x1="0" x2="1"><stop stop-color="#eee1cb"/><stop offset=".52" stop-color="#fffaf1"/><stop offset="1" stop-color="#d9c7aa"/></linearGradient><pattern id="grain" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M0 20L20 0M-5 5L5-5M15 25L25 15" stroke="#5b2f23" stroke-opacity=".035"/></pattern></defs>`;

function labelBody(weight, sku, bars) {
  const marks = Array.from({ length: bars }, (_, i) => `<rect x="${78 + i * 28}" y="460" width="12" height="${48 + i * 20}" fill="${palette.saffron}"/>`).join('');
  return `<rect width="560" height="760" rx="4" fill="${palette.paper}"/><rect width="560" height="18" fill="${palette.coral}"/><text x="56" y="92" font-family="Arial,sans-serif" font-size="26" letter-spacing="5" fill="${palette.cocoa}">MEASURELOOM</text><text x="56" y="132" font-family="Arial,sans-serif" font-size="15" letter-spacing="3" fill="${palette.ink}">A PANTRYFORM PILOT BRAND</text><path d="M56 185H504" stroke="${palette.cocoa}" stroke-width="3"/><text x="56" y="275" font-family="Georgia,serif" font-size="68" fill="${palette.ink}">Baking cocoa</text><text x="56" y="342" font-family="Georgia,serif" font-size="68" fill="${palette.ink}">powder</text><text x="56" y="392" font-family="Arial,sans-serif" font-size="20" letter-spacing="4" fill="${palette.cocoa}">FORM · POWDER</text>${marks}<circle cx="453" cy="505" r="62" fill="${palette.cocoa}"/><text x="453" y="516" text-anchor="middle" font-family="Arial,sans-serif" font-size="23" font-weight="700" fill="${palette.cream}">${esc(weight)}</text><path d="M56 616H504" stroke="${palette.cocoa}"/><text x="56" y="651" font-family="Arial,sans-serif" font-size="18" fill="${palette.ink}">SKU ${esc(sku)}</text><text x="56" y="688" font-family="Arial,sans-serif" font-size="17" fill="${palette.ink}">Ingredients · Allergens · Storage</text><text x="56" y="716" font-family="Arial,sans-serif" font-size="17" fill="${palette.ink}">Information not provided</text><text x="56" y="744" font-family="Arial,sans-serif" font-size="14" letter-spacing="2" fill="${palette.coral}">PORTFOLIO PROTOTYPE · NOT FOR SALE</text>`;
}

function labelSvg(weight, sku, bars) { return svg(560, 760, labelBody(weight, sku, bars)); }

function packSvg(weight, sku, bars, scale = 1, angle = 0) {
  const pw = 760 * scale, ph = 1050 * scale, x = (1600 - pw) / 2, y = 240 + (1050 - ph);
  const lw = pw * .7, lh = ph * .66, lx = x + pw * .15, ly = y + ph * .18;
  return svg(1600, 1600, `${defs}<rect width="1600" height="1600" fill="${palette.cream}"/><g filter="url(#shadow)" transform="rotate(${angle} 800 850)"><path d="M${x + pw*.07} ${y}H${x + pw*.93}L${x + pw} ${y+ph*.08}V${y+ph*.92}L${x + pw*.91} ${y+ph}H${x + pw*.09}L${x} ${y+ph*.92}V${y+ph*.08}Z" fill="url(#pouch)" stroke="#b8a387" stroke-width="4"/><path d="M${x + pw*.08} ${y+ph*.07}H${x + pw*.92}" stroke="#9e886b" stroke-width="8"/><rect x="${x}" y="${y}" width="${pw}" height="${ph}" fill="url(#grain)"/><g transform="translate(${lx} ${ly}) scale(${lw/560} ${lh/760})">${labelBody(weight, sku, bars)}</g></g><path d="M300 1450H1300" stroke="${palette.cocoa}" stroke-opacity=".25"/><text x="800" y="1510" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" letter-spacing="4" fill="${palette.cocoa}">HONEST RELATIVE PACK SCALE</text>`);
}

const variants = [
  { id: '250g', weight: '250 g', sku: 'ML-BCP-250', bars: 1, scale: .72 },
  { id: '500g', weight: '500 g', sku: 'ML-BCP-500', bars: 2, scale: .84 },
  { id: '1kg', weight: '1 kg', sku: 'ML-BCP-1000', bars: 4, scale: 1 }
];

const brandMark = svg(900, 260, `<rect width="900" height="260" fill="${palette.paper}"/><path d="M42 58H152V168H42Z" fill="none" stroke="${palette.cocoa}" stroke-width="8"/><path d="M42 168L97 113L152 168" fill="none" stroke="${palette.saffron}" stroke-width="8"/><text x="190" y="132" font-family="Arial,sans-serif" font-size="72" letter-spacing="9" fill="${palette.cocoa}">MEASURELOOM</text><text x="194" y="180" font-family="Arial,sans-serif" font-size="23" letter-spacing="5" fill="${palette.ink}">A PANTRYFORM PILOT BRAND</text>`);
fs.writeFileSync(path.join(masters, 'asset_pf5a_measureloom_brand_mark_v1.svg'), brandMark);
fs.writeFileSync(path.join(masters, 'asset_pf5a_label_master_v1.svg'), svg(1800, 900, `<rect width="1800" height="900" fill="${palette.cream}"/><g transform="translate(60 70) scale(.92)">${labelBody('WEIGHT', 'ML-BCP-XXXX', 3)}</g><g transform="translate(700 70)"><rect width="500" height="760" fill="${palette.paper}"/><text x="44" y="70" font-family="Arial" font-size="24" fill="${palette.ink}">SIDE PANEL</text><text x="44" y="130" font-family="Arial" font-size="18" fill="${palette.ink}">Product · Baking cocoa powder</text><text x="44" y="170" font-family="Arial" font-size="18" fill="${palette.ink}">Form · Powder</text><text x="44" y="230" font-family="Arial" font-size="18" fill="${palette.ink}">Ingredients</text><text x="44" y="262" font-family="Arial" font-size="18" fill="${palette.coral}">Information not provided</text><text x="44" y="322" font-family="Arial" font-size="18" fill="${palette.ink}">Allergens</text><text x="44" y="354" font-family="Arial" font-size="18" fill="${palette.coral}">Information not provided</text><text x="44" y="414" font-family="Arial" font-size="18" fill="${palette.ink}">Storage</text><text x="44" y="446" font-family="Arial" font-size="18" fill="${palette.coral}">Information not provided</text><text x="44" y="700" font-family="Arial" font-size="15" fill="${palette.cocoa}">STRUCTURAL PLACEHOLDER · NO REGULATORY DATA</text></g><g transform="translate(1240 70)"><rect width="500" height="760" fill="${palette.paper}"/><text x="44" y="70" font-family="Arial" font-size="24" fill="${palette.ink}">STRUCTURAL BACK</text><rect x="44" y="112" width="412" height="210" fill="none" stroke="${palette.cocoa}" stroke-dasharray="12 10"/><text x="250" y="205" text-anchor="middle" font-family="Arial" font-size="17" fill="${palette.cocoa}">APPROVED INFORMATION</text><text x="250" y="235" text-anchor="middle" font-family="Arial" font-size="17" fill="${palette.cocoa}">PLACEHOLDER</text><text x="44" y="380" font-family="Arial" font-size="16" fill="${palette.ink}">No FSSAI · barcode · MRP · batch · dates</text><text x="44" y="700" font-family="Arial" font-size="15" fill="${palette.coral}">PORTFOLIO PROTOTYPE · NOT FOR SALE</text></g>`));

for (const v of variants) {
  fs.writeFileSync(path.join(masters, `asset_pf5a_label_${v.id}_v1.svg`), labelSvg(v.weight, v.sku, v.bars));
  fs.writeFileSync(path.join(masters, `asset_pf5a_pack_${v.id}_front_v1.svg`), packSvg(v.weight, v.sku, v.bars, v.scale));
}
fs.writeFileSync(path.join(masters, 'asset_pf5a_pack_500g_threequarter_v1.svg'), packSvg('500 g', 'ML-BCP-500', 2, .84, -5));

function comparisonSvg() {
  const items = variants.map((v, i) => {
    const heights = [650, 820, 1020], widths = [470, 560, 660], h = heights[i], w = widths[i], x = [170, 920, 1570][i], y = 1320 - h, lw = w*.7, lh = h*.66;
    return `<g filter="url(#shadow)"><path d="M${x+w*.07} ${y}H${x+w*.93}L${x+w} ${y+h*.08}V${y+h*.92}L${x+w*.91} ${y+h}H${x+w*.09}L${x} ${y+h*.92}V${y+h*.08}Z" fill="url(#pouch)" stroke="#b8a387" stroke-width="4"/><g transform="translate(${x+w*.15} ${y+h*.18}) scale(${lw/560} ${lh/760})">${labelBody(v.weight,v.sku,v.bars)}</g></g>`;
  }).join('');
  return svg(2400, 1600, `${defs}<rect width="2400" height="1600" fill="${palette.cream}"/><text x="120" y="150" font-family="Georgia,serif" font-size="82" fill="${palette.ink}">One ingredient. Three measured packs.</text><text x="124" y="215" font-family="Arial" font-size="26" letter-spacing="4" fill="${palette.cocoa}">250 g · 500 g · 1 kg</text>${items}<path d="M120 1425H2280" stroke="${palette.cocoa}"/><text x="1200" y="1500" text-anchor="middle" font-family="Arial" font-size="24" letter-spacing="5" fill="${palette.cocoa}">APPARENT SCALE IS PROPORTIONAL TO PACK WEIGHT</text>`);
}
fs.writeFileSync(path.join(masters, 'asset_pf5a_pack_family_comparison_v1.svg'), comparisonSvg());
fs.writeFileSync(path.join(masters, 'asset_pf5a_product_fallback_v1.svg'), svg(800, 800, `<rect width="800" height="800" fill="${palette.cream}"/><path d="M260 180H540L590 240V610L540 660H260L210 610V240Z" fill="none" stroke="${palette.cocoa}" stroke-width="12"/><path d="M285 340H515M285 400H475M285 460H500" stroke="${palette.cocoa}" stroke-width="12"/><circle cx="400" cy="715" r="8" fill="${palette.coral}"/><text x="400" y="760" text-anchor="middle" font-family="Arial" font-size="24" fill="${palette.ink}">Image unavailable</text>`));

async function rasterSvg(file, out, width, height) { await sharp(path.join(masters, file)).resize(width, height, { fit: 'contain', background: palette.cream }).webp({ quality: 84 }).toFile(path.join(exportsDir, out)); }
async function crop(input, out, width, height, position='attention') { await sharp(path.join(masters,input)).resize(width,height,{fit:'cover',position}).webp({quality:82}).toFile(path.join(exportsDir,out)); }

(async () => {
  await crop('asset_pf5a_home_cocoa_foundation_v1.png','asset_pf5a_home_cocoa_desktop_1536x1024_v1.webp',1536,1024,'center');
  await crop('asset_pf5a_home_cocoa_foundation_v1.png','asset_pf5a_home_cocoa_mobile_819x1024_v1.webp',819,1024,'right');
  await crop('asset_pf5a_department_cocoa_foundation_v1.png','asset_pf5a_department_cocoa_1536x1024_v1.webp',1536,1024,'center');
  await crop('asset_pf5a_department_cocoa_foundation_v1.png','asset_pf5a_department_cocoa_1024x1024_v1.webp',1024,1024,'center');
  await crop('asset_pf5a_recipe_cocoa_cake_foundation_v1.png','asset_pf5a_recipe_cocoa_cake_1536x1024_v1.webp',1536,1024,'center');
  await crop('asset_pf5a_recipe_cocoa_cake_foundation_v1.png','asset_pf5a_recipe_cocoa_cake_1365x1024_v1.webp',1365,1024,'center');
  await crop('asset_pf5a_recipe_cocoa_cake_foundation_v1.png','asset_pf5a_recipe_cocoa_process_1200x900_v1.webp',1200,900,'left');
  await crop('asset_pf5a_department_cocoa_foundation_v1.png','asset_pf5a_cocoa_macro_1200x1200_v1.webp',1200,1200,'center');
  for (const v of variants) {
    await rasterSvg(`asset_pf5a_pack_${v.id}_front_v1.svg`,`asset_pf5a_pack_${v.id}_front_1200_v1.webp`,1200,1200);
    await rasterSvg(`asset_pf5a_pack_${v.id}_front_v1.svg`,`asset_pf5a_plp_${v.id}_640_v1.webp`,640,640);
    await rasterSvg(`asset_pf5a_pack_${v.id}_front_v1.svg`,`asset_pf5a_plp_${v.id}_320_v1.webp`,320,320);
  }
  await rasterSvg('asset_pf5a_pack_500g_front_v1.svg','asset_pf5a_plp_parent_640_v1.webp',640,640);
  await rasterSvg('asset_pf5a_pack_500g_threequarter_v1.svg','asset_pf5a_pack_500g_threequarter_1200_v1.webp',1200,1200);
  await rasterSvg('asset_pf5a_pack_family_comparison_v1.svg','asset_pf5a_pack_family_comparison_1800x1200_v1.webp',1800,1200);
  await rasterSvg('asset_pf5a_label_500g_v1.svg','asset_pf5a_label_detail_1200_v1.webp',1200,1200);
  await rasterSvg('asset_pf5a_product_fallback_v1.svg','asset_pf5a_product_fallback_640_v1.webp',640,640);
  const thumbs = [
    'asset_pf5a_home_cocoa_desktop_1536x1024_v1.webp','asset_pf5a_department_cocoa_1024x1024_v1.webp','asset_pf5a_recipe_cocoa_cake_1365x1024_v1.webp',
    'asset_pf5a_pack_250g_front_1200_v1.webp','asset_pf5a_pack_500g_front_1200_v1.webp','asset_pf5a_pack_1kg_front_1200_v1.webp',
    'asset_pf5a_pack_family_comparison_1800x1200_v1.webp','asset_pf5a_cocoa_macro_1200x1200_v1.webp','asset_pf5a_product_fallback_640_v1.webp'
  ];
  const comps=[];
  for (let i=0;i<thumbs.length;i++) comps.push({input:await sharp(path.join(exportsDir,thumbs[i])).resize(420,300,{fit:'cover'}).png().toBuffer(),left:40+(i%3)*450,top:80+Math.floor(i/3)*340});
  const base=sharp({create:{width:1430,height:1120,channels:4,background:palette.cream}}).composite(comps);
  await base.png().toFile(path.join(previews,'asset_pf5a_selected_contact_sheet_v1.png'));
  console.log('Pilot asset build complete');
})().catch((error)=>{console.error(error);process.exit(1)});
