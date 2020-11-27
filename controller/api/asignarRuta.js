const rutaModel = require('../../model/ruta');
const conductorModel = require('../../model/conductor');
const asignarRutaModel= require('../../model/asignarRuta');
const busModel = require('../../model/bus');
const moment = require('moment');
exports.getConductorsByRoute = function(req,res) {
    const idRoute = req.params.id;
    let hoy = moment(new Date());
    let objetRequest = [];
    asignarRutaModel.find({ruta: idRoute, activo: true}, "_id conductor bus fechaInicio fechaFin",(err,document)=>{
        // seleccionando documentos que se encuentran dentro de la fecha 
        document.forEach((doc)=>{
            // console.log(moment(hoy).diff(doc.fechaFin,'d') + 1);
            let CountDaysfechaInicio = moment(doc.fechaInicio).diff(hoy, 'day')
            let CountDaysfechaFin = moment(doc.fechaFin).diff(hoy, 'day')
            
            if(CountDaysfechaInicio <= 0 && CountDaysfechaFin >= 0){
                objetRequest.push(doc);
            }
            
        });
        if(objetRequest.length != 0){
            busModel.populate(objetRequest, { select:"placa", path: 'bus' }, function () {
                conductorModel.populate(objetRequest, { select:"nombres apellidos latitud longitud",path: 'conductor' }, function (err, document) {
                        res.status(200).json({data:document})     
                });
            });
        }else{
            res.status(200).json({message:"hello"})

        }
    });
}
