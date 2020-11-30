const asignarRutaModel = require('../model/asignarRuta');
const conductorModel = require('../model/conductor');
const rutaModel = require('../model/ruta');
const busModel = require('../model/bus');
const moment = require('moment');

exports.home = function (req, res) {
    
    let { num_page } = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page - 1) * 10;
    asignarRutaModel.countDocuments({ activo: true }).then(function (count) {
        num_pages = parseInt((count / 10) + 1);
    }).catch(function (err) {
        num_pages = 1;
    });

    asignarRutaModel.find({ activo: true })
        .skip(skip_page)
        .limit(10)
        .lean()
        .exec((err, asignarRuta) => {
            busModel.populate(asignarRuta, { path: 'bus' }, function () {
                conductorModel.populate(asignarRuta, { path: 'conductor' }, function () {
                    rutaModel.populate(asignarRuta,  { path: 'ruta' }, function (err, document) {
                        context = {
                            asignarRuta: document,
                            num_page: num_page,
                            num_pages: num_pages
                        }
                        if(document.length === 0){
                            res.render('./rutas/verRutasAsignadas', {error: "no hay rutas Asignadas", context, rol:req.session.userType});
                        }else if(err){

                            res.render('./rutas/verRutasAsignadas', { message: err , rol:req.session.userType});
                        }else{

                            res.render('./rutas/verRutasAsignadas', {context , rol:req.session.userType});
                        }
                    });
                })
            })


        });
}




exports.asignarGet = function (req, res) {
    // encontrar todos los conductores activos 
    findBusConductorAndRoute(req, res);
}
exports.asignar = function (req, res) {
    const { ruta, conductor, bus, fechaInicio, fechaFin } = req.body;

    if (ruta, conductor, bus, fechaInicio, fechaFin) {
        
        asignarRutaModel.create({ conductor, ruta, bus, fechaInicio, fechaFin, activo: true }, function (err, asignarRuta) {
            if (!asignarRuta) {
                findBusConductorAndRoute(req, res, false, "ya esta un bus asignardo a esa ruta durante esa fecha");
            } else if (err) {
                findBusConductorAndRoute(req, res, false, "no se pudo asignar la ruta");
            } else {
                findBusConductorAndRoute(req, res, "ruta asignada");
            }
        });

    } else {
        findBusConductorAndRoute(req, res, false, "no ha enviado los datos necesarios");
    }
}
exports.updateGet = function(req, res) {
    const id = req.params.id;
    let elegido = false;
    asignarRutaModel.find({activo: true}, function(err, asignarRuta){
        if (!asignarRuta) {
            res.render('./rutas/asignarRuta', { type:"update"});
            findBusConductorAndRoute(req, res, false,"no se puedo encontrar la ruta asignada a modificar", elegido, "update");
        } else if (err) {
            findBusConductorAndRoute(req, res, false,false, elegido, "update");
        } else {
            asignarRuta.forEach((AR)=>{
                if(AR._id == id){
                    
                    elegido = AR;
                }
            });
            findBusConductorAndRoute(req, res, false,false, elegido, "update");
        }
    });
}
exports.update = function(req, res) {
    const { id, ruta, conductor, bus, fechaInicio, fechaFin } = req.body;
    
    if (id, ruta, conductor, bus, fechaInicio, fechaFin) {
        asignarRutaModel.findOneAndUpdate({_id:id}, { ruta:ruta, conductor:conductor, bus:bus, fechaInicio:fechaInicio, fechaFin:fechaFin}, {new:true}, (err,asignarRuta)=>{
            if (!asignarRuta) {
                findBusConductorAndRoute(req,res, false, "ya esta un bus asignardo a esa ruta durante esa fecha", asignarRuta, "update");
            } else if (err) {
                findBusConductorAndRoute(req,res, false, "no se pudo asignar la ruta", asignarRuta, "update");
            } else {    
                findBusConductorAndRoute(req,res, "modificacion de ruta asignada correcta",false, asignarRuta, "update");
            }
        })
        
    } else {
        findBusConductorAndRoute(req,res, false, "no ha enviado los datos necesarios", asignarRuta, "update");
    }
}

exports.remove = function(req,res) {
    const id = req.params.id;
    if(id){
        asignarRutaModel.update({ _id: id },{activo : false},(err,bus)=>{
            if (!bus) {
                res.redirect('/ruta/asignar/page/1');
            } else if (err) {
                res.redirect('/ruta/asignar/page/1');
            } else {    
                res.redirect('/ruta/asignar/page/1');
            }
        })
    }
}


function findBusConductorAndRoute(req,res, message, error, elegido = false, type="registro") {
    let url;
    if(type == "registro"){
        url ="/ruta/asignar";
    }else{
        url ="/ruta/asignar/update";
    }
    conductorModel.find({ activo: true }, (err, conductores) => {
        if (conductores.length === 0) {
            res.render('./rutas/asignarRuta', { type,error: "no hay conductores registrados", url , rol:req.session.userType});

        } else if (err) {
            res.render('./rutas/asignarRuta', { type, error: "error al encontrar conductores" , url, rol:req.session.userType});
        } else {
            //encontrar todas las rutas activas
            rutaModel.find( (err, rutas) => {
                if (rutas.length == 0) {
                    res.render('./rutas/asignarRuta', { type, error: "no hay rutas registrados" , url, rol:req.session.userType});
                } else if (err) {
                    res.render('./rutas/asignarRuta', { type, error: "error al encontrar las rutas" , url, rol:req.session.userType});
                } else {
                    // encontrar todos los buses activos 
                    busModel.find({ activo: true }, (err, buses) => {
                        if (buses.length == 0) {
                            res.render('./rutas/asignarRuta', { type, error: "no hay buses registrados" , url, rol:req.session.userType});
                        } else if (err) {
                            res.render('./rutas/asignarRuta', { type, error: "error al encontrar los buses" , url, rol:req.session.userType});
                        } else {
                            if (message) {
                                res.render('./rutas/asignarRuta', {type, conductores, rutas, buses, message,elegido , url, rol:req.session.userType});
                            } else if (error) {
                                res.render('./rutas/asignarRuta', {type, conductores, rutas, buses, error,elegido , url, rol:req.session.userType});
                            } else {
                                res.render('./rutas/asignarRuta', {type, conductores, rutas, buses,elegido , url, rol:req.session.userType});
                            }
                        }
                    });
                }
            });
        }
    });
}