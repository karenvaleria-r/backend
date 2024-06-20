const Post = require("../models/post.model");
const Pyme = require("../models/user.pyme.model");

// Controlador para crear un post
const crearPost = async (req, res) => {
  const { title, content, pymeId } = req.body;

  // Validar que los campos no estén vacíos
  if (!title || !content || !pymeId) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
      status: 400,
      error: true,
    });
  }

  try {
    // Verificar que la Pyme exista
    const pyme = await Pyme.findById(pymeId);
    if (!pyme) {
      return res.status(404).json({
        message: "Pyme no encontrada",
        status: 404,
        error: true,
      });
    }

    // Crear el post
    const nuevoPost = new Post({
      title,
      content,
      pymeId
    });

    const postCreado = await nuevoPost.save();

    res.status(201).json({
      message: "Post creado con éxito",
      status: 201,
      error: false,
      data: postCreado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al intentar crear el post",
      status: 500,
      error: true,
    });
    console.log(error);
  }
};

module.exports = crearPost;
