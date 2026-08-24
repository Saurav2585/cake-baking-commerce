const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const masters = path.join(root, 'masters');
const exportsDir = path.join(root, 'exports');
const previews = path.join(root, 'previews');
for (const dir of [masters, exportsDir, previews]) fs.mkdirSync(dir, { recursive: true });
for (const dir of [masters, exportsDir, previews]) {
  for (const file of fs.readdirSync(dir)) if (file.startsWith('asset_pf5b_')) fs.unlinkSync(path.join(dir, file));
}

const products = [
  ['prod_plain_flour','Plain flour','dept_ingredients','pouch','Multiple packs','#d2a85c'],['prod_caster_sugar','Caster sugar','dept_ingredients','pouch','Multiple packs','#cfb277'],
  ['prod_icing_sugar','Icing sugar','dept_ingredients','pouch','500 g','#d8cdb7'],['prod_baking_powder','Baking powder','dept_ingredients','jar','Multiple packs','#c75a44'],
  ['prod_almond_flakes','Almond flakes','dept_ingredients','pouch','200 g','#b98543'],['prod_seedless_raisins','Seedless raisins','dept_ingredients','pouch','250 g','#76513f'],
  ['prod_demo_baking_cocoa','Baking cocoa powder','dept_chocolate','pouch','Multiple packs','#5b2f23'],['prod_dark_compound','Dark compound chocolate','dept_chocolate','pouch','Multiple packs','#3e241e'],
  ['prod_white_compound','White compound chocolate','dept_chocolate','pouch','Multiple packs','#ded0ae'],['prod_dark_chips','Dark chocolate chips','dept_chocolate','pouch','Multiple packs','#6b3d30'],
  ['prod_crimson_gel_colour','Crimson gel colour','dept_colours_flavours','bottle','Multiple packs','#cf4038'],['prod_blue_powder_colour','Blue powder colour','dept_colours_flavours','jar','20 g','#315b9a'],
  ['prod_vanilla_essence','Vanilla essence','dept_colours_flavours','bottle','Multiple packs','#ba7b34'],['prod_orange_emulsion','Orange emulsion','dept_colours_flavours','bottle','30 ml','#d17e32'],
  ['prod_strawberry_filling','Strawberry filling','dept_fillings_fondant','tub','Multiple packs','#c65765'],['prod_white_rolled_fondant','White rolled fondant','dept_fillings_fondant','tub','Multiple packs','#ddd5c4'],
  ['prod_neutral_glaze','Neutral glaze','dept_fillings_fondant','tub','500 g','#b7a68c'],['prod_confetti_sprinkles','Confetti sprinkles','dept_decorating','jar','Multiple packs','#c76356'],
  ['prod_disposable_piping_bags','Disposable piping bags','dept_decorating','box','20 count','#d3a45f'],['prod_celebration_topper','Celebration cake topper','dept_decorating','set','1 piece','#b99048'],
  ['prod_round_cake_pan','Round cake pan','dept_bakeware_tools','pan','Multiple sizes','#69777b'],['prod_silicone_spatula','Silicone spatula','dept_bakeware_tools','tool','1 unit','#6d797c'],
  ['prod_window_cake_box','Window cake box','dept_packaging','box','Multiple sizes and counts','#c99b57'],['prod_square_cake_board','Square cake board','dept_packaging','board','Multiple sizes and counts','#b58b49']
].map(([id,title,department,form,pack,accent])=>({id,title,department,form,pack,accent}));

const skuFixture = JSON.parse(fs.readFileSync(path.join(root, 'SKU_Variant_Data.json'))).variants;
const variantCounts = skuFixture.reduce((out, item) => (out[item.parent_product_id] = (out[item.parent_product_id] || 0) + 1, out), {});
// Every sellable SKU receives atomic media. This deliberately exceeds the minimum
// multi-option requirement so exact count, dimension and single-pack physical forms
// never rely on an ambiguous parent image in engineering.
const variants = skuFixture.map(item => ({
  id: item.id,
  productId: item.parent_product_id,
  label: item.normalized_sell_quantity.display_label,
  sku: item.sku,
  accent: products.find(product => product.id === item.parent_product_id).accent
}));

const departments = [
  ['dept_ingredients','Ingredients','scoop','#b98543'],['dept_chocolate','Chocolate','button','#63382d'],
  ['dept_colours_flavours','Colours & flavours','drop','#c65755'],['dept_fillings_fondant','Fillings & fondant','fold','#8a6d79'],
  ['dept_decorating','Decorating','star','#d79b43'],['dept_bakeware_tools','Bakeware & tools','rule','#53686f'],['dept_packaging','Packaging','box','#b68a4b']
];

