const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nombres: { type:String },
    apellidos: { type:String },
    cargo: { type:String },
    horaEntrada: { type:String },
    horaSalida: { type:String },
    operacion: { type:String },
    fecha: { type:String },
});
const Trabajador = mongoose.model("Trabajador", userSchema);

module.exports = Trabajador 