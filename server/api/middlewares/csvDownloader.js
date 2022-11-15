import excel from "exceljs";
import logger from "~logger";

const csvDownloader = (req, res) => {

    
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Data");

    worksheet.columns = req.data.header;
    worksheet.addRows(req.data.value);

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
};
export { csvDownloader };