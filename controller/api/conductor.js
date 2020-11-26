const conductorModel = require('../../model/conductor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = function(req, res) {
    const { cc, password } = req.body

    if (cc && password) {
        console.log(cc);

        conductorModel.findOne({ 'cc': cc }, (err, conductor) => {
            if (!conductor) {
                res.status(400).json({status: "login incorrecto", data: 'no se encontro el conductor con cc :'+cc});
            } else if (err) {
                res.status(400).json({status: "login incorrecto",  data: "error al encontrar el conductor con cc:"+cc});
            } else {
                console.log(conductor);
                if (bcrypt.compareSync(password, conductor.password)) {
                    const token = jwt.sign({ _id: conductor._id }, req.app.get('secretKey'), { expiresIn: "8h" });
                    res.status(200).json({ status: 'login correcto', data: { 'conductor': conductor, 'token': token } });

                } else {
                    res.status(400).json({status: "login incorrecto", data:"contraseña incorrecta"})
                }
            }
        })
    }
}
