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
    if (req.body.cc && req.body.password) {
        conductorModel.find({ 'cc': req.body.cc }, (err, conductor) => {

            if (err) {
                res.status(200).send('no se encontro el conductor con cc ', cc);
            } else {
                // console.log(conductor[0].password);
                // console.log(req.body.password);
                // console.log();
                if (bcrypt.compareSync(req.body.password, conductor[0].password)) {
                    const token = jwt.sign({ _id: conductor[0]._id }, req.app.get('secretKey'), { expiresIn: "8h" });
                    res.status(200).json({ status: 'login correcto', data: { 'conductor': conductor[0], 'token': token } });

                } else {
                    res.status(200).send('login incorrecto')
                }


            }
        })
    }
}