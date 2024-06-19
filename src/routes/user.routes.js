const express = require("express");

const crearUsuario = require("../controllers/user.controller");



const router = express.Router();

// ruta para crear un usuario --- POST  
router.post("/crear-usuario", crearUsuario );  // router escucha la petición post en la ruta /crear-usuario y ejecuta la función crearUsuario

module.exports = router;