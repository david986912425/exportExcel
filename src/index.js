const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const firebase = require("./firebase/firebase");
const { exportExcel } = require("./exportExcel");
const fs = require('fs');
app.get("/", (req, res) => {
  res.send("Bienvenido al backend");
});

app.get("/excel", async (req, res) => {
  try {
    let db = firebase.firestore();
    let query = db.collection("reports");
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs
      .map((doc) => {
        let first = doc.data().img_url
          ? doc.data().img_url.replace(/&amp;#x2F;/g, "/")
          : "";
        let second = first.replace(/&amp;#x3D;/g, "=");

        return {
          codigo_trabajador: doc.data().codigo_trabajador,
          cod_cliente: doc.data().cod_cliente,
          cliente_ubicacion: doc.data().cliente_ubicacion,
          problem_text: doc.data().problem_text,
          problem_descript_text: doc.data().problem_descript_text,
          fecha_incidencia: doc.data().fecha_incidencia,
          img_url: second,
        };
      })
      .filter((doc) => doc.img_url !== "");

    try {
      const filePath = await exportExcel(response);

      // Configurar la respuesta para descargar el archivo
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filePath}"`
      );

      // Leer el archivo y enviarlo como respuesta
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      console.error("Error al crear el archivo Excel:", error);

      return res.status(500).json({
        success: false,
        error: "Error al crear el archivo Excel",
      });
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.use(cors());
app.use(express.json());

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
