export const departments: Record<
  string,
  { id: string; title: string; copy: string }
> = {
  ingredients: {
    id: "dept_ingredients",
    title: "Ingredients",
    copy: "Flours, sugars, leaveners and add-ins for measured methods.",
  },
  chocolate: {
    id: "dept_chocolate",
    title: "Chocolate",
    copy: "Cocoa, compounds and inclusions in exact baking packs.",
  },
  "colours-flavours": {
    id: "dept_colours_flavours",
    title: "Colours & Flavours",
    copy: "Gel, powder, essence and emulsion formats kept distinct.",
  },
  "fillings-fondant": {
    id: "dept_fillings_fondant",
    title: "Fillings & Fondant",
    copy: "Layering, glazing, covering and modelling formats.",
  },
  decorating: {
    id: "dept_decorating",
    title: "Decorating",
    copy: "Piping, sprinkles and finishing details.",
  },
  "bakeware-tools": {
    id: "dept_bakeware_tools",
    title: "Bakeware & Tools",
    copy: "Pans and preparation tools with dimensions kept visible.",
  },
  packaging: {
    id: "dept_packaging",
    title: "Packaging",
    copy: "Boxes and boards defined by exact dimensions and counts.",
  },
};
