// Importamos express.
const express = require("express");

// Importamos librería cors:
const cors = require("cors");

// Importamos los routers creados.
const { bookRouter } = require("./routes/book.routes"); //  LO IMPORTAMOS COMO UN OBJETO.
const { authorRouter } = require("./routes/author.routes");
const { publisherRouter } = require("./routes/publisher.routes");
const { fileUploadRouter } = require("./routes/fileUpload.routes");

// --------------------------------------------------------------------------------------------

//  Función asíncrona que gestiona nuestra API.
const main = async () => {
  // Conexión a la base de datos.
  const { connect } = require("./db.js"); // Importamos el archivo de conexión a la BBDD.
  const database = await connect(); //  Conectamos con la BBDD.

  //  Configuración del server.
  const PORT = 3000; //  Definimos el puerto..
  const app = express(); // Definimos el app. Lo gestionará express.
  app.use(express.json()); // Sepa interpretar los JSON
  app.use(express.urlencoded({ extended: false })); //  Sepa interpretar bien los parametros de las rutas.
  app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"] })); // Utilice la libreria cors para gestionar la seguridad de acceso a la API

  // Definimos el routerHome que será el encargado de manejar las peticiones a nuestras rutas en la raíz.
  const routerHome = express.Router();

  // ENDPOINT DE /:

  // Endpoint de la Home de nuestra API.
  routerHome.get("/", (req, res) => {
    res.send(`Esta es la Home de nuestra API. Estamos usando la BBDD de ${database.connection.name}`);
  });

  //  Para que todas las peticiones que no se correspondan con nuestras rutas den un codigo 404 y manden un mensaje de error.
  routerHome.get("*", (req, res) => {
    res.status(404).send("Lo sentimos :( No hemos encontrado la página requerida.");
  });

  // Middlewares de aplicación(afecta a todas las rutas):
  // Ejemplo de Middleware de logs en consola.
  app.use((req, res, next) => {
    const date = new Date();
    console.log(`Petición de tipo ${req.method} a la url ${req.originalUrl} el ${date}`);
    next(); // Continua el código
  });

  // Asignación de los routers para las diferentes rutas creadas:
  //  Usamos las rutas (el orden es importante más restrictivos a menos):
  app.use("/file-upload", fileUploadRouter);
  app.use("/public", express.static("public"));
  app.use("/publisher", publisherRouter); //  Le decimos al app que utilice el publisherRouter importado para gestionar las rutas que tengan "/publisher".
  app.use("/author", authorRouter); //  Le decimos al app que utilice el authorRouter importado para gestionar las rutas que tengan "/author".
  app.use("/book", bookRouter); //  Le decimos al app que utilice el bookRouter importado para gestionar las rutas que tengan "/book".
  app.use("/", routerHome); //  Decimos al app que utilice el routerHome en la raíz.

  // Ejemplo de Middleware de gestión de errores.
  app.use((err, req, res, next) => {
    console.log("*** INICIO DE ERROR ***");
    console.log(`Petición fallida de tipo ${req.method} a la url ${req.originalUrl}.`);
    console.log(err);
    console.log("*** FIN DE ERROR ***");

    if (err.name === "ValidationError") {
      res.status(400).json(err);
    } else {
      res.status(500).json(err);
    }
  });

  //  Levantamos el app en el puerto indicado:
  app.listen(PORT, () => {
    console.log(`Server levantado en puerto ${PORT}`);
  });
};

// --------------------------------------------------------------------------------------------

main(); //  Llamamos a la función de gestión de nuestra API.
