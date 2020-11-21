const administradorModel = require('../model/administrador');
const bcrypt = require('bcrypt');
exports.register = function(req, res) {
    const { cc, password, nombres, apellidos, email, confirmpassword } = req.body
    if (cc && nombres && apellidos && email && password && confirmpassword) {
        if (password === confirmpassword) {
            let rol = 'empleado';
            administradorModel.create({ cc, nombres, apellidos, email, password, rol }, (err) => {
                if (err) {
                    res.render('/administrador/register', { error: "error al guardar el administrador" })
                } else {
                    res.render('/administrador/register', { message: "administrador creado correctamente" });
                };
            });
        } else {
            res.render('/administrador/register', { error: "las contraseñas no coinciden" });
        }

    } else {
        res.render('/administrador/register', { error: "error al guardar el administrador" })
    }

}

exports.login = function(req, res) {
    const { cc, password } = req.body;

    if (cc && password) {
        administradorModel.findOne({ 'cc': cc }, (err, administrador) => {
            if (!administrador) {
                res.render('login', { error: 'login incorrecto' });
            } else if (err) {
                res.render('login', { error: 'login incorrecto' });
            } else {
                if (bcrypt.compareSync(password, administrador.password)) {
                    req.session.userId = administrador.cc;

                    res.render('index', { administrador })
                } else {
                    res.render('login', { error: 'login incorrecto' });
                }
            }
        });
    }
}
exports.logout = function(req, res) {
    req.session.destroy(() => {
        console.log("object");
    });
    console.log(req.session);

    res.redirect('/login');
}