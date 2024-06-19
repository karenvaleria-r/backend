const mongoose = require("mongoose")

const dbConnection = async () => {

    try {
         // intenta hacer algo
         // esta conexión a la base de datos es asincrona   ------>>>>> se ejecuta en paralelo
    await mongoose.connect(process.env.URL_MONGO)
    console.log("Base de datos conectada")

    } catch (error) {
        // si no puedes, capturar el error
        console.log(error)
    }
}

module.exports = dbConnection