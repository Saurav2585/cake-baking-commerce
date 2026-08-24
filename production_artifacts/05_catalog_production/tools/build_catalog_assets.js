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

const variants = [
  ['var_bcp_250g','prod_demo_baking_cocoa','250 g','ML-BCP-250','#5b2f23'],
  ['var_bcp_500g','prod_demo_baking_cocoa','500 g','ML-BCP-500','#5b2f23'],
  ['var_bcp_1kg','prod_demo_baking_cocoa','1 kg','ML-BCP-1000','#5b2f23'],
  ['var_pan_6in','prod_round_cake_pan','6 inch','FS-RPN-060','#69777b'],
  ['var_pan_8in','prod_round_cake_pan','8 inch','FS-RPN-080','#69777b'],
  ['var_box_10in_5','prod_window_cake_box','10 × 10 × 5 inch · 5 count','PP-WBX-1005','#c99b57']
].map(([id,productId,label,sku,accent])=>({id,productId,label,sku,accent}));

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

function formShape(form, accent) {
  if (form==='bottle') return `<g filter="url(#s)"><rect x="820" y="250" width="280" height="170" rx="30" fill="${ink}"/><rect x="700" y="390" width="520" height="920" rx="120" fill="${paper}" stroke="#b8a387" stroke-width="8"/><rect x="748" y="580" width="424" height="500" fill="${accent}"/><circle cx="960" cy="830" r="90" fill="${paper}"/></g>`;
  if (form==='tub'||form==='jar') return `<g filter="url(#s)"><ellipse cx="960" cy="430" rx="420" ry="120" fill="${ink}"/><path d="M540 430H1380L1300 1280Q960 1390 620 1280Z" fill="${paper}" stroke="#b8a387" stroke-width="8"/><rect x="630" y="650" width="660" height="400" fill="${accent}"/></g>`;
  if (form==='pan') return `<g filter="url(#s)"><ellipse cx="960" cy="800" rx="610" ry="420" fill="${accent}" stroke="${ink}" stroke-width="22"/><ellipse cx="960" cy="760" rx="510" ry="320" fill="${base}" stroke="${ink}" stroke-width="12"/></g>`;
  if (form==='tool') return `<g filter="url(#s)" transform="rotate(-18 960 800)"><rect x="890" y="180" width="140" height="1100" rx="70" fill="${accent}"/><path d="M760 980H1160L1080 1420H840Z" fill="${paper}" stroke="${ink}" stroke-width="14"/></g>`;
  if (form==='set') return `<g filter="url(#s)">${[0,1,2,3,4,5].map((_,i)=>`<path d="M${520+i*150} 1080V520L${570+i*150} 420L${620+i*150} 520V1080Z" fill="${i%2?paper:accent}" stroke="${ink}" stroke-width="10"/>`).join('')}</g>`;
  if (form==='box') return `<g filter="url(#s)"><path d="M460 540L960 300L1460 540L960 810Z" fill="${paper}" stroke="${ink}" stroke-width="12"/><path d="M460 540V1120L960 1400V810Z" fill="${accent}"/><path d="M1460 540V1120L960 1400V810Z" fill="${paper}" stroke="${ink}" stroke-width="12"/></g>`;
  if (form==='board') return `<g filter="url(#s)"><ellipse cx="960" cy="900" rx="650" ry="380" fill="${accent}" stroke="${ink}" stroke-width="12"/><ellipse cx="960" cy="840" rx="650" ry="380" fill="${paper}" stroke="${ink}" stroke-width="12"/></g>`;
  return `<g filter="url(#s)"><path d="M570 300H1350L1450 420V1300L1320 1420H600L470 1300V420Z" fill="${paper}" stroke="#b8a387" stroke-width="8"/><rect x="610" y="570" width="700" height="520" fill="${accent}"/></g>`;
}

