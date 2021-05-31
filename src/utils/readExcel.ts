import XLSX from "xlsx";

export const ProcessExcelData = (data: string | null | ArrayBuffer) => {
  const workbook = XLSX.read(data, {
    type: "binary",
  });

  //Fetch the name of First Sheet.
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

  //Read all rows from First Sheet into an JSON array.
  const  excelRows = XLSX.utils.sheet_to_json(firstSheet);

  console.log(excelRows)
};
