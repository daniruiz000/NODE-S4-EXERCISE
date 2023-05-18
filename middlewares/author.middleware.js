const { Author } = require("../models/Author");

const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw new Error({ error: "No tienes autorización para realizar esta operación" });
    }

    // Descodificamos el token
    const decodedInfo = verifyToken(token);

    const author = await Author.findOne({ email: decodedInfo.authorEmail }).select("+password");
    if (!author) {
      throw new Error({ error: "No tienes autorización para realizar esta operación" });
    }

    req.author = author;
    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = { isAuth };
