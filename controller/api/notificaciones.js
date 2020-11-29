let server = require('../../app');
const alertaModel = require('../../model/alerta');
exports.notificaciones_robo = function(req, res) {
    let bus = req.body.bus;
    let fecha = req.body.fecha;
    let message = `robo ${bus}`;
    let hora = req.body.hora;
    console.log(req.body.id);
    if(bus && fecha && message && hora){
        alertaModel.create({bus,fecha,hora,tipo:"robo",message, visto: false}, (err, alerta) =>{
            if(!alerta){
                res.status(400).json({status:"peticion incorrecta", message:"no se pudo registrar la notificacion"});
            }else if (err){
                res.status(400).json({status:"peticion incorrecta", message:"error al registrar la notificaion: "+ err});
            }else{
                server.io.sockets.emit('notificacion-robo', { "id":alerta._id ,"bus": bus, "fecha": fecha, "alert": "robo", "hora": hora });
                res.status(200).json({
                    status: "notificacion enviada correctamente",
                    bus: bus,
                    fecha: fecha,
                    hora: hora
                });
            }
        });
        
    }else{
        res.status(400).json({
            status:"peticion incorrecta",
            message:"no se enviaron los parametros correstos los cuales son placa de bus, fecha, conductor"
        })
    }
}


exports.notificaciones_trancon = function(req, res) {
    let bus = req.body.bus;
    let fecha = req.body.fecha;
    let message = req.body.message;
    let hora = req.body.hora;

    if(bus && fecha && message && hora){
        alertaModel.create({bus,fecha,hora,tipo:"retrazo",message, visto: false}, (err, alerta) =>{
            if(!alerta){
                res.status(400).json({status:"peticion incorrecta", message:"no se pudo registrar la notificacion"});
            }else if (err){
                res.status(400).json({status:"peticion incorrecta", message:"error al registrar la notificaion: "+ err});
            }else{
                server.io.sockets.emit('notificacion-retrazo', { "id":alerta._id ,"bus": bus,"message":message, "fecha": fecha, "alert": "retrazo", "hora": hora });
                res.status(200).json({
                    status: "notificacion enviada correctamente",
                    bus: bus,
                    fecha: fecha,
                    hora: hora
                });
            }
        });
        
    }else{
        res.status(400).json({
            status:"peticion incorrecta",
            message:"no se enviaron los parametros correstos los cuales son placa de bus, fecha"
        });
    }

}

exports.visto = function(req,res) {
    const {id, visto} = req.body;
    
    
    if( id && visto){
        alertaModel.update({_id:id},{visto:visto},(err,alertUpdate) => {
            if (!alertUpdate) {
                res.status(400).json({status:"fail"});
            } else if(err){
                res.status(400).json({status:"fail"});
            }else{
                res.status(200).json({status:"oks"});
            }
        });
    }else{
        res.status(400).json({status:"fail"});
    }
}