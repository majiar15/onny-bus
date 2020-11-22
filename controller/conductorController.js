const conductorModel = require('../model/conductor');
const bcrypt = require('bcrypt');
const conductor = require('../model/conductor');
exports.register = function(req, res) {
    if (req.body.cc && req.body.nombres && req.body.apellidos && req.body.email && req.body.password && req.body.confirmpassword) {
        if (req.body.password === req.body.confirmpassword) {
            let cc = req.body.cc,
                nombres = req.body.nombres,
                apellidos = req.body.apellidos,
                email = req.body.email,
                password = req.body.password;
            conductorModel.create({ cc, nombres, apellidos, email, password }, (err, newUser) => {
                if (err) {
                    res.render('./conductor/conductores', {error: 'ya hay alguien con la misma cedula'});
                } else {
                    res.redirect("/conductor");
                };
            });
        } else {
            res.render('./conductor/conductores', {error: 'las contraseñas no coinciden'});
        }

    } else {
        res.render('./conductor/conductores', {error: 'no se enviaron los parametros necesarios, los cuales son cc,nombre,apellidos,email.password,confirmpassword'});
    }

}

exports.modificar = function(req, res) {
    const { cc, nombre, apellidos, email, password } = req.body;
    conductorModel.updateOne({ 'cc': cc }, (err, conductor) => {
        if (!conductor) {
            res.render('./conductor/registroConductores', { message: "error al rende" });
        } else if (err) {
            res.render('./conductor/registroConductores', { message: "datos moficados correctamente" });
        } else {
            res.render('./conductor/registroConductores', { message: "datos moficados correctamente" });
        }
    });
}

exports.home = function (req,res) {
    conductorModel.find({},"_id cc nombres apellidos email",(err, conductores) =>{
        if(!conductor){
            res.render('./conductor/conductores');
        }else if(err){
            res.render('./conductor/conductores', { message: err });
        }else{
            res.render('./conductor/conductores', { conductores });
        }
    });
}