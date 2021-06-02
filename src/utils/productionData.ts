import xlsx from "xlsx";
const columnHeaders = ['Drainage Point', 'Date', 'Oil', 'Gas', 'Water', 'Sand', 'Gas Injected', 'Water Injected', 'THP', 'Bean Size', 'Production Days', 'CHP', 'Production Type'] as const;

let mapping: columnHeaderMappings;

type ReadSheetResponse = {
    success: boolean,
    message: string
}

let productionDataContent: unknown[] = [];

export type columnHeaderMappings = {
    [x in internalColumnHeader]: string;
};

export type internalColumnHeader = typeof columnHeaders[number];

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

    getVariable(variableName: internalColumnHeader) {
        console.log(variableName);
    },

    getColumnHeaders() {
        return columnHeaders;
    }
};