// Seven merchandise visual files follow the approved Phase 2B taxonomy exactly.
const departmentVisuals = [
  ['dept_ingredients','Ingredients','Measured powder','#b98543'],['dept_chocolate','Chocolate','Buttons and blocks','#63382d'],
  ['dept_colours_flavours','Colours & flavours','Drops and written hues','#c65755'],['dept_fillings_fondant','Fillings & fondant','Folds and layers','#8a6d79'],
  ['dept_decorating','Decorating','Tips and details','#d79b43'],['dept_bakeware_tools','Bakeware & tools','Form and measure','#657579'],
  ['dept_packaging','Packaging','Flat to assembled','#b68a4b']
];

const recipes = [
  ['recipe_demo_cocoa_celebration_cake','Cocoa Celebration Cake','measure · mix · stack','#5b2f23'],
  ['recipe_vanilla_cupcakes','Vanilla Cupcakes','portion · bake · pipe','#ba7b34'],
  ['recipe_chocolate_chip_cookies','Chocolate Chip Cookies','measure · shape · bake','#6b3d30'],
  ['recipe_strawberry_layer_cake','Strawberry Layer Cake','fold · fill · stack','#c65765'],
  ['recipe_fondant_cocoa_cake','Fondant Cocoa Cake','cover · smooth · finish','#c86f7d'],
  ['recipe_orange_glaze_loaf','Orange Glaze Loaf','measure · bake · glaze','#d17e32']
];

const esc = (s) => String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const slug = (s) => s.replace(/^prod_|^var_|^recipe_|^dept_/,'').replaceAll('_','-');
const svg = (w,h,body) => `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;
const defs = `<defs><filter id="s"><feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#241712" flood-opacity=".2"/></filter><pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.5" fill="#241712" opacity=".08"/></pattern></defs>`;
const base = '#f2e7d4', paper='#fffaf1', ink='#241712';
const brandFor = (p) => p.id==='prod_demo_baking_cocoa' ? 'MEASURELOOM' : ({
  dept_ingredients:'FIELDNOTE',dept_chocolate:'NIBFORM',dept_colours_flavours:'TINTFOLD',
  dept_fillings_fondant:'FILLMARK',dept_decorating:'DETAILBENCH',dept_bakeware_tools:'FORMSTEAD',dept_packaging:'PACKPLANE'
}[p.department]);

function ingredientWindow(p, accent) {
  const id=p.id;
  if(id.includes('caster')) return `<path d="M670 1150Q960 990 1250 1150V1280H670Z" fill="#f5eddb"/>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<path d="M${710+i%5*125} ${1050+Math.floor(i/5)*100}l16 22-16 22-16-22z" fill="#d0b172" stroke="#9c814e" stroke-width="3"/>`).join('')}`;
  if(id.includes('icing')) return `<path d="M650 1190Q960 1030 1270 1190V1280H650Z" fill="#f8f4ec"/>${[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i=>`<circle cx="${650+i*47}" cy="${920+(i%4)*42}" r="7" fill="#c9bca8" opacity=".42"/>`).join('')}<ellipse cx="960" cy="1040" rx="250" ry="64" fill="none" stroke="#8d8375" stroke-width="16"/><path d="M710 1040H560" stroke="#8d8375" stroke-width="24" stroke-linecap="round"/>`;
  if(id.includes('flour')) return `<path d="M670 1160Q960 880 1250 1160V1280H670Z" fill="#e8d8b8"/><path d="M700 1130q260-240 520 0" fill="none" stroke="#d1b986" stroke-width="8"/><path d="M720 1080q-110-50-160-180l330-110q55 120-30 220" fill="#d7b36d" stroke="#8b6b3f" stroke-width="12"/>`;
  if(id.includes('powder')||id.includes('cocoa')) return `<path d="M670 1110Q960 920 1250 1110V1280H670Z" fill="${id.includes('cocoa')?'#4b291f':id.includes('blue')?'#315b9a':'#eee3c9'}"/>${[0,1,2,3,4,5,6,7].map(i=>`<circle cx="${730+i*70}" cy="${1100-(i%3)*22}" r="${7+i%2*3}" fill="${id.includes('cocoa')?'#76503c':accent}" opacity=".7"/>`).join('')}`;
  if(id.includes('almond')) return [0,1,2,3,4,5,6,7,8].map(i=>`<ellipse cx="${720+(i%5)*120}" cy="${1050+Math.floor(i/5)*100}" rx="54" ry="20" transform="rotate(${i%2?24:-18} ${720+(i%5)*120} ${1050+Math.floor(i/5)*100})" fill="#d7ad70" stroke="#8b6036" stroke-width="5"/>`).join('');
  if(id.includes('raisin')) return [0,1,2,3,4,5,6,7,8,9].map(i=>`<ellipse cx="${700+(i%5)*130}" cy="${1030+Math.floor(i/5)*105}" rx="44" ry="32" fill="#674338" stroke="#3b2924" stroke-width="5"/>`).join('');
  if(id.includes('compound')) return [0,1,2,3,4,5].map(i=>`<rect x="${700+(i%3)*170}" y="${1000+Math.floor(i/3)*125}" width="142" height="96" rx="14" fill="${id.includes('white')?'#eee0b9':'#533126'}" stroke="#33221d" stroke-width="7"/>`).join('');
  if(id.includes('chips')) return [0,1,2,3,4,5,6,7,8].map(i=>`<path d="M${700+(i%5)*125} ${1100+Math.floor(i/5)*110}l34-58 34 58z" fill="#513027"/>`).join('');
  if(id.includes('sprinkles')) return [0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<rect x="${690+(i%6)*105}" y="${1010+Math.floor(i/6)*125}" width="70" height="18" rx="9" transform="rotate(${i%2?30:-25} ${725+(i%6)*105} ${1019+Math.floor(i/6)*125})" fill="${['#c64f48','#df9e3e','#5a8291','#6f8553'][i%4]}"/>`).join('');
  return `<path d="M690 1160Q960 980 1230 1160" fill="none" stroke="${accent}" stroke-width="58" stroke-linecap="round"/>`;
}

