const mongoose = require("mongoose");
const Post = require("../models/post.model");
const Coach = require("../models/user.coach.model");

// Controlador para agregar un comentario a un post
const agregarComentario = async (req, res) => {
  const { coachId, text } = req.body;
  const { postId } = req.params; // Extraer postId de los parámetros de la URL

  // Validar que los campos no estén vacíos
  if (!postId || !coachId || !text) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
      status: 400,
      error: true,
    });
  }

  try {
    // Verificar que el Coach exista
    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({
        message: "Coach no encontrado",
        status: 404,
        error: true,
      });
    }

    // Verificar que el Post exista
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post no encontrado",
        status: 404,
        error: true,
      });
    }

    // Agregar el comentario al post
     post.comments.push({
       coachId: new mongoose.Types.ObjectId(coachId),
       text,
     }); // Usar 'new' con ObjectId
     await post.save();


    res.status(201).json({
      message: "Comentario agregado con éxito",
      status: 201,
      error: false,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al intentar agregar el comentario",
      status: 500,
      error: true,
    });
    console.log(error);
  }
};

// Controlador para eliminar un comentario
const eliminarComentario = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post no encontrado",
        status: 404,
        error: true,
      });
    }

    const comentarioIndex = post.comments.findIndex(comment => comment._id.equals(commentId));
    if (comentarioIndex === -1) {
      return res.status(404).json({
        message: "Comentario no encontrado",
        status: 404,
        error: true,
      });
    }

    post.comments.splice(comentarioIndex, 1);
    await post.save();

    res.status(200).json({
      message: "Comentario eliminado con éxito",
      status: 200,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al intentar eliminar el comentario",
      status: 500,
      error: true,
    });
    console.log(error);
  }
};

module.exports = {
  agregarComentario,
  eliminarComentario,
};