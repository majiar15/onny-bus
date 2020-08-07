let server = require('../../app');
exports.notificaciones_robo = function(req, res) {
    let bus = req.body.bus;
    let fecha = req.body.fecha;
    let message = `robo ${bus}`;
    let hora = req.body.hora;

    server.io.sockets.emit('notificacion-robo', { "bus": bus, "fecha": fecha, "alert": "robo", "hora": hora });

    res.status(200).json({
        "message": "notificacion enviara correctamente",
        "bus": bus,
        "fecha": fecha,
        "hora": hora
    });
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