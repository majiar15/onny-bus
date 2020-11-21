const conductorModel = require('../../model/conductor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
                    res.status(400).send('error al guardar conductor')
                } else {
                    res.status(200).send('conductor creado correctamente' + newUser);
                };
            });
        } else {
            res.status(200).send('las contraseñas no coinciden')
        }

    } else {
        res.status(200).send('no se enviaron los parametros necesarios, los cuales son cc,nombre,apellidos,email.password,confirmpassword')
    }

}

exports.login = function(req, res) {
    const { cc, password } = req.body

    if (cc && password) {
        console.log(cc);

        conductorModel.findOne({ 'cc': cc }, (err, conductor) => {
            if (!conductor) {
                res.status(400).send("login incorrecto");
            } else if (err) {
                res.status(200).send('no se encontro el conductor con cc ', cc);
            } else {
                console.log(conductor);
                if (bcrypt.compareSync(password, conductor.password)) {
                    const token = jwt.sign({ _id: conductor._id }, req.app.get('secretKey'), { expiresIn: "8h" });
                    res.status(200).json({ status: 'login correcto', data: { 'conductor': conductor, 'token': token } });

                } else {
                    res.status(200).send('login incorrecto')
                }
            }
        })
    }
}