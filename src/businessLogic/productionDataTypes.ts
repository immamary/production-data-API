export const columnHeaders = [
  "Drainage Point",
  "Date",
  "Oil",
  "Gas",
  "Water",
  "Sand",
  "Gas Injected",
  "Water Injected",
  "THP",
  "Bean Size",
  "Production Days",
  "CHP",
  "Production Type",
] as const;

export type columnHeaderMappings = {
  [x in internalColumnHeader]: string;
};

export type internalColumnHeader = typeof columnHeaders[number];
