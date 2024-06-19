const bcrypt = require("bcrypt");
const { User, Pyme, Coach } = require("../models/user.model");

// Controlador para crear un usuario
const crearUsuario = async (req, res) => {
  const { fullName, rut, region, email, password, gender, birthdate, avatar, userType, ...specificData } = req.body;

  // Validar que los campos no estén vacíos
  if (!fullName || !email || !password || !userType) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
      status: 400,
      error: true
    });
  }

  try {
    // Validación de email único
    const usuarioExistente = await User.findOne({ email: email });

    if (usuarioExistente) {
      return res.status(400).json({
        message: "El email ya está registrado",
        status: 400,
        error: true,
      });
    }

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    const passwordEncriptada = bcrypt.hashSync(password, salt);

    // Crear el usuario según el userType
    let usuarioCreado;
    if (userType === 'Pyme') {
      usuarioCreado = await Pyme.create({
        fullName,
        rut,
        region,
        email,
        password: passwordEncriptada,
        gender,
        birthdate,
        active: true,
        avatar,
        ...specificData // Campos específicos de Pyme
      });
    } else if (userType === 'Coach') {
      usuarioCreado = await Coach.create({
        fullName,
        rut,
        region,
        email,
        password: passwordEncriptada,
        gender,
        birthdate,
        active: true,
        avatar,
        ...specificData // Campos específicos de Coach
      });
    } else {
      return res.status(400).json({
        message: "Tipo de usuario inválido",
        status: 400,
        error: true,
      });
    }

    res.status(201).json({
      message: "Usuario creado con éxito",
      status: 201,
      error: false,
      data: {
        id: usuarioCreado._id,
        fullName: usuarioCreado.fullName,
        email: usuarioCreado.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al intentar crear el usuario",
      status: 500,
      error: true
    });
    console.log(error);
  }
};

module.exports = crearUsuario;
