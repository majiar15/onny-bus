const rutaModel = require('../../model/ruta');


exports.getAll = function(req, res) {
    
        rutaModel.find({activo: true},"nombre _id", (err, rutas) => {
            if (rutas.length == 0) {
                res.status(400).json({status: "peticion incorrecta", message: "no se encontraron rutas"});
            } else if (err) {
                res.status(400).json({status: "peticion incorrecta", message: "error al encontrar las rutas: "+err});
            } else {
                res.status(200).json({status: "peticcion correcta", data: rutas, message:"rutas encontradas correctamente"});
            }
        });
}
exports.getOne = function(req,res) {
    const id = req.params.id;
    rutaModel.findOne( {_id: id, activo: true}, (err, ruta) =>{
        if (!ruta) {
            res.status(400).json({status:"peticion incorrecta", message:"no se encontro la ruta con id :"+id});
        } else if (err) {
            res.status(400).json({status:"peticion incorrecta", message:"error al enviar la peticion :"+err});
        } else {
            res.status(200).json({status: "peticcion correcta", data: ruta, message:"ruta encontrada correctamente"});         
        }  
    });
}