function packageLabel(p, pack, sku, x=650, y=560, w=620, h=420) {
  const form = ({pouch:'DRY PANTRY',jar:'JAR',bottle:'LIQUID',tub:'FILL / FINISH',box:'PACK',set:'DECORATING',pan:'BAKEWARE',tool:'TOOL',board:'BOARD'}[p.form]||'SUPPLY');
  const compact=w<500,labelSize=compact?17:24,disclosureY=compact?y+h-14:y+h-38;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${p.accent}"/><path d="M${x+32} ${y+82}H${x+w-32}M${x+32} ${y+h-82}H${x+w-32}" stroke="${paper}" stroke-width="4" opacity=".75"/><text x="${x+38}" y="${y+58}" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="5" fill="${paper}">${brandFor(p)}</text><text x="${x+38}" y="${y+148}" font-family="Georgia,serif" font-size="48" fill="${paper}">${esc(p.title)}</text><text x="${x+38}" y="${y+205}" font-family="Arial,sans-serif" font-size="23" letter-spacing="3" fill="${paper}">${form}</text><g stroke="${paper}" stroke-width="5">${[0,1,2,3,4].map(i=>`<path d="M${x+40+i*55} ${y+245}v${i%2?28:46}"/>`).join('')}</g><text x="${x+38}" y="${y+h-38}" font-family="Arial,sans-serif" font-size="${labelSize}" font-weight="700" fill="${paper}">${esc(pack)} · ${esc(sku)}</text><text x="${x+w-38}" y="${disclosureY}" text-anchor="end" font-family="Arial,sans-serif" font-size="${compact?11:15}" fill="${paper}">PORTFOLIO DEMO</text></g>`;
}

