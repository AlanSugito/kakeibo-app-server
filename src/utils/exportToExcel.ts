import * as XLSX from "xlsx";

const writeExcelFile = (data: any[], filename: string) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet);

    const file = XLSX.writeFile(workbook, filename, {
      bookType: "xlsx",
      type: "file",
    });

    return file;
  } catch (error) {
    console.log(error);
  }
};

export default writeExcelFile;
