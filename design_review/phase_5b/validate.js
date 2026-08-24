#!/usr/bin/env node
const fs=require('fs'),path=require('path'),base=__dirname;
const files=['index.html','styles.css','narrow-fix.css','data.js','app.js','README.md'];
const missing=files.filter(f=>!fs.existsSync(path.join(base,f)));
if(missing.length)throw new Error(`Missing harness files: ${missing.join(', ')}`);
const data=fs.readFileSync(path.join(base,'data.js'),'utf8'),vm=require('vm');
const context={globalThis:{}};vm.runInNewContext(data,context);
const products=context.globalThis.PF5B.products.length;
const recipes=context.globalThis.PF5B.recipes.length;
const app=fs.readFileSync(path.join(base,'app.js'),'utf8');
const catalog=path.resolve(base,'../../production_artifacts/05_catalog_production');
const manifest=JSON.parse(fs.readFileSync(path.join(catalog,'Catalog_Asset_Manifest.json'),'utf8'));
const manifestPaths=new Set(manifest.records.flatMap(r=>(r.derivatives||[]).map(d=>d.path)));
const expected=[
  ...context.globalThis.PF5B.products.map(p=>`exports/asset_pf5b_prod_${p.assetSlug}_thumbnail_480_v1.webp`),
  ...context.globalThis.PF5B.recipes.map(r=>`exports/asset_pf5b_recipe_${r.assetSlug}_listing_800x600_v1.webp`),
  ...['ingredients','chocolate','colours-flavours','fillings-fondant','decorating','bakeware-tools','packaging'].flatMap(d=>[`exports/asset_pf5b_department_${d}_v1_square_800.webp`,`exports/asset_pf5b_department_${d}_v1_wide_1536x1024.webp`]),
  ...['bcp-250g','bcp-500g','bcp-1kg'].map(v=>`exports/asset_pf5b_variant_${v}_v1_primary_1200.webp`)
  ,'exports/asset_pf5b_recipe_demo-cocoa-celebration-cake_hero_1536x1024_v1.webp'
  ,'exports/asset_pf5b_prod_window-cake-box_primary_1200_v1.webp'
];
const unmanifested=expected.filter(p=>!manifestPaths.has(p));
const absentExports=expected.filter(p=>!fs.existsSync(path.join(catalog,p)));
const required=['contact','departments','plp','products','variants','recipes','mappings','states','stress'];
const absent=required.filter(v=>!app.includes(`${v}:`));
if(products!==24||recipes!==6||absent.length||unmanifested.length||absentExports.length)throw new Error(`Coverage failed: products=${products}, recipes=${recipes}, absent views=${absent.join(',')}, unmanifested=${unmanifested.join(',')}, absent exports=${absentExports.join(',')}`);
console.log(JSON.stringify({status:'PASS',products,recipes,views:required.length,manifestBackedPlacements:expected.length,unmanifested:0,absentExports:0},null,2));
