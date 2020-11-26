const rutaModel = require('../../model/ruta');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getAll = function(req, res) {
    
        rutaModel.find({activo: true},"nombre _id", (err, rutas) => {
            if (rutas.length == 0) {
                res.status(400).send("no se encontraron rutas");
            } else if (err) {
                res.status(200).send('error al enviar las rutas ');
            } else {
                res.status(200).json(rutas)
                
            }
        });
}
exports.getOne = function(req,res) {
    const id = req.params.id;
    rutaModel.findOne( {_id: id, activo: true}, (err, ruta) =>{
        if (!ruta) {
            res.status(400).send("no se encontraron ruta");
        } else if (err) {
            res.status(200).send('error al enviar las ruta ');
        } else {
            res.status(200).json(ruta)
            
        }  
    });
}