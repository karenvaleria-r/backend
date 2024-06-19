const bcrypt = require("bcrypt");
const Pyme = require("../models/user.pyme.model");
const Coach = require("../models/user.coach.model");

// Controlador para crear un usuario (Pyme o Coach)
const crearUsuario = async (req, res) => {
  const { userType, fullName, rut, region, email, password, gender, birthdate, avatar, nameCompany, improvement, descriptionPyme, specialization, experience, certification, formation, disponibility, descriptionCoach } = req.body;

  // Validar que los campos no estén vacíos
  if (!fullName || !rut || !region || !email || !password || !gender || !birthdate) {
    return res.status(400).json({
      message: "Todos los campos son obligatorios",
      status: 400,
      error: true,
    });
  }

  try {
    // Validación de email único
    let usuarioExistente;
    if (userType === 'pyme') {
      usuarioExistente = await Pyme.findOne({ email });
    } else if (userType === 'coach') {
      usuarioExistente = await Coach.findOne({ email });
    } else {
      return res.status(400).json({
        message: "Tipo de usuario inválido",
        status: 400,
        error: true,
      });
    }

    if (usuarioExistente) {
      return res.status(400).json({
        message: "El email ya está registrado",
        status: 400,
        error: true,
      });
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    const passwordEncriptada = bcrypt.hashSync(password, salt);

    let usuarioCreado;
    if (userType === 'pyme') {
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
        nameCompany,
        improvement,
        descriptionPyme,
      });
    } else if (userType === 'coach') {
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
        specialization,
        experience,
        certification,
        formation,
        disponibility,
        descriptionCoach,
      });
    }

    res.status(201).json({
      message: "Usuario creado con éxito",
      status: 201,
      error: false,
      data: {
        id: usuarioCreado._id,
        fullName: usuarioCreado.fullName,
        email: usuarioCreado.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor al intentar crear el usuario",
      status: 500,
      error: true,
    });
    console.log(error);
  }
};

module.exports = crearUsuario;
