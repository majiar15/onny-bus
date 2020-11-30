const conductorModel = require('../../model/conductor');
const asignarRutaModel= require('../../model/asignarRuta');
const rutaModel= require('../../model/ruta');
const busModel= require('../../model/bus');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.login = function(req, res) {
    const { cc, password } = req.body

    if (cc && password) {

        conductorModel.findOne({ 'cc': cc, activo:true }, (err, conductor) => {
            if (!conductor) {
                res.status(400).json({status: "login incorrecto", data: 'no se encontro el conductor con cc :'+cc});
            } else if (err) {
                res.status(400).json({status: "login incorrecto",  data: "error al encontrar el conductor con cc:"+cc});
            } else {
                if (bcrypt.compareSync(password, conductor.password)) {
                    const token = jwt.sign({ _id: conductor._id }, req.app.get('secretKey'), { expiresIn: "8h" });
                    
                    asignarRutaModel.find({conductor: conductor._id, activo: true}, "conductor bus ruta", (err, document)=>{
                        let objetRequest = [];
                        
                        if(document){

            
                            document.forEach((doc)=>{
                    
                                let CountDaysfechaInicio = moment(doc.fechaInicio).diff(moment(new Date()), 'day')
                                let CountDaysfechaFin = moment(doc.fechaFin).diff(moment(new Date()), 'day')
                                if(CountDaysfechaInicio <= 0 && CountDaysfechaFin >= 0){
                                    objetRequest.push(doc);
                                }
                                
                            });
                        }
                        if(objetRequest.length != 0){               
                            
                            busModel.populate(objetRequest, { select:"placa",path: 'bus'} , function(err, document) {
                                conductorModel.populate(document, {path:"conductor"}, (err, doc)=>{
                                    rutaModel.populate(doc, {path:"ruta"}, (err, doc)=>{
                                        console.log(doc);
                                        res.status(200).json({ status: 'login correcto', data: { 'conductor': conductor,bus:doc[0].bus.placa,ruta:doc[0].ruta.nombre, 'token': token } });
                                    });
                                });
                            });
                        }else{
                            
                            res.status(200).json({ status: 'login correcto', data: { 'conductor': conductor, 'token': token } });
                        }
                    });

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
