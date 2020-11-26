const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let  rutaSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        trim:true,
        required: "es requerido el nombre de la ruta"
    },
    latitud: {
        type: [Number],
        trim: true

    },
    longitud: {
        type: [Number],
        trim: true

    },
    activo: Boolean
    
});


module.exports = mongoose.model('ruta', rutaSchema);