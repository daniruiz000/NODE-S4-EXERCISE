// Importamos la función que nos sirve para resetear los car:
const { mongoose } = require("mongoose");
const { connect } = require("../db");
const { Author } = require("../models/Author");

const normalizationAuthor = async () => {
  try {
    await connect();
    console.log("Conexión realizada correctamente");

    const authors = await Author.find();
    console.log(`Hemos recuperado ${authors.length} autores de la base de datos`);
    // Las modificaciones se realizan según las reglas de negocio, se pueden inclusoeliminar datos que no sean correctos

    for (let i = 0; i < authors.length; i++) {
      const author = authors[i];
      author.country = author.country.toUpperCase();
      await author.save();
      console.log(`Modificado autor ${author.name}`);
    }

    console.log("Modificados todos las autores de nuestra BBDD");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};
normalizationAuthor();
module.exports = { normalizationAuthor };
