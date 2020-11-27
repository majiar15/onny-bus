let server = require('../../app');
exports.notificaciones_robo = function(req, res) {
    let bus = req.body.bus;
    let fecha = req.body.fecha;
    let message = `robo ${bus}`;
    let hora = req.body.hora;
    console.log(req.body.id);
    if(bus && fecha && message && hora){
        server.io.sockets.emit('notificacion-robo', { "bus": bus, "fecha": fecha, "alert": "robo", "hora": hora });
        res.status(200).json({
            status: "notificacion enviada correctamente",
            bus: bus,
            fecha: fecha,
            hora: hora
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

    server.io.sockets.emit('notificacion-retrazo', { "bus": bus, "fecha": fecha, "alert": "retrazo", "message": message, "hora": hora });

    res.status(200).json({
        "message": "notificacion enviara correctamente",
        "bus": bus,
        "fecha": fecha,
        "hora": hora
    });
}