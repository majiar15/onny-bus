const asignarRutaModel = require('../model/asignarRuta');
const conductorModel = require('../model/conductor');
const rutaModel = require('../model/ruta');
const busModel = require('../model/bus');


exports.home = function(req,res) { 
    // encontrar todos los conductores activos 
    conductorModel.find({activo:true}, (err, conductores) =>{
        if(conductores.length === 0){
            res.render('./rutas/asignarRuta', {error: "no hay conductores registrados"});
        }else if(err){
            res.render('./rutas/asignarRuta', {error: "error al encontrar conductores"});
        }else{
            //encontrar todas las rutas activas
            rutaModel.find({activo: true}, (err, rutas) =>{
                if(rutas.length == 0){
                    res.render('./rutas/asignarRuta', {error: "no hay rutas registrados"});
                }else if(err){
                    res.render('./rutas/asignarRuta', {error: "error al encontrar las rutas"});
                }else{
                    // encontrar todos los buses activos 
                    busModel.find({activo: true}, (err, buses) =>{
                        if(buses.length == 0 ){
                            console.log("object");
                            res.render('./rutas/asignarRuta', {error: "no hay buses registrados"});
                        }else if(err){
                            res.render('./rutas/asignarRuta', {error: "error al encontrar los buses"});
                        }else{
                            res.render('./rutas/asignarRuta', {conductores, rutas, buses});
                        }
                    });
                }
            });
        }
    });
}
exports.asignar = function(req,res) {
    const {ruta, conductor, bus, fechaInicio, fechaFin} = req.body;
    console.log(ruta, conductor, bus, fechaInicio,fechaFin);
    if(ruta, conductor, bus, fechaInicio, fechaFin){
        res.send(":D")

    }else{
        res.send(":c")
    }
}