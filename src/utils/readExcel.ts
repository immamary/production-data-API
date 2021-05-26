import XLSX from "xlsx";

const getFileData = (e: Event) => {
  const reader = new FileReader();

  reader.onload = () => {
    reader.readAsText(e.files[0])
  }
};

export const ProcessExcelData = (data: string|null|ArrayBuffer) => {
  var workbook = XLSX.read(data, {
    type: "binary",
  });

  //Fetch the name of First Sheet.
  var firstSheet = workbook.SheetNames[0];

  //Read all rows from First Sheet into an JSON array.
  // var excelRows = XLSX.utils.sheet_to_row_object_array(
    workbook.Sheets[firstSheet]
  );
};
