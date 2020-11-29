const conductorModel = require('../../model/conductor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = function(req, res) {
    const { cc, password } = req.body

    if (cc && password) {

        conductorModel.findOne({ 'cc': cc }, (err, conductor) => {
            if (!conductor) {
                res.status(400).json({status: "login incorrecto", data: 'no se encontro el conductor con cc :'+cc});
            } else if (err) {
                res.status(400).json({status: "login incorrecto",  data: "error al encontrar el conductor con cc:"+cc});
            } else {
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
exports.updateLatLong = function(req,res) {
    let id = req.body.id;
    let latitud = req.body.latitud;
    let longitud = req.body.longitud;
    if(id, latitud, longitud){
        conductorModel.findOneAndUpdate(id, {latitud:latitud, longitud:longitud}, {new:true}, (err, conductor)=>{
    
            if(!conductor){

                res.status(400).json({status: "peticion incorrecta", message: "no hay conductor con id: "+id});
            }
            else if(err){
                res.status(400).json({status: "peticion incorrecta", message: "error al realizar la actualizacion"+err});
            }else{
                res.status(200).json({status: "peticion correcta", message:"actualizacion de ubicacion correcta"});
            }
        });
    }else{
        res.status(400).json({status: "peticion incorrecta", message: "no se pasaron los parametros necesarios"});
    }
}