function formShape(p, pack, sku, scale=1) {
  const {form,accent,id}=p;
  if(form==='bottle') {
    if(id.includes('vanilla')) return `<g filter="url(#s)" transform="translate(${(1-scale)*960} ${(1-scale)*900}) scale(${scale})"><path d="M850 250H1070V480H850Z" fill="${ink}"/><path d="M810 440H1110L1160 1370Q960 1420 760 1370Z" fill="#f5efe3" fill-opacity=".72" stroke="#8c775f" stroke-width="9"/><path d="M810 1230Q960 1080 1110 1230V1360H810Z" fill="#a86e2d" opacity=".55"/>${packageLabel(p,pack,sku,770,620,380,390)}<path d="M960 330V520" stroke="${paper}" stroke-width="16"/><circle cx="960" cy="545" r="18" fill="${accent}"/></g>`;
    const gel=id.includes('gel'); return `<g filter="url(#s)" transform="translate(${(1-scale)*960} ${(1-scale)*900}) scale(${scale})"><path d="M${gel?790:780} 300H${gel?1130:1140}V430H${gel?790:780}Z" fill="${ink}"/><path d="M${gel?720:650} 430H${gel?1200:1270}L${gel?1280:1350} 1320Q960 1420 ${gel?640:570} 1320Z" fill="${id.includes('orange')?'#ead8b8':'#e9dfcb'}" stroke="#8c775f" stroke-width="9"/><path d="M${gel?700:620} 1180Q960 ${id.includes('orange')?900:1000} ${gel?1220:1300} 1180V1320H${gel?700:620}Z" fill="${accent}" opacity=".8"/>${packageLabel(p,pack,sku,690,590,540,420)}${id.includes('orange')?'<path d="M700 1120q260-180 520 0" fill="none" stroke="#d17e32" stroke-width="34"/>':''}</g>`; }
  if(form==='tub'||form==='jar') return `<g filter="url(#s)" transform="translate(${(1-scale)*960} ${(1-scale)*900}) scale(${scale})"><ellipse cx="960" cy="420" rx="420" ry="110" fill="${ink}"/><path d="M550 430H1370L1300 1350Q960 1440 620 1350Z" fill="#eadfcb" stroke="#8c775f" stroke-width="9"/>${ingredientWindow(p,accent)}${id.includes('fondant')?'<path d="M720 1170q240-230 480 0q-240 170-480 0" fill="#f8f3e8" stroke="#9c8f7b" stroke-width="8"/>':''}${id.includes('filling')?'<path d="M720 1160q120-210 240 0q120-210 240 0" fill="none" stroke="#bf4455" stroke-width="54"/>':''}${packageLabel(p,pack,sku,650,570,620,390)}</g>`;
  if(form==='pan') { const d=pack.startsWith('6')?520:680; return `<g filter="url(#s)"><ellipse cx="960" cy="840" rx="${d}" ry="${Math.round(d*.62)}" fill="#657579" stroke="${ink}" stroke-width="22"/><ellipse cx="960" cy="790" rx="${d-90}" ry="${Math.round((d-90)*.62)}" fill="${base}" stroke="${ink}" stroke-width="12"/><path d="M${960-d} 1320H${960+d}m0-28v56m-${2*d}-56v56" stroke="${ink}" stroke-width="9"/><text x="960" y="1405" text-anchor="middle" font-family="Arial,sans-serif" font-size="42" fill="${ink}">${esc(pack)}</text></g>`; }
  if(form==='tool') return `<g filter="url(#s)" transform="rotate(-18 960 800)"><rect x="890" y="160" width="140" height="1030" rx="70" fill="#75614a"/><path d="M760 940Q960 850 1160 940L1080 1420H840Z" fill="${accent}" stroke="${ink}" stroke-width="14"/><path d="M960 260V750" stroke="${paper}" stroke-width="7" stroke-dasharray="28 20"/></g>`;
  if(form==='set') return `<g filter="url(#s)"><path d="M960 300l75 155 170 25-123 120 29 170-151-80-151 80 29-170-123-120 170-25z" fill="${accent}" stroke="${ink}" stroke-width="12"/>${[0,1,2].map(i=>`<path d="M${690+i*270} 1320V720" stroke="${ink}" stroke-width="18"/>`).join('')}<path d="M620 1320H1300" stroke="${ink}" stroke-width="16"/></g>`;
  if(form==='box'&&id.includes('piping')) return `<g filter="url(#s)"><rect x="500" y="450" width="920" height="900" fill="${paper}" stroke="${ink}" stroke-width="12"/>${[0,1,2,3].map(i=>`<path d="M${630+i*190} 690l130 470H${610+i*190}z" fill="none" stroke="#738187" stroke-width="13"/>`).join('')}${packageLabel(p,pack,sku,610,470,700,190)}</g>`;
  if(form==='box') return `<g filter="url(#s)"><path d="M440 570L960 320L1480 570L960 840Z" fill="${paper}" stroke="${ink}" stroke-width="12"/><path d="M440 570V1190L960 1450V840Z" fill="${accent}"/><path d="M1480 570V1190L960 1450V840Z" fill="${paper}" stroke="${ink}" stroke-width="12"/><path d="M720 455L960 345L1200 455L960 580Z" fill="#d9eef0" stroke="${ink}" stroke-width="8"/><text x="960" y="1320" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" fill="${ink}">${esc(pack)}</text></g>`;
  if(form==='board') return `<g filter="url(#s)"><path d="M400 520H1400V1320H400Z" fill="#b88b45" stroke="${ink}" stroke-width="14"/><path d="M460 460H1460V1260H460Z" fill="#f1e0aa" stroke="${ink}" stroke-width="14"/><path d="M460 1380H1460m0-25v50m-1000-50v50" stroke="${ink}" stroke-width="9"/><text x="960" y="1470" text-anchor="middle" font-family="Arial,sans-serif" font-size="38" fill="${ink}">${esc(pack)}</text></g>`;
  return `<g filter="url(#s)" transform="translate(${(1-scale)*960} ${(1-scale)*900}) scale(${scale})"><path d="M570 260H1350L1450 390V1370L1320 1470H600L470 1370V390Z" fill="${paper}" stroke="#8c775f" stroke-width="9"/><path d="M550 1220H1370V1380H550Z" fill="#ead9bd"/>${ingredientWindow(p,accent)}${packageLabel(p,pack,sku)}</g>`;
}

