const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let NotificacionesSchema = new Schema({
    bus: String,
    fecha: String,
    hora: String,
    tipo: String,
    message: String,
    visto: Boolean

});

module.exports = mongoose.model('notificaciones', NotificacionesSchema);