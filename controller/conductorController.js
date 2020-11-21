const conductorModel = require('../model/conductor');
const bcrypt = require('bcrypt');
exports.register = function(req, res) {
    const { cc, password, nombres, apellidos, password, confirmpassword } = req.body;
    if (cc && nombres && apellidos && email && password && confirmpassword) {
        if (password === confirmpassword) {

            conductorModel.create({ cc, nombres, apellidos, email, password }, (err, newUser) => {

                if (err) {
                    res.render('./conductor/registroConductores', { message: "no se pudo registrar el conductor" });
                } else {
                    res.render('./conductor/registroConductores', { message: "conductor registrado correctamente" });
                };
            });
        } else {
            res.render('./conductor/registroConductores', { message: "las contraseñas no coinciden" });
        }

    } else {
        res.render('./conductor/registroConductores', { message: "no se enviaron los datos necesarios" });
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