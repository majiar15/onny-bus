const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let  busSchema = new Schema({
    placa: {
        type: String,
        unique: true,
        maxlength: 7,
        minlength:7,
        trim:true
    },
    nSerie: {
        type: Number,
        maxlength:3,
        minlength:3,
        trim:true

    },
    activo: Boolean
    
});


module.exports = mongoose.model('bus', busSchema);