const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    inventario:{ type: String, required: true },
    vehiculo: { type: String},
    descripcion: {type: String},
    chofer: { type: String },
    fechaSalida: { type: String},
    fechaLlegada: { type: String},
    observaciones: { type: String }
});
const Vehiculo = mongoose.model("Vehiculo", userSchema);

module.exports = Vehiculo   