const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    tipo: { type: String },
    cantidad: { type: String },
    marca: { type: String },
    descripcion: { type: String },
    disponiblesTaller: { type: String },
    disponiblesAlmacen: { type: String },
    imagen:{ type: String },
    precioUnitario: { type: String }
});
const Refaccion = mongoose.model("Refaccion", userSchema);

module.exports = Refaccion