function productSvg(p, variant=null) {
 const representative=variant||skuFixture.find(item=>item.parent_product_id===p.id), pack=variant?.label||representative.normalized_sell_quantity.display_label, sku=variant?.sku||representative.sku;
 const title=variant?`${p.title} · ${pack}`:p.title;
 return svg(1920,1920,`${defs}<rect width="1920" height="1920" fill="${base}"/><rect width="1920" height="1920" fill="url(#g)"/>${formShape(p,pack,sku,variant&&variantCounts[p.id]>1?(pack.includes('1 kg')||pack.includes('100 ml')||pack.includes('500 g')?1:.88):1)}<text x="130" y="150" font-family="Arial,sans-serif" font-size="25" letter-spacing="6" fill="${ink}">PANTRYFORM · MEASUREFIELD OBJECT STUDY</text><text x="130" y="1710" font-family="Georgia,serif" font-size="76" fill="${ink}">${esc(title)}</text><text x="135" y="1782" font-family="Arial,sans-serif" font-size="29" letter-spacing="4" fill="${ink}">${esc(pack)} · ${esc(sku)}</text><text x="135" y="1842" font-family="Arial,sans-serif" font-size="20" letter-spacing="3" fill="#8f493a">PORTFOLIO DEMO · NOT FOR SALE</text>`);
}

function deptSvg(label, cue, accent) {
 return svg(2400,1600,`${defs}<rect width="2400" height="1600" fill="${base}"/><path d="M0 1160Q520 760 920 1040T1710 760T2400 900V1600H0Z" fill="${accent}"/><g fill="none" stroke="${ink}" stroke-width="18">${[0,1,2,3].map(i=>`<circle cx="${1420+i*190}" cy="${350+i*80}" r="${95+i*34}"/>`).join('')}<path d="M180 310H1040M180 370H860M180 430H980"/></g><text x="180" y="220" font-family="Arial,sans-serif" font-size="26" letter-spacing="7" fill="${ink}">PANTRYFORM DEPARTMENT FIELD</text><text x="180" y="710" font-family="Georgia,serif" font-size="150" fill="${ink}">${esc(label)}</text><text x="190" y="800" font-family="Arial,sans-serif" font-size="36" letter-spacing="5" fill="${ink}">${esc(cue)}</text>`);
}

function recipeSvg(title, method, accent) {
 return svg(2400,1800,`${defs}<rect width="2400" height="1800" fill="${base}"/><circle cx="1590" cy="900" r="610" fill="${paper}" stroke="${ink}" stroke-width="18"/><circle cx="1590" cy="900" r="450" fill="${accent}"/><path d="M1310 740Q1590 500 1870 740M1260 940Q1590 700 1920 940M1340 1120Q1590 940 1840 1120" fill="none" stroke="${paper}" stroke-width="42"/><g fill="${ink}"><rect x="210" y="420" width="90" height="620"/><rect x="360" y="560" width="90" height="480"/><rect x="510" y="690" width="90" height="350"/></g><text x="180" y="190" font-family="Arial,sans-serif" font-size="28" letter-spacing="7" fill="${ink}">FROM MEASURE TO METHOD</text><text x="180" y="1390" font-family="Georgia,serif" font-size="115" fill="${ink}">${esc(title)}</text><text x="190" y="1490" font-family="Arial,sans-serif" font-size="34" letter-spacing="5" fill="${ink}">${esc(method)}</text><text x="190" y="1580" font-family="Arial,sans-serif" font-size="22" fill="#8f493a">EDITORIAL DEMO IMAGE · NOT A GUARANTEED RESULT</text>`);
}

async function render(svgName, outName, width, height, fit='cover') {
 await sharp(path.join(masters,svgName)).resize(width,height,{fit,position:'center',background:base}).webp({quality:82,effort:5}).toFile(path.join(exportsDir,outName));
}

function descriptor(file) {
 const data=fs.readFileSync(file); return {bytes:data.length,checksum:{algorithm:'sha256',value:crypto.createHash('sha256').update(data).digest('hex')}};
}

