// Importamos el modelo
const { Author } = require("../models/Author.js");

// Creamos 50 autores aleatoriamente y los vamos añadiendo al array de autores:
const authorList = [
  { name: "Gabriel García Márquez", country: "COLOMBIA" },
  { name: "Jane Austen", country: "ENGLAND" },
  { name: "Leo Tolstoy", country: "RUSSIA" },
  { name: "Virginia Woolf", country: "ENGLAND" },
  { name: "Ernest Hemingway", country: "UNITED STATES" },
  { name: "Jorge Luis Borges", country: "ARGENTINA" },
  { name: "Franz Kafka", country: "CZECHOSLOVAKIA" },
  { name: "Toni Morrison", country: "UNITED STATES" },
  { name: "Haruki Murakami", country: "JAPAN" },
  { name: "Chinua Achebe", country: "NIGERIA" },
];

//  Función de reseteo de documentos de la colección.
const resetAuthors = async () => {
  try {
    await Author.collection.drop(); //  Esperamos a que borre los documentos de la colección author de la BBDD.
    console.log("Borrados authors");
    await Author.insertMany(authorList); //  Esperamos a que inserte los nuevos documentos creados en la colección author de la BBDD.
    console.log("Creados authors correctamente");
  } catch (error) {
    //  Si hay error lanzamos el error por consola.
    console.error(error);
  }
};

module.exports = { resetAuthors }; // Exportamos la función para poder usarla.
