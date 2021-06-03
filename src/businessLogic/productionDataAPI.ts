import xlsx from "xlsx";
import { columnHeaderMappings, columnHeaders, internalColumnHeader } from "./productionDataTypes";

let mapping: columnHeaderMappings;

type ReadSheetResponse = {
    success: boolean,
    message: string
}

let productionDataContent: unknown[] = [];


export const productionDataAPI = {
    readSheet: (data: ArrayBuffer, userMapping: columnHeaderMappings): ReadSheetResponse => {
        mapping = userMapping;
        const workbook = xlsx.read(new Uint8Array(data), { type: "array" });
        const productionDataSheetName = workbook.SheetNames.find((sheetName: string) => sheetName == 'Production Data');
        if (productionDataSheetName == undefined) {
            return { success: false, message: 'No Production Data Sheet found' };
        }

        const productionDataSheet = workbook.Sheets[productionDataSheetName];

        productionDataContent = xlsx.utils.sheet_to_json(productionDataSheet);
        return { success: true, message: 'Read Successfully' };
    },

    getColumnHeaders() {
        return columnHeaders;
    },

    getVariable(variableName: internalColumnHeader) {
        const sheetColumnHeader = mapping[variableName];
    }
};
