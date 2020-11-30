const conductorModel = require('../../model/conductor');
const asignarRutaModel= require('../../model/asignarRuta');
const busModel = require('../../model/bus');
const moment = require('moment');
exports.getConductorsByRoute = function(req,res) {
    const idRoute = req.params.id;
    let hoy = moment(new Date());
    let objetRequest = [];
    if(idRoute ){
        asignarRutaModel.find({ruta: idRoute, activo: true}, "conductor",(err,document)=>{
            // seleccionando documentos que se encuentran dentro de la fecha
            console.log(err);
            if(err){
                res.status(400).json({status: "peticion incorrecta", message:"error al realizar la peticion : "+err})            
            }else if(document.length == 0){
                res.status(400).json({status: "peticion incorrecta", message:"no se encontraron asignamiento de rutas al id: "+idRoute})
            }else{
                document.forEach((doc)=>{
                    
                    let CountDaysfechaInicio = moment(doc.fechaInicio).diff(hoy, 'day')
                    let CountDaysfechaFin = moment(doc.fechaFin).diff(hoy, 'day')
                    if(CountDaysfechaInicio <= 0 && CountDaysfechaFin >= 0){
                        objetRequest.push(doc);
                    }
                    
                });
                if(objetRequest.length != 0){               
                        conductorModel.populate(objetRequest, { select:"latitud longitud",path: 'conductor' }, function (err, document) {
                            res.status(200).json({status: "peticion correcta", data:document});
                        });
                }else{
                    res.status(400).json({status: "peticion incorrecta", message:"no hay conductores asignados en esta ruta"});
                }
            } 
        });
    }else{
        res.status(400).json({message:"no se envio el id del conductor como parametro o no es de tipo numerico"})
    }
}
