import { testProductionData } from './testProductionData';
import { productionDataAPI, columnHeaderMappings } from './productionData';
import base64ToArrayBuffer from 'base64-arraybuffer';
import { internalColumnHeader } from './productionDataTypes';

describe('productionDataAPI', () => {
    let data: ArrayBuffer;
    let mapping: columnHeaderMappings

    beforeEach(async () => {
        data = base64ToArrayBuffer.decode(testProductionData);

        mapping = {
            "Drainage Point": "UNIQUEID",
            Date: "DATE",
            Oil: "MonthlyOIL (stb)",
            CHP: "CHP",
            THP: "THP (psia)",
            Gas: "MonthlyGAS (scf)",
            Sand: "SAND (pptb)",
            Water: "MonthlyWATER (stb)",
            "Water Injected": "WATINJ",
            "Production Days": "PROD_DAYS",
            "Production Type": "PROD_TYPE",
            "Gas Injected": "GASINJ",
            "Bean Size": "BEAN",
        };

    });

    it('should read excel sheet', () => {
        const readSheetResponse = productionDataAPI.readSheet(data, mapping);

        expect(readSheetResponse.wasSuccessful).toBe(true);
    });

    it('should return internal column headers', () => {
        const columnHeaders = productionDataAPI.getColumnHeaders();

        expect(columnHeaders.length).toBeGreaterThan(0);
    });

    it('should fetch a variable', () => {
        const variableType = "Bean Size"
        const getVariableResponse = productionDataAPI.getVariable(variableType);
        
        expect(getVariableResponse.wasSuccessful).toBe(true);
        expect(getVariableResponse.data!.length).toBeGreaterThan(0);
        expect(getVariableResponse.data![0].BeanSize).toBeTruthy();
    });

    it('should fetch a number of variables', () => {
        const variableTypes: internalColumnHeader[] = ["Drainage Point", "Oil"];
        const getVariablesResponse = productionDataAPI.getVariables(variableTypes);

        expect(getVariablesResponse.wasSuccessful).toBe(true);
        expect(getVariablesResponse.data!.length).toBeGreaterThan(0);
        expect(getVariablesResponse.data![0].DrainagePoint).toBeTruthy();
        expect(getVariablesResponse.data![0].Oil).toBeTruthy();
    });

    it('should apply filter while fetching a single variable', () => {

    });

    it('should apply filter while fetching multiple variables', () => {

    });
});