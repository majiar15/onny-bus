const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
let administradorSchema = new Schema({
    cc: {
        type: Number,
        unique: true,
        trim: true
    },
    nombres: {
        type: String,
        trim: true
    },
    apellidos: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    rol: {
        type: String,
        trim: true
    },
    activo: Boolean
});
administradorSchema.pre('save', function (next) {

    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();

});
administradorSchema.statics.add = function (conductor, cb) {
    this.create(conductor, cb);
}
administradorSchema.statics.createInstance = function (cc, nombres, apellidos, email, password, activo) {
    return new this({
        cc: cc,
        nombres: nombres,
        apellidos: apellidos,
        email: email,
        password: password,
        rol:'empleado',
        activo, activo
    });
}
administradorSchema.statics.findAdministradorById = function (id, cb) {
    return this.findOne({ _id: id }, cb);
}
administradorSchema.statics.removeByID = function (id, cb) {
    return this.updateOne({ _id: id }, { activo: false }, cb);
}



module.exports = mongoose.model('administrador', administradorSchema);