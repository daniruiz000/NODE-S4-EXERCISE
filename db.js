// Cargamos variables de entorno
require("dotenv").config();
const DB_CONNECTION = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

// Importamos la librería Mongoose.
const mongoose = require("mongoose");

//  Configuración de la conexión:
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  dbName: DB_NAME, // BBDD a la que tiene que atacar
};
// Nos conectamos a Moongoose
const connect = async () => {
  try {
    const database = await mongoose.connect(DB_CONNECTION, config);
    const name = database.connection.name;
    const host = database.connection.host;
    console.log(`Conectado a la base de datos ${name} en el host ${host}`);
    return database;
  } catch (error) {
    console.error(error);
    console.log("Error en la conexión, intentando conectar en 5 segundos");
    setTimeout(connect, 5000);
  }
};
// Exportamos el archivo
module.exports = { connect };
