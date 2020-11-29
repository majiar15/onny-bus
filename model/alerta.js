const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let alertaSchema = new Schema({
    bus: String,
    fecha: String,
    hora: String,
    tipo: String,
    message: String,
    visto: Boolean

});

module.exports = mongoose.model('alerta', alertaSchema);