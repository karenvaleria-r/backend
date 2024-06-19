require('dotenv').config();

const app = require('./src/app/app.js');
const dbConnection = require('./src/database/conexion.js');

const port = process.env.DEV_PORT;

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

dbConnection();