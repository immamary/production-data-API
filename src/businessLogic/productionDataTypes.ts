declare global {
  interface String {
    convertColumnToProperty(): string;
  }
}
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


export interface ProductionDataRow {
  DrainagePoint?: string
  Date?: string
  Oil?: number,
  Gas?: number,
  Water?: number,
  Sand?: number,
  GasInjected?: number,
  WaterInjected?: number,
  THP?: number,
  BeanSize?: number,
  ProductionDays?: number,
  CHP?: number,
  ProductionType?: string,
}

export type filter = (variableName: ProductionDataRow) => boolean;

String.prototype.convertColumnToProperty = function () {
  return `${this.replace(/\s/g, '')}`;
}
