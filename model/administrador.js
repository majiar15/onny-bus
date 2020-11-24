const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
let administradorSchema = new Schema({
    cc: {
        type: Number,
        unique: true,
        trim:true
    },
    nombres: {
        type:Number,
        trim:true
    },
    apellidos: {
        type: String,
        trim:true    
    },
    email: {
        type: String,
        trim:true    
    },
    password: {
        type: String,
        trim:true    
    },
    rol: {
        type: String,
        trim:true    
    }
});
administradorSchema.pre('save', function(next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});


module.exports = mongoose.model('administrador', administradorSchema);