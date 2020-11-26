let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let asignarRutaSchema = new Schema({
    conductor:{ type: mongoose.Schema.Types.ObjectId,ref:'conductor'},
    ruta : {type: mongoose.Schema.Types.ObjectId, ref: 'ruta'}, 
    bus : {type: mongoose.Schema.Types.ObjectId, ref: 'bus'}, 
    desde: Date,
    hasta: Date,
    
});
asignarRutaSchema.index({ruta:1,bus:1,desde:1,hasta:1},{ unique: true });
// reservaSchema.methods.diasDeReserva = function() {
//     return moment(this.hasta).diff(moment(this.desde),'days') +1;
// }

module.exports = mongoose.model('asignarRuta', asignarRutaSchema);