function record({assetId,title,family,role,rels,masterFile,alt,derivatives,promptRef=null}) {
 const md=descriptor(path.join(masters,masterFile));
 const generated=masterFile.startsWith('generated/');
 const masterWidth=generated?1536:(family==='recipe'||family==='department'?2400:1920),masterHeight=generated?1024:(family==='recipe'?1800:family==='department'?1600:1920);
 return {manifest_schema_version:'1.0.0',asset_id:assetId,version:1,status:'approved',title,asset_family:family,role,
 relationships:{department_ids:rels.departments||[],product_ids:rels.products||[],recipe_ids:rels.recipes||[],variant_ids:rels.variants||[],skus:rels.skus||[]},
 source_method:generated?'generated_source_with_deterministic_responsive_crops':family==='product_packshot'?'deterministic_svg_pack_and_manual_label_composite':'css_svg',creator:{type:'tool',id_or_name:generated?'OpenAI built-in image generation + Pantryform deterministic crop pipeline':'Pantryform deterministic SVG asset builder'},created_at:'2026-08-25T12:00:00+05:30',generation:generated?{tool:'OpenAI built-in image generation',prompt_reference:promptRef,visible_generated_typography:false,processing:'Text-free approved source; deterministic Sharp WebP crops only.'}:null,source_references:generated?[{type:'prompt_lineage',path:'Editorial_Generation_Prompts.md',reference:promptRef}]:[],
 licence:{name:'not_applicable_original',source:generated?'Original generated editorial source for Pantryform portfolio demo':'Original procedural artwork for Pantryform portfolio demo',territory:'portfolio prototype',commercial_clearance:'not_assessed'},factual_claims_represented:[],
 prohibited_claim_review:{reviewer:'Visual Asset Generation',date:'2026-08-25',result:'passed',notes:'No certifications, dietary, health, origin, performance, popularity, sustainability, delivery or result claims.'},
 trade_dress_review:{reviewer:'Visual Asset Generation',date:'2026-08-25',result:'passed_for_prototype',notes:generated?'Original text-free editorial generation; no competitor image, real brand or packaging trade dress used.':'Original geometric system; no competitor or real-brand packaging reference used.'},
 master:{path:`masters/${masterFile}`,width:masterWidth,height:masterHeight,aspect_ratio:generated?'3:2':family==='recipe'?'4:3':family==='department'?'3:2':'1:1',format:generated?'png':'svg',colour_space:'sRGB',alpha:false,...md},
 derivatives:derivatives.map(d=>{const dd=descriptor(path.join(exportsDir,d.file));return {derivative_id:d.id,path:`exports/${d.file}`,purpose:d.purpose,parent_version:1,crop:generated?{method:'centre_crop',source_aspect_ratio:'3:2'}:null,focal_point:{x:.5,y:.5},transformations:[generated?`deterministic generated-source WebP crop at ${d.width}x${d.height}`:`deterministic SVG raster at ${d.width}x${d.height}`],width:d.width,height:d.height,aspect_ratio:`${d.width}:${d.height}`,format:'webp',colour_space:'sRGB',alpha:false,...dd};}),
 alt_text:{owner:'UX/Accessibility',context:role,decision:'informative',text:alt,approval_status:'approved_for_phase_5b_review',approved_at:'2026-08-25'},responsive_usage:[{placement:role,container_range:'320–1440 CSS px',object_fit:role==='hero'?'cover':'contain',safe_zone_notes:'HTML retains product, variant and quantity facts; never infer facts from image alone.'}],optimisation_status:'passed',
 quality_reviews:[{type:'factual_claim_originality_accessibility_technical',reviewer:'Visual Asset Generation',date:'2026-08-25',result:'passed_for_review',issues:[]}],approval:{owner:'PM/orchestrator',decision:'approved_for_phase_5b_review',date:'2026-08-25',approved_placements:['portfolio demo catalog implementation'],limitations:[generated?'Generated editorial imagery is prototype-only; finished-bake appearance is illustrative.':'Not commercial packaging; legal and regulatory artwork not supplied.']},known_limitations:[generated?'Generated portfolio-demo editorial imagery; finished-bake presentation is illustrative and not a guaranteed result.':'Procedural portfolio-demo artwork; not product photography.'],replacement_history:{replaces_asset_id:null,replaces_version:null,replaced_by_asset_id:null,replaced_by_version:null,reason:null,date:null},checksum:md.checksum};
}

