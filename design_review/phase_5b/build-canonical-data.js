#!/usr/bin/env node
/** Build the browser fixture from the approved Phase 5B canonical records. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '../..');
const catalog = path.join(root, 'production_artifacts/05_catalog_production');
const read = name => JSON.parse(fs.readFileSync(path.join(catalog, name), 'utf8'));
const productData = read('Product_Master_Data.json');
const variantData = read('SKU_Variant_Data.json');
const recipeData = read('Recipe_Master_Data.json');
const mappingData = read('Recipe_Product_Mapping.json');
const manifest = read('Catalog_Asset_Manifest.json');
const contentData = read('Product_Content_Records.json');
const inputNames=['Product_Master_Data.json','SKU_Variant_Data.json','Product_Content_Records.json','Recipe_Master_Data.json','Recipe_Product_Mapping.json','Catalog_Asset_Manifest.json','Fictional_Brand_Registry.md'];
const sourceHashes=Object.fromEntries(inputNames.map(name=>[name,crypto.createHash('sha256').update(fs.readFileSync(path.join(catalog,name))).digest('hex')]));
const brandRegistry=Object.fromEntries(fs.readFileSync(path.join(catalog,'Fictional_Brand_Registry.md'),'utf8').split('\n').map(line=>line.match(/^\| `(brand_[^`]+)` \| ([^|]+?) \|/)).filter(Boolean).map(match=>[match[1],match[2].trim()]));

const labels = {
  departments: {
    dept_ingredients:['ingredients','Ingredients','Flours, sugars, leaveners and add-ins','flour'],
    dept_chocolate:['chocolate','Chocolate','Cocoa, couverture, compounds and inclusions','cocoa'],
    dept_colours_flavours:['colour-flavour','Colours & Flavours','Gels, extracts and emulsions','gel'],
    dept_fillings_fondant:['fillings-fondant','Fillings & Fondant','Layering, glazing and modelling','fondant'],
    dept_decorating:['decorating','Decorating','Piping, finishing and edible detail','sprinkle'],
    dept_bakeware_tools:['bakeware-tools','Bakeware & Tools','Pans, measuring and preparation','tool'],
    dept_packaging:['packaging','Packaging','Boxes, boards, liners and bags','box']
  },
  categories: {cat_flours_mixes:'Flours & Mixes',cat_sugars_sweeteners:'Sugars & Sweeteners',cat_leavening_essentials:'Leavening & Essentials',cat_nuts_fruits_addins:'Nuts, Fruits & Add-ins',cat_cocoa:'Cocoa',cat_baking_chocolate:'Baking Chocolate',cat_chips_inclusions:'Chips & Inclusions',cat_food_colours:'Food Colours',cat_flavours_extracts:'Flavours & Extracts',cat_fillings_glazes:'Fillings & Glazes',cat_fondant_modelling:'Fondant & Modelling',cat_sprinkles_decor:'Sprinkles & Edible Decor',cat_piping_finishing:'Piping & Finishing',cat_presentation_decor:'Presentation & Decor',cat_pans_moulds:'Pans & Moulds',cat_measuring_mixing:'Measuring & Mixing',cat_boxes:'Boxes',cat_boards_bases:'Boards & Bases'},
  recipeCategories:{cat_recipe_cakes:'Cakes',cat_recipe_cupcakes_muffins:'Cupcakes & Muffins',cat_recipe_cookies_bars:'Cookies & Bars'}
};
const records = manifest.records;
const derivative = (predicate, purpose) => {
  const record = records.find(predicate);
  const item = record?.derivatives?.find(d => d.purpose === purpose || d.purpose === `variant_${purpose}` || d.purpose === `recipe_${purpose}` || d.purpose === `department_${purpose}`);
  if (!item) throw new Error(`Missing ${purpose} derivative for canonical relationship`);
  return `../../production_artifacts/05_catalog_production/${item.path}`;
};
const variantLabel = v => v.normalized_sell_quantity?.display_label || v.axis_values?.pack_quantity || (()=>{
  const d=v.axis_values?.dimensions, count=v.axis_values?.pack_count;
  if(d) return `${d.display_label || Object.values(d).filter(x=>typeof x!=='object').join(' × ')}${count?` · ${count} pack`:''}`;
  if(count) return `${count} pieces`;
  return v.sku;
})();
const money = minor => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(minor/100);
const material = p => ({ingredient_dry:'flour',ingredient_liquid:'liquid',chocolate:'chocolate',colour:'gel',filling:'mango',fondant:'fondant',decorating:'sprinkle',tool:'tool',bakeware:'pan',packaging:'box'}[p.product_family] || labels.departments[p.department_id]?.[3] || 'tool');

const variantsByProduct = Object.groupBy(variantData.variants, v => v.parent_product_id);
const contentByProduct=new Map(contentData.records.map(c=>[c.product_id,c]));
const products = productData.products.map((p,index)=>{
  const variants=(variantsByProduct[p.id]||[]).map(v=>({id:v.id,sku:v.sku,axisValues:v.axis_values,pack:variantLabel(v),price:money(v.price_inr_minor),priceMinor:v.price_inr_minor,availability:v.availability,status:v.availability.replaceAll('_',' '),quantity:v.normalized_sell_quantity||null,primary:derivative(r=>r.relationships?.variant_ids?.includes(v.id),'primary'),thumbnail:derivative(r=>r.relationships?.variant_ids?.includes(v.id),'thumbnail')}));
  const selected=variants.find(v=>v.status==='available')||variants[0];
  return {id:p.id,slug:p.slug,canonicalId:p.id,brandId:p.brand_id,brand:brandRegistry[p.brand_id]||p.brand_id,title:p.title,department:labels.departments[p.department_id][0],departmentId:p.department_id,categoryId:p.category_id,category:labels.categories[p.category_id]||p.category_id,variantAxes:p.variant_axes,material:material(p),pack:selected.pack,price:selected.price,priceMinor:selected.priceMinor,sku:selected.sku,status:selected.status,index:index+1,variants,content:contentByProduct.get(p.id),primary:derivative(r=>r.relationships?.product_ids?.includes(p.id)&&!r.relationships?.variant_ids?.length,'primary'),thumbnail:derivative(r=>r.relationships?.product_ids?.includes(p.id)&&!r.relationships?.variant_ids?.length,'thumbnail')};
});
const recipeMaterials={cocoa:'cocoa',vanilla:'vanilla',chocolate:'chips',strawberry:'mango',fondant:'fondant',orange:'orange'};
const recipes=recipeData.recipes.map((r,index)=>({id:r.slug,canonicalId:r.id,title:r.title,categoryId:r.recipe_category,category:labels.recipeCategories[r.recipe_category]||r.recipe_category,yield:r.yield,yieldLabel:r.yield.display_label,ingredients:r.ingredients,material:Object.entries(recipeMaterials).find(([key])=>r.slug.includes(key))?.[1]||'recipe',index:index+1,listing:derivative(x=>x.relationships?.recipe_ids?.includes(r.id),'listing'),hero:derivative(x=>x.relationships?.recipe_ids?.includes(r.id),'hero')}));
const departments=Object.entries(labels.departments).map(([canonicalId,[id,name,summary,material]])=>({canonicalId,id,name,summary,material,square:derivative(r=>r.relationships?.department_ids?.includes(canonicalId)&&r.asset_family==='department','tile'),wide:derivative(r=>r.relationships?.department_ids?.includes(canonicalId)&&r.asset_family==='department','hero')}));
departments.push({canonicalId:'dept_recipes',id:'recipes',name:'Recipes',summary:'Measured methods with supply planning',material:'recipe',square:recipes[0].listing,wide:recipes[0].hero});
const mappingByIngredient=new Map(mappingData.mappings.map(m=>[m.recipe_ingredient_id,m]));
const compareCombo=(a,b)=>a.purchased-b.purchased||a.leftover-b.leftover||a.packCount-b.packCount||a.distinct-b.distinct||a.price-b.price||a.ids.localeCompare(b.ids);
const selectCombination=(variants,required)=>{
  const eligible=variants.filter(v=>v.quantity?.canonical_unit===required.canonical_unit&&v.status!=='unavailable'&&v.status!=='discontinued').sort((a,b)=>a.id.localeCompare(b.id));
  if(!eligible.length)return null;
  const min=Math.min(...eligible.map(v=>v.quantity.canonical_value));
  const bound=Math.ceil(required.value/min);
  let best=null;
  const walk=(index,remaining,chosen)=>{
    if(index===eligible.length){
      const purchased=chosen.reduce((n,x)=>n+x.variant.quantity.canonical_value*x.count,0);
      if(purchased<required.value)return;
      const packs=chosen.flatMap(x=>Array(x.count).fill(x.variant));
      const candidate={packs,purchased,leftover:purchased-required.value,packCount:packs.length,distinct:chosen.length,price:chosen.reduce((n,x)=>n+x.variant.priceMinor*x.count,0),ids:packs.map(v=>v.id).sort().join('|')};
      if(!best||compareCombo(candidate,best)<0)best=candidate;
      return;
    }
    for(let count=0;count<=remaining;count++)walk(index+1,remaining-count,count?[...chosen,{variant:eligible[index],count}]:chosen);
  };
  walk(0,bound,[]);
  return best;
};
const recipeMappings=recipeData.recipes.map(recipe=>({recipeId:recipe.id,items:recipe.ingredients.map(i=>{
  const mapping=mappingByIngredient.get(i.id),required=i.base_quantity;
  if(!mapping)return {ingredientId:i.id,name:i.display_name,required,optional:i.optional,pantryDefault:i.pantry_default,mappingStatus:i.mapping_status,autoAddEligible:false,selectedPacks:[],purchasedCanonicalQuantity:null,leftoverCanonicalQuantity:null,totalPriceMinor:0};
  const product=products.find(p=>p.canonicalId===mapping.product_id),selection=selectCombination(product.variants,required);
  return {ingredientId:i.id,name:i.display_name,required,optional:i.optional,pantryDefault:i.pantry_default,mappingStatus:i.mapping_status,autoAddEligible:Boolean(selection&&!i.optional&&i.pantry_default==='assume_needed'),productId:product.canonicalId,productSlug:product.slug,selectedPacks:(selection?.packs||[]).map(v=>({variantId:v.id,sku:v.sku,pack:v.pack,quantity:v.quantity,priceMinor:v.priceMinor})),purchasedCanonicalQuantity:selection?{value:selection.purchased,unit:required.canonical_unit}:null,leftoverCanonicalQuantity:selection?{value:selection.leftover,unit:required.canonical_unit}:null,totalPriceMinor:selection?.price||0};
})}));
const payload={source:{inputs:inputNames,sha256:sourceHashes,selectionRule:mappingData.selection_rule,tieBreakOrder:mappingData.tie_break_order},departments,products,recipes,recipeMappings};
const output=`/* Generated by build-canonical-data.js. Do not edit. */\nglobalThis.PF5B=${JSON.stringify(payload,null,2)};\n`;
fs.writeFileSync(path.join(__dirname,'canonical-data.js'),output);
console.log(JSON.stringify({status:'PASS',products:products.length,variants:variantData.variants.length,recipes:recipes.length,mappings:mappingData.mappings.length,output:'design_review/phase_5b/canonical-data.js'},null,2));
