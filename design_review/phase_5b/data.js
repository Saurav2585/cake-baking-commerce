globalThis.PF5B = (() => {
  const departments = [
    ['ingredients','Ingredients','Flours, sugars, leaveners and add-ins','flour'],
    ['chocolate','Chocolate','Cocoa, couverture, compounds and inclusions','cocoa'],
    ['colour-flavour','Colours & Flavours','Gels, extracts and emulsions','gel'],
    ['fillings-fondant','Fillings & Fondant','Layering, glazing and modelling','fondant'],
    ['decorating','Decorating','Piping, finishing and edible detail','sprinkle'],
    ['bakeware-tools','Bakeware & Tools','Pans, measuring and preparation','tool'],
    ['packaging','Packaging','Boxes, boards, liners and bags','box'],
    ['recipes','Recipes','Measured methods with supply planning','recipe']
  ].map(([id,name,summary,material])=>({id,name,summary,material}));

  const rows = [
    ['stoneground-cake-flour','Measureloom','Stoneground Cake Flour','ingredients','Flours & Mixes','flour','1 kg','₹165','PF-FLR-1000'],
    ['fine-caster-sugar','Measureloom','Fine Caster Sugar','ingredients','Sugars & Sweeteners','sugar','1 kg','₹128','PF-SUG-1000'],
    ['baking-powder','Measureloom','Double-Action Baking Powder','ingredients','Leavening & Essentials','powder','100 g','₹96','PF-BPW-100'],
    ['almond-flakes','Pantryfold','Almond Flakes','ingredients','Nuts, Fruits & Add-ins','almond','200 g','₹245','PF-ALM-200'],
    ['baking-cocoa','Measureloom','Baking Cocoa Powder','chocolate','Cocoa','cocoa','500 g','₹315','ML-BCP-500'],
    ['dark-compound','Cocoastack','Dark Compound Buttons','chocolate','Baking Chocolate','chocolate','500 g','₹280','PF-DCP-500'],
    ['white-callets','Cocoastack','White Chocolate-Style Callets','chocolate','Baking Chocolate','chocolate','500 g','₹350','PF-WCL-500'],
    ['chocolate-chips','Cocoastack','Dark Chocolate-Style Chips','chocolate','Chips & Inclusions','chips','250 g','₹210','PF-CHP-250'],
    ['rose-pink-gel','Tintmark','Rose Pink Gel Colour','colour-flavour','Food Colours','gel','25 g','₹145','PF-COL-RP25'],
    ['leaf-green-gel','Tintmark','Leaf Green Gel Colour','colour-flavour','Food Colours','gel','25 g','₹145','PF-COL-LG25'],
    ['vanilla-extract','Infuseform','Vanilla Extract','colour-flavour','Flavours & Extracts','liquid','60 ml','₹225','PF-VEX-60'],
    ['orange-emulsion','Infuseform','Orange Emulsion','colour-flavour','Flavours & Extracts','liquid','60 ml','₹190','PF-OEM-60'],
    ['mango-filling','Layerwell','Mango Filling','fillings-fondant','Fillings & Glazes','mango','500 g','₹275','PF-MGF-500'],
    ['dark-ganache','Layerwell','Dark Chocolate-Style Ganache','fillings-fondant','Fillings & Glazes','ganache','500 g','₹340','PF-DGN-500'],
    ['white-fondant','Formfold','White Rolled Fondant','fillings-fondant','Fondant & Modelling','fondant','1 kg','₹390','PF-FON-W1K'],
    ['gum-paste','Formfold','White Gum Paste','fillings-fondant','Fondant & Modelling','paste','250 g','₹220','PF-GMP-250'],
    ['rainbow-sprinkles','Finishfield','Rainbow Rod Sprinkles','decorating','Sprinkles & Edible Decor','sprinkle','100 g','₹130','PF-SPR-100'],
    ['piping-tip-set','Finishfield','Six-Piece Piping Tip Set','decorating','Piping & Finishing','metal','6 pieces','₹260','PF-TIP-06'],
    ['offset-spatula','Benchline','Offset Spatula','bakeware-tools','Preparation Tools','tool','20 cm','₹245','PF-SPA-20'],
    ['round-cake-pan','Benchline','Round Cake Pan','bakeware-tools','Pans & Moulds','pan','8 inch','₹420','PF-PAN-R08'],
    ['measuring-cup-set','Benchline','Measuring Cup Set','bakeware-tools','Measuring & Mixing','measure','4 pieces','₹310','PF-MCS-04'],
    ['cake-box','Packplane','Tall Cake Box with Window','packaging','Boxes','box','10 × 10 × 12 inch · 5 pack','₹375','PF-BOX-101012'],
    ['cake-board','Packplane','Square Cake Board','packaging','Boards & Bases','board','10 inch · 5 pack','₹245','PF-BRD-S10'],
    ['cupcake-liners','Packplane','Natural Cupcake Liners','packaging','Liners & Bags','liner','100 pieces','₹180','PF-LIN-100']
  ];
  const assetSlugs=['plain-flour','caster-sugar','baking-powder','almond-flakes','demo-baking-cocoa','dark-compound','white-compound','dark-chips','crimson-gel-colour','blue-powder-colour','vanilla-essence','orange-emulsion','strawberry-filling','neutral-glaze','white-rolled-fondant','icing-sugar','confetti-sprinkles','disposable-piping-bags','silicone-spatula','round-cake-pan','celebration-topper','window-cake-box','square-cake-board','seedless-raisins'];
  const products = rows.map((r,i)=>({id:r[0],brand:r[1],title:r[2],department:r[3],category:r[4],material:r[5],pack:r[6],price:r[7],sku:r[8],assetSlug:assetSlugs[i],index:i+1,status:i===13?'unavailable':i===17?'low demo stock':'available'}));
  const recipes = [
    ['cocoa-celebration-cake','Cocoa Celebration Cake','Cakes','8 servings','cocoa'],
    ['mango-layer-cake','Mango Layer Cake','Cakes','10 servings','mango'],
    ['vanilla-cupcakes','Vanilla Cloud Cupcakes','Cupcakes & Muffins','12 cupcakes','vanilla'],
    ['chocolate-chip-cookies','Chocolate Chip Pantry Cookies','Cookies & Bars','18 cookies','chips'],
    ['orange-glaze-loaf','Orange Glaze Loaf','Cakes','8 slices','orange'],
    ['fondant-finish-guide','Measured Fondant Finish','Frostings, Fillings & Finishes','1 × 8 inch cake','fondant']
  ];
  const recipeAssetSlugs=['demo-cocoa-celebration-cake','strawberry-layer-cake','vanilla-cupcakes','chocolate-chip-cookies','orange-glaze-loaf','fondant-cocoa-cake'];
  const recipeRecords=recipes.map(([id,title,category,yieldLabel,material],i)=>({id,title,category,yieldLabel,material,assetSlug:recipeAssetSlugs[i],index:i+1}));
  return {departments,products,recipes:recipeRecords};
})();
