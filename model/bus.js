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
busSchema.statics.add = function(conductor,cb) {
    this.create(conductor,cb);
}
busSchema.statics.createInstance = function(placa,nSerie) {
    return new this({
        placa: placa,
        nSerie: nSerie,
        activo: true
    });
}
busSchema.statics.findBusById = function (id,cb) {
    return this.findOne({_id:id},cb);
}
busSchema.statics.removeByID = function(id,cb) {
    return this.updateOne({_id:id},{activo:false},cb);
}

module.exports = mongoose.model('bus', busSchema);