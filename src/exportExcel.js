const ExcelJS = require("exceljs");
const exportExcel = (data) => {
  return new Promise((resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Datos");

    // Definir encabezados de columnas
    worksheet.columns = [
      { header: "Dni", key: "codigo_trabajador" },
      { header: "Codigo", key: "cod_cliente" },
      { header: "Problema", key: "problem_text" },
      { header: "Ubicacion o codigo de cliente", key: "cliente_ubicacion" },
      { header: "Descripcion del problema", key: "problem_descript_text" },
      { header: "Foto", key: "img_url" },
      { header: "Fecha Incidencia", key: "fecha_incidencia" },
    ];

    // Agregar los datos al worksheet
    data.forEach((item) => {
      worksheet.addRow(item);
    });

    // Guardar el libro en un archivo
    const filePath = "data.xlsx";
    workbook.xlsx
      .writeFile(filePath)
      .then(() => {
        resolve(filePath);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
module.exports = {
  exportExcel,
};
