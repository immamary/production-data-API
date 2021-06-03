import { testProductionData } from './testProductionData';
import { productionDataAPI, columnHeaderMappings } from './productionData';
import base64ToArrayBuffer from 'base64-arraybuffer';

describe('productionDataAPI', () => {
    let data: ArrayBuffer;
    let mapping: columnHeaderMappings

    beforeEach(async () => {
        data = base64ToArrayBuffer.decode(testProductionData);

        mapping = {
            "Drainage Point": "UNIQUEID",
            Date: "",
            Oil: "",
            CHP: "",
            THP: "",
            Gas: "",
            Sand: "",
            Water: "",
            "Water Injected": "",
            "Production Days": "",
            "Production Type": "",
            "Gas Injected": "",
            "Bean Size": "",
        };

    });

    it('should read excel sheet', () => {
        const readSheetResponse = productionDataAPI.readSheet(data, mapping);
        expect(readSheetResponse.success).toBe(true);
    });

    it('should return internal column headers', () => {
        const columnHeaders = productionDataAPI.getColumnHeaders();
        expect(columnHeaders.length).toBeGreaterThan(0);
    })

});