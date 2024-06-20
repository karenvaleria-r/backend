const express = require("express");
const { crearPost, editarPost } = require("../controllers/post.controller");
const { agregarComentario } = require("../controllers/comment.controller");

const router = express.Router();

// Ruta para crear un post --- POST
router.post("/posts", crearPost);

// Ruta para agregar un comentario a un post --- POST
router.post("/posts/:postId/comments", agregarComentario);

// Ruta para editar un post --PUT
router.put('/posts/:postId', editarPost);

module.exports = router;