function productSvg(p, variant=null) {
 const accent=variant?.accent||p.accent, title=variant?`${p.title} · ${variant.label}`:p.title, pack=variant?.label||p.pack;
 return svg(1920,1920,`${defs}<rect width="1920" height="1920" fill="${base}"/><rect width="1920" height="1920" fill="url(#g)"/>${formShape(p.form,accent)}<text x="130" y="165" font-family="Arial,sans-serif" font-size="28" letter-spacing="7" fill="${ink}">${brandFor(p)} · PANTRYFORM DEMO</text><text x="130" y="1710" font-family="Georgia,serif" font-size="84" fill="${ink}">${esc(title)}</text><text x="135" y="1782" font-family="Arial,sans-serif" font-size="32" letter-spacing="4" fill="${ink}">${esc(pack)}</text><text x="135" y="1842" font-family="Arial,sans-serif" font-size="20" letter-spacing="3" fill="#8f493a">PORTFOLIO PROTOTYPE · NOT FOR SALE</text>`);
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

function record({assetId,title,family,role,rels,masterFile,alt,derivatives}) {
 const md=descriptor(path.join(masters,masterFile));
 return {manifest_schema_version:'1.0.0',asset_id:assetId,version:1,status:'approved',title,asset_family:family,role,
 relationships:{department_ids:rels.departments||[],product_ids:rels.products||[],recipe_ids:rels.recipes||[],variant_ids:rels.variants||[],skus:rels.skus||[]},
 source_method:'css_svg',creator:{type:'tool',id_or_name:'Pantryform deterministic SVG asset builder'},created_at:'2026-08-25T12:00:00+05:30',generation:null,source_references:[],
 licence:{name:'not_applicable_original',source:'Original procedural artwork for Pantryform portfolio demo',territory:'portfolio prototype',commercial_clearance:'not_assessed'},factual_claims_represented:[],
 prohibited_claim_review:{reviewer:'Visual Asset Generation',date:'2026-08-25',result:'passed',notes:'No certifications, dietary, health, origin, performance, popularity, sustainability, delivery or result claims.'},
 trade_dress_review:{reviewer:'Visual Asset Generation',date:'2026-08-25',result:'passed_for_prototype',notes:'Original geometric system; no competitor or real-brand packaging reference used.'},
 master:{path:`masters/${masterFile}`,width:family==='recipe'||family==='department'?2400:1920,height:family==='recipe'?1800:family==='department'?1600:1920,aspect_ratio:family==='recipe'?'4:3':family==='department'?'3:2':'1:1',format:'svg',colour_space:'sRGB',alpha:false,...md},
 derivatives:derivatives.map(d=>{const dd=descriptor(path.join(exportsDir,d.file));return {derivative_id:d.id,path:`exports/${d.file}`,purpose:d.purpose,parent_version:1,crop:null,focal_point:{x:.5,y:.5},transformations:[`deterministic SVG raster at ${d.width}x${d.height}`],width:d.width,height:d.height,aspect_ratio:`${d.width}:${d.height}`,format:'webp',colour_space:'sRGB',alpha:false,...dd};}),
 alt_text:{owner:'UX/Accessibility',context:role,decision:'informative',text:alt,approval_status:'approved_for_phase_5b_review',approved_at:'2026-08-25'},responsive_usage:[{placement:role,container_range:'320–1440 CSS px',object_fit:role==='hero'?'cover':'contain',safe_zone_notes:'HTML retains product, variant and quantity facts; never infer facts from image alone.'}],optimisation_status:'passed',
 quality_reviews:[{type:'factual_claim_originality_accessibility_technical',reviewer:'Visual Asset Generation',date:'2026-08-25',result:'passed_for_review',issues:[]}],approval:{owner:'PM/orchestrator',decision:'approved_for_phase_5b_review',date:'2026-08-25',approved_placements:['portfolio demo catalog implementation'],limitations:['Not commercial packaging; legal and regulatory artwork not supplied.']},known_limitations:['Procedural portfolio-demo artwork; not product photography.'],replacement_history:{replaces_asset_id:null,replaces_version:null,replaced_by_asset_id:null,replaced_by_version:null,reason:null,date:null},checksum:md.checksum};
}

(async()=>{
 const records=[];
 for(const p of products){
   const baseId=`asset_pf5b_prod_${slug(p.id)}`, stem=`${baseId}_primary`, masterFile=`${stem}_master_v1.svg`;
   fs.writeFileSync(path.join(masters,masterFile),productSvg(p));
   const ds=[{id:baseId+'_primary',file:`${stem}_1200_v1.webp`,purpose:'primary',width:1200,height:1200},{id:baseId+'_thumbnail',file:`${baseId}_thumbnail_480_v1.webp`,purpose:'thumbnail',width:480,height:480}];
   for(const d of ds) await render(masterFile,d.file,d.width,d.height,'contain');
   records.push(record({assetId:baseId+'_primary',title:`${p.title} catalog pack study`,family:'product_packshot',role:'primary',rels:{departments:[p.department],products:[p.id]},masterFile,alt:`${p.title}, ${p.pack}, shown as original portfolio-demo packaging.`,derivatives:ds}));
 }
 for(const v of variants){
   const p=products.find(x=>x.id===v.productId), stem=`asset_pf5b_variant_${slug(v.id)}_v1`, masterFile=`${stem}.svg`;
   fs.writeFileSync(path.join(masters,masterFile),productSvg(p,v));
   const ds=[{id:`${stem}_primary_1200`,file:`${stem}_primary_1200.webp`,purpose:'variant_primary',width:1200,height:1200},{id:`${stem}_thumb_480`,file:`${stem}_thumb_480.webp`,purpose:'variant_thumbnail',width:480,height:480}];
   for(const d of ds) await render(masterFile,d.file,d.width,d.height,'contain');
   records.push(record({assetId:stem,title:`${p.title} ${v.label} variant`,family:'product_packshot',role:'variant',rels:{departments:[p.department],products:[p.id],variants:[v.id],skus:[v.sku]},masterFile,alt:`${v.label} variant of ${p.title}, ${p.pack}.`,derivatives:ds}));
 }
 for(const [id,label,cue,accent] of departmentVisuals){
   const stem=`asset_pf5b_department_${slug(id)}_v1`,masterFile=`${stem}.svg`;fs.writeFileSync(path.join(masters,masterFile),deptSvg(label,cue,accent));
   const ds=[{id:`${stem}_wide`,file:`${stem}_wide_1536x1024.webp`,purpose:'department_hero',width:1536,height:1024},{id:`${stem}_square`,file:`${stem}_square_800.webp`,purpose:'department_tile',width:800,height:800}];for(const d of ds)await render(masterFile,d.file,d.width,d.height,d.purpose==='department_tile'?'contain':'cover');
   records.push(record({assetId:stem,title:`${label} department field`,family:'department',role:'hero',rels:{departments:[id]},masterFile,alt:`Abstract ${label.toLowerCase()} composition based on ${cue.toLowerCase()}.`,derivatives:ds}));
 }
 for(const [id,title,method,accent] of recipes){
   const baseId=`asset_pf5b_recipe_${slug(id)}`,masterFile=`${baseId}_master_v1.svg`;fs.writeFileSync(path.join(masters,masterFile),recipeSvg(title,method,accent));
   const ds=[{id:`${baseId}_hero`,file:`${baseId}_hero_1536x1024_v1.webp`,purpose:'recipe_hero',width:1536,height:1024},{id:`${baseId}_listing`,file:`${baseId}_listing_800x600_v1.webp`,purpose:'recipe_listing',width:800,height:600}];for(const d of ds)await render(masterFile,d.file,d.width,d.height,'cover');
   records.push(record({assetId:`${baseId}_v1`,title:`${title} recipe editorial`,family:'recipe',role:'hero',rels:{recipes:[id]},masterFile,alt:`Abstract measured-process study for ${title}.`,derivatives:ds}));
 }
 const manifest={manifest_schema_version:'1.0.0',generated_at:'2026-08-25T12:00:00+05:30',catalog_scope:{product_count:products.length,variant_owned_media_count:variants.length,recipe_count:recipes.length,department_visual_count:departmentVisuals.length},records};
 fs.writeFileSync(path.join(root,'Catalog_Asset_Manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 const thumbs=[];for(const p of products){const f=`asset_pf5b_prod_${slug(p.id)}_thumbnail_480_v1.webp`;thumbs.push({input:await sharp(path.join(exportsDir,f)).resize(220,220).png().toBuffer(),left:30+(thumbs.length%6)*240,top:70+Math.floor(thumbs.length/6)*260});}
 await sharp({create:{width:1470,height:1120,channels:4,background:base}}).composite(thumbs).png().toFile(path.join(previews,'asset_pf5b_product_contact_sheet_v1.png'));
 const ed=[];for(const r of records.filter(x=>x.asset_family==='department'||x.asset_family==='recipe')){const d=r.derivatives.at(-1);ed.push({input:await sharp(path.join(root,d.path)).resize(300,220,{fit:'cover'}).png().toBuffer(),left:30+(ed.length%4)*330,top:60+Math.floor(ed.length/4)*260});}
 await sharp({create:{width:1350,height:1100,channels:4,background:base}}).composite(ed).png().toFile(path.join(previews,'asset_pf5b_editorial_contact_sheet_v1.png'));
 console.log(`Built ${records.length} masters and ${records.reduce((n,r)=>n+r.derivatives.length,0)} derivatives.`);
})().catch(e=>{console.error(e);process.exit(1)});
