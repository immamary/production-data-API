import xlsx from "xlsx";
import {
  columnHeaderMappings,
  columnHeaders,
  internalColumnHeader,
  ProductionDataRow,
  filter,
} from "./productionDataTypes";

let mapping: columnHeaderMappings;

type ReadSheetResponse = {
  wasSuccessful: boolean;
  message: string;
};

type GetVariableResponse = {
  wasSuccessful: boolean;
  message: string;
  data?: ProductionDataRow[];
};

let productionDataContent: any[] = [];
let hasReadSheet: boolean = false;

export const productionDataAPI = {
  readSheet(
    data: ArrayBuffer,
    userMapping: columnHeaderMappings
  ): ReadSheetResponse {
    mapping = userMapping;
    const workbook = xlsx.read(new Uint8Array(data), { type: "array" });
    const productionDataSheetName = workbook.SheetNames.find(
      (sheetName: string) => sheetName == "Production Data"
    );
    if (productionDataSheetName == undefined) {
      return {
        wasSuccessful: false,
        message: "No Production Data Sheet found",
      };
    }

    const productionDataSheet = workbook.Sheets[productionDataSheetName];

    productionDataContent = xlsx.utils.sheet_to_json(productionDataSheet);
    hasReadSheet = true;
    return { wasSuccessful: true, message: "Read Successfully" };
  },

  getColumnHeaders() {
    return columnHeaders;
  },

  getVariable(variableName: internalColumnHeader): GetVariableResponse {
    if (!hasReadSheet && mapping != undefined) {
      return {
        wasSuccessful: false,
        message:
          "Sheet has not been read or mapping does not match any column header",
      };
    }

    const sheetColumnHeader = mapping[variableName];
    if (sheetColumnHeader == undefined) {
      return {
        wasSuccessful: false,
        message: "Sheet column header not found",
      };
    }

    const variables = productionDataContent.map((row) => {
      return {
        [variableName.convertColumnToProperty()]: row[sheetColumnHeader],
      } as ProductionDataRow;
    });

    return {
      wasSuccessful: true,
      message: "Got Variables",
      data: variables,
    };
  },

  getVariables(variables: internalColumnHeader[]): GetVariableResponse {
    if (!hasReadSheet && mapping != undefined) {
      return {
        wasSuccessful: false,
        message:
          "Sheet has not been read or mapping does not match any column header",
      };
    }

    const sheetColumnHeaders = variables.map((variable) => {
      return mapping[variable];
    });

    if (sheetColumnHeaders.findIndex((header) => header == undefined) != -1) {
      return {
        wasSuccessful: false,
        message: "Sheet column header not found for one of the variables",
      };
    }

    const variableColumns = productionDataContent.map((row) => {
      let variableColumn: { [key: string]: any } = {} as ProductionDataRow;
      for (let index = 0; index < sheetColumnHeaders.length; index++) {
        let columnHeader = sheetColumnHeaders[index];
        variableColumn[variables[index].convertColumnToProperty()] =
          row[columnHeader];
      }

      return variableColumn;
    });

    return {
      wasSuccessful: true,
      message: "Got Variables",
      data: variableColumns,
    };
  },
  getVariableAndFilter(
    variableName: internalColumnHeader,
    cb: filter
  ): GetVariableResponse {
    if (!hasReadSheet && mapping != undefined) {
      return {
        wasSuccessful: false,
        message:
          "Sheet has not been read or mapping does not match any column header",
      };
    }

    const sheetColumnHeader = mapping[variableName];
    if (sheetColumnHeader == undefined) {
      return {
        wasSuccessful: false,
        message: "Sheet column header not found",
      };
    }
    const data = productionDataContent.filter(cb);
    console.log(data);

    const variables = data.map((row: any) => {
      return {
        [variableName.convertColumnToProperty()]: row[sheetColumnHeader],
      } as ProductionDataRow;
    });

    return {
      wasSuccessful: true,
      message: "Got Variables",
      data: variables,
    };
  },
};
