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

module.exports = mongoose.model('conductor', conductorSchema);