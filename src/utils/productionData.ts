import xlsx from "xlsx";

let excelRows: unknown[] = [];
export namespace excelAPI {
    export type columnHeaderMappings = {
        [x in columnHeaders]: string;
    };
    let mapping: columnHeaderMappings;
    export type columnHeaders = 'Drainage Point' | 'Date' | 'Oil' | 'Gas' | 'Water' | 'Sand' | 'Gas Injected' | 'Water Injected' | 'THP' | 'Bean Size' | 'Production Days' | 'CHP' | 'Production Type';
    export const util = {
        readExcel: (data: ArrayBuffer, userMapping: columnHeaderMappings) => {
            mapping = userMapping;
            const workbook = xlsx.read(new Uint8Array(data), { type: "array" });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

            excelRows = xlsx.utils.sheet_to_json(firstSheet);
            return excelRows;
        },

        getVariable(variableName: columnHeaders) {

        },

        getColumnHeaders() {
            return Object.keys(mapping);
        }
    };
}