let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let asignarRutaSchema = new Schema({
    conductor:{ type: mongoose.Schema.Types.ObjectId,ref:'conductor'},
    ruta : {type: mongoose.Schema.Types.ObjectId, ref: 'ruta'}, 
    bus : {type: mongoose.Schema.Types.ObjectId, ref: 'bus'}, 
    desde: Date,
    hasta: Date,
    
});

// reservaSchema.methods.diasDeReserva = function() {
//     return moment(this.hasta).diff(moment(this.desde),'days') +1;
// }

module.exports = mongoose.model('asignarRuta', asignarRutaSchema);