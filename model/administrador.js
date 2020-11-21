const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
let administradorSchema = new Schema({
    cc: {
        type: Number,
        unique: true
    },
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    rol: String
});
administradorSchema.pre('save', function(next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});


module.exports = mongoose.model('administrador', administradorSchema);