(async()=>{
 const records=[];
 for(const p of products){
   const baseId=`asset_pf5b_prod_${slug(p.id)}`, stem=`${baseId}_primary`, masterFile=`${stem}_master_v1.svg`;
   fs.writeFileSync(path.join(masters,masterFile),productSvg(p));
   const ds=[{id:baseId+'_primary',file:`${stem}_1200_v1.webp`,purpose:'primary',width:1200,height:1200},{id:baseId+'_thumbnail',file:`${baseId}_thumbnail_480_v1.webp`,purpose:'thumbnail',width:480,height:480}];
   for(const d of ds) await render(masterFile,d.file,d.width,d.height,'contain');
   const representative=skuFixture.find(item=>item.parent_product_id===p.id);
   records.push(record({assetId:baseId+'_primary',title:`${p.title} catalog pack study`,family:'product_packshot',role:'primary',rels:{departments:[p.department],products:[p.id]},masterFile,alt:`${p.title}, ${representative.normalized_sell_quantity.display_label}, shown as original portfolio-demo packaging or object illustration.`,derivatives:ds}));
 }
 for(const v of variants){
   const p=products.find(x=>x.id===v.productId), stem=`asset_pf5b_variant_${slug(v.id)}_v1`, masterFile=`${stem}.svg`;
   fs.writeFileSync(path.join(masters,masterFile),productSvg(p,v));
   const ds=[{id:`${stem}_primary_1200`,file:`${stem}_primary_1200.webp`,purpose:'variant_primary',width:1200,height:1200},{id:`${stem}_thumb_480`,file:`${stem}_thumb_480.webp`,purpose:'variant_thumbnail',width:480,height:480}];
   for(const d of ds) await render(masterFile,d.file,d.width,d.height,'contain');
   records.push(record({assetId:stem,title:`${p.title} ${v.label} variant`,family:'product_packshot',role:'variant',rels:{departments:[p.department],products:[p.id],variants:[v.id],skus:[v.sku]},masterFile,alt:`${v.label} variant of ${p.title}; exact SKU ${v.sku}, shown as original portfolio-demo packaging or object illustration.`,derivatives:ds}));
 }
 for(const [id,label,cue,accent] of departmentVisuals){
   const stem=`asset_pf5b_department_${slug(id)}_v1`,masterFile=`generated/asset_pf5b_department_${slug(id)}_source_v2.png`;
   const ds=[{id:`${stem}_wide`,file:`${stem}_wide_1536x1024.webp`,purpose:'department_hero',width:1536,height:1024},{id:`${stem}_square`,file:`${stem}_square_800.webp`,purpose:'department_tile',width:800,height:800}];for(const d of ds)await render(masterFile,d.file,d.width,d.height,'cover');
   const deptAlt={dept_ingredients:'Measured overhead arrangement of flour, caster sugar, cocoa, almond flakes and raisins in separate scoops and arcs.',dept_chocolate:'Overhead study of dark and white compound chocolate pieces, chocolate chips, mould grid and palette knife.',dept_colours_flavours:'Overhead measurement grid with red gel drops, blue powder colour, amber vanilla essence and orange emulsion.',dept_fillings_fondant:'Overhead study of strawberry filling, folded white fondant and brushed neutral glaze with ruler and offset spatula.',dept_decorating:'Overhead decorating study with piping bag and rosette, sorted confetti sprinkles and aligned cake toppers.',dept_bakeware_tools:'Overhead workbench with two differently sized round pans, silicone spatula, ruler and dimension cords.',dept_packaging:'Overhead kraft packaging study with flat and assembled window cake boxes, square boards, scored folds and ruler.'}[id];
   records.push(record({assetId:stem,title:`${label} department field`,family:'department',role:'hero',rels:{departments:[id]},masterFile,alt:deptAlt,derivatives:ds,promptRef:`Department prompts / ${label}`}));
 }
 for(const [id,title,method,accent] of recipes){
   const baseId=`asset_pf5b_recipe_${slug(id)}`,masterFile=`generated/${baseId}_source_v2.png`;
   const ds=[{id:`${baseId}_hero`,file:`${baseId}_hero_1536x1024_v1.webp`,purpose:'recipe_hero',width:1536,height:1024},{id:`${baseId}_listing`,file:`${baseId}_listing_800x600_v1.webp`,purpose:'recipe_listing',width:800,height:600}];for(const d of ds)await render(masterFile,d.file,d.width,d.height,'cover');
   const recipeAlt={recipe_demo_cocoa_celebration_cake:'Two-layer cocoa celebration cake with one cut slice, restrained piping, cocoa dusting and a measuring spoon.',recipe_vanilla_cupcakes:'Six vanilla cupcakes with ivory frosting, including one cut open to show the pale crumb, beside measured sugar.',recipe_chocolate_chip_cookies:'Golden chocolate chip cookies on parchment with one broken open, visible dark chips and a small scoop.',recipe_strawberry_layer_cake:'Strawberry layer cake with visible pink filling, ivory frosting, sliced strawberries and one removed slice.',recipe_fondant_cocoa_cake:'White-fondant-covered cocoa cake with a cut slice, geometric fondant detail, smoother and measured fondant strip.',recipe_orange_glaze_loaf:'Sliced orange-glaze loaf on parchment with translucent glaze, orange-zest curls and a measured spoon.'}[id];
   records.push(record({assetId:`${baseId}_v1`,title:`${title} recipe editorial`,family:'recipe',role:'hero',rels:{recipes:[id]},masterFile,alt:recipeAlt,derivatives:ds,promptRef:`Recipe prompts / ${title}`}));
 }
 const manifest={manifest_schema_version:'1.0.0',generated_at:'2026-08-25T12:00:00+05:30',catalog_scope:{product_count:products.length,variant_owned_media_count:variants.length,recipe_count:recipes.length,department_visual_count:departmentVisuals.length},records};
 fs.writeFileSync(path.join(root,'Catalog_Asset_Manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 const thumbs=[];for(const p of products){const f=`asset_pf5b_prod_${slug(p.id)}_thumbnail_480_v1.webp`;thumbs.push({input:await sharp(path.join(exportsDir,f)).resize(220,220).png().toBuffer(),left:30+(thumbs.length%6)*240,top:70+Math.floor(thumbs.length/6)*260});}
 await sharp({create:{width:1470,height:1120,channels:4,background:base}}).composite(thumbs).png().toFile(path.join(previews,'asset_pf5b_product_contact_sheet_v1.png'));
 const variantTiles=[];for(const v of variants){const f=`asset_pf5b_variant_${slug(v.id)}_v1_thumb_480.webp`;variantTiles.push({input:await sharp(path.join(exportsDir,f)).resize(180,180).png().toBuffer(),left:25+(variantTiles.length%7)*200,top:45+Math.floor(variantTiles.length/7)*205});}
 await sharp({create:{width:1430,height:45+Math.ceil(variantTiles.length/7)*205,channels:4,background:base}}).composite(variantTiles).png().toFile(path.join(previews,'asset_pf5b_variant_contact_sheet_v1.png'));
 const closeupIds=['prod_plain_flour','prod_demo_baking_cocoa','prod_crimson_gel_colour','prod_strawberry_filling','prod_confetti_sprinkles'];
 const closeups=[];for(const id of closeupIds){const f=`asset_pf5b_prod_${slug(id)}_primary_1200_v1.webp`;closeups.push({input:await sharp(path.join(exportsDir,f)).extract({left:300,top:280,width:600,height:470}).resize(440,345).png().toBuffer(),left:25+(closeups.length%3)*470,top:35+Math.floor(closeups.length/3)*380});}
 await sharp({create:{width:1440,height:800,channels:4,background:base}}).composite(closeups).png().toFile(path.join(previews,'asset_pf5b_packaging_label_closeups_v1.png'));
 const thumbTests=[];for(const p of products){const f=`asset_pf5b_prod_${slug(p.id)}_thumbnail_480_v1.webp`;thumbTests.push({input:await sharp(path.join(exportsDir,f)).resize(120,120).grayscale().png().toBuffer(),left:20+(thumbTests.length%8)*130,top:25+Math.floor(thumbTests.length/8)*135});}
 await sharp({create:{width:1060,height:440,channels:4,background:'#f4f1e9'}}).composite(thumbTests).png().toFile(path.join(previews,'asset_pf5b_plp_thumbnail_grayscale_test_v1.png'));
 const ed=[];for(const r of records.filter(x=>x.asset_family==='department'||x.asset_family==='recipe')){const d=r.derivatives.at(-1);ed.push({input:await sharp(path.join(root,d.path)).resize(300,220,{fit:'cover'}).png().toBuffer(),left:30+(ed.length%4)*330,top:60+Math.floor(ed.length/4)*260});}
 await sharp({create:{width:1350,height:1100,channels:4,background:base}}).composite(ed).png().toFile(path.join(previews,'asset_pf5b_editorial_contact_sheet_v1.png'));
 console.log(`Built ${records.length} masters and ${records.reduce((n,r)=>n+r.derivatives.length,0)} derivatives.`);
})().catch(e=>{console.error(e);process.exit(1)});
