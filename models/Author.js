//  Importamos Mongoose
const mongoose = require("mongoose");

// Declaramos nuestro esquema que nos permite declarar nuestros objetos y crearle restricciones.
const Schema = mongoose.Schema;

// Creamos esquema del author:

const allowedCountries = ["SPAIN", "COLOMBIA", "ENGLAND", "RUSSIA", "ENGLAND", "UNITED STATES", "ARGENTINA", "CZECHOSLOVAKIA", "UNITED STATES", "JAPAN", "NIGERIA"];

const authorSchema = new Schema(
  {
    name: { type: String, trim: true, minLength: [3, "Al menos tres letras para el nombre"], maxLength: [22, "Nombre demasiado largo, máximo de 22 caracteres"], required: true },
    country: { type: String, trim: true, minLength: [3, "Al menos tres letras para el país"], maxLength: [20, "País demasiado largo, máximo de 20 caracteres"], enum: allowedCountries, uppercase: true, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true } // Cada vez que se modifique un documento refleja la hora y fecha de modificación
);

// Creamos un modelo para que siempre que creamos un author valide contra el Schema que hemos creado para ver si es valido.
const Author = mongoose.model("Author", authorSchema);

//  Exportamos el modelo para poder usarlo fuera.
module.exports = { Author };
