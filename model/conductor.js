const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
let conductorSchema = new Schema({
    cc: {
        type: Number,
        unique: true
    },
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    activo: Boolean,
    latitud: Number,
    longitud: Number
});
conductorSchema.pre('save', function(next) {
    if (this.isModified("password")) {
    
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

conductorSchema.statics.add = function(conductor,cb) {
    this.create(conductor,cb);
}
conductorSchema.statics.createInstance = function(cc, nombres, apellidos, email, password, activo, latitud, longitud ) {
    return new this({
        cc: cc,
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        password: password,
        activo, activo,
        latitud: latitud,
        longitud:longitud
    });
}
conductorSchema.statics.findConductorById = function (id,cb) {
    return this.findOne({_id:id},cb);
}
conductorSchema.statics.removeByID = function(id,cb) {
    return this.updateOne({_id:id},{activo:false},cb);
}
module.exports = mongoose.model('conductor', conductorSchema);