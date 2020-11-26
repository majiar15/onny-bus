const rutaModel = require('../model/ruta');

exports.register = function(req, res) {
    let {nombre, latitud, longitud} = req.body;
    
    if (nombre && latitud && longitud) {   
        latitud = latitud.trim();        
        longitud = longitud.trim();
        let coordenadas = verifyLatLong(latitud, longitud);

        if (!coordenadas.verifyLong){

            res.render('./rutas/registroRutas', {error: 'longitud mal formateada: long1,long2,long3', ruta: {nombre, latitud, longitud},  type: "registro"});

        }else if(!coordenadas.verifyLat){
        
            res.render('./rutas/registroRutas', {error: 'latitud mal formateada: lat1,lat2,lat3', ruta: {nombre, latitud, longitud},  type: "registro"});

        }else{

            rutaModel.create({nombre:nombre, latitud: coordenadas.latitud, longitud: coordenadas.latitud, activo: true}, (err, newRuta) => {
                    if (err) {
                        res.render('./rutas/registroRutas', {error: 'esa ruta ya esta registrada', ruta: {nombre, latitud, longitud},  type: "registro"});
                    } else {
                        res.render('./rutas/registroRutas', {message: 'ruta creada correctamente', ruta: newRuta,  type: "registro"});
                    };
                });
        }
    } else {
        res.render('./rutas/registroRutas', {error: 'no se enviaron los datos necesarios (nombre)', ruta: {nombre, latitud, longitud},  type: "registro"});
    }
}

exports.update = function(req, res) {
    let { nombre, latitud, longitud, id} = req.body;
    
    if(nombre && latitud && longitud && id){
        let coordenadas = verifyLatLong(latitud, longitud);

        if (!coordenadas.verifyLong){

            res.render('./rutas/registroRutas', {error: 'longitud mal formateada: long1,long2,long3', ruta: {nombre, latitud, longitud, id},  type: "registro"});

        }else if(!coordenadas.verifyLat){

            res.render('./rutas/registroRutas', {error: 'latitud mal formateada: lat1,lat2,lat3', ruta: {nombre, latitud, longitud,id},  type: "registro"});

        }else{

            rutaModel.findOne({_id: id},(err, ruta)=>{
                if (!ruta) {
                    res.render('./rutas/registroRutas', { errpr:"no se encontro la ruta", type:"update"});
                } else if (err) {
                    res.render('./rutas/registroRutas', { error:err , type: "update" });
                } else {     
                    let coordenadas = verifyLatLong(latitud, longitud);           
                    ruta.nombre = nombre;
                    ruta.latitud = coordenadas.latitud;
                    ruta.longitud = coordenadas.longitud;
                    ruta.save();
                    res.render('./rutas/registroRutas', { ruta,message: "ruta actualizada", type : "update" });
                }
        
            });
        }
    }
    else{
        res.render('./rutas/registroRutas', { error: "no se enviaron los datos correctos", type : "update" });
    }
}
exports.updateGet = function(req,res) {
    const {id} = req.params;
    rutaModel.findOne({_id: id}, function(err, ruta){
        if (!ruta) {
            res.render('./rutas/registroRutas', { type:"update"});
        } else if (err) {
            res.render('./rutas/registroRutas', { err , type: "update" });
        } else {    
            res.render('./rutas/registroRutas', { ruta, type : "update" });
        }
    });
}
exports.home = function (req,res) {
    let {num_page} = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page-1)*10;
    rutaModel.countDocuments({activo : true}).then(function ( count ){
        num_pages = parseInt((count/10)+1);
    });

    rutaModel.find({activo : true})
    .skip(skip_page)
    .limit(10)
    .lean()
    .exec((err, rutas) =>{
        
        if(rutas.length == 0){
            res.render('./rutas/rutas');
        }else if(err){
            
            res.render('./rutas/rutas', { message: err });
        }else{
            contextRuta = {
                rutas : rutas,
                num_page: num_page,
                num_pages: num_pages
            }
            res.render('./rutas/rutas', contextRuta);
        }
    });
}
exports.remove = function(req,res) {
    const id = req.params.id;
    if(id){
        rutaModel.update({ _id: id },{activo : false},(err,ruta)=>{
            if (!ruta) {
                res.redirect('/ruta/page/1');
            } else if (err) {
                res.redirect('/ruta/page/1');
            } else {    
                res.redirect('/ruta/page/1');
            }
        })
    }
}

function verifyLatLong(lat, long) {
    let latitud = lat.replace(/,/g,',');
    let longitud = long.replace(/,/g,',');
    let latitudArray, longitudArray;
    let response = {
        "verifyLat":true,
        "verifyLong": true,
        "latitud":0,
        "longitud": 0
    };
    try {
        latitudArray = JSON.parse("[" + latitud + "]");    
    } catch (error) {
        response.verifyLat = false;
    }
    try {
        longitudArray = JSON.parse("[" + longitud + "]");    
    } catch (error) {
        response.verifyLong = false;
    }
    response.latitud = latitudArray;
    response.longitud = longitudArray
    return response;
}
