// Importamos la función que nos sirve para resetear los car:
const { mongoose } = require("mongoose");
const { connect } = require("../db");
const { Publisher } = require("../models/Publisher");

const normalizationPublisher = async () => {
  try {
    await connect();
    console.log("Conexión realizada correctamente");

    const publishers = await Publisher.find();
    console.log(`Hemos recuperado ${publishers.length} editoriales de la base de datos`);
    // Las modificaciones se realizan según las reglas de negocio, se pueden inclusoeliminar datos que no sean correctos

    for (let i = 0; i < publishers.length; i++) {
      const publisher = publishers[i];
      publisher.country = publisher.country.toUpperCase();
      await publisher.save();
      console.log(`Modificada editorial ${publisher.name}`);
    }

    console.log("Modificadas todas las editoriales de nuestra BBDD");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};
normalizationPublisher();
module.exports = { normalizationPublisher };
