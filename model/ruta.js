const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let  rutaSchema = new Schema({
    _id: {
        type: Number,
        unique:true,
        trim:true
    },
    nombre: {
        type: String,
        unique: true,
        trim:true,
        required: "es requerido el nombre de la ruta"
    },
    activo: Boolean
    
});


module.exports = mongoose.model('ruta', rutaSchema);