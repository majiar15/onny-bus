const busModel = require('../model/bus');

exports.register = function(req, res) {
    let {placa , nSerie} = req.body;
    if (placa && nSerie) {      
        placa = placa.substring(0,3) + '-'+ placa.substring(3,6);
        busModel.create({ placa, nSerie, activo:true}, (err, newBus) => {
                if (err) {
                    console.log(err);
                    res.render('./buses/registroBuses', {error: 'la placa debe tener 6 caracteres y el numero de serie 3 digitos', type: "registro"});
                } else {
                    res.render('./buses/registroBuses', {message: 'conductor creado correctamente', type: "registro"});
                };
            });
    } else {
        res.render('./buses/registroBuses', {error: 'no se enviaron los parametros necesarios(placa, numero de serie) o no son numeros ', type: "registro"});
    }

}

exports.update = function(req, res) {
    let { placa, nSerie, id} = req.body; 
    if( placa && nSerie){
        busModel.findOne({_id: id},(err, bus)=>{
            if (!bus) {
                res.render('./buses/registroBuses', { type:"update"});
            } else if (err) {
                res.render('./buses/registroBuses', { error:err , type: "update" });
            } else {    
               
                if(placa.length < 7){
                    placa = placa.substring(0,3) + '-'+ placa.substring(3,6);
                }
                bus.placa = placa;
                bus.nSerie = nSerie;
                
                bus.save();
                res.render('./buses/registroBuses', { bus,message: "guardado correcto", type : "update" });
            }
    
        });
        
    }
    else{
        res.render('./buses/registroBuses', { error: "no se enviaron los datos correctos", type : "update" });
    }
}
exports.updateGet = function(req,res) {
    const {id} = req.params;
    busModel.findOne({_id: id}, function(err, bus){
        if (!bus) {
            res.render('./buses/registroBuses', { type:"update"});
        } else if (err) {
            res.render('./buses/registroBuses', { err , type: "update" });
        } else {    
            res.render('./buses/registroBuses', { bus, type : "update" });
        }
    });
}
exports.home = function (req,res) {
    let {num_page} = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page-1)*10;
    busModel.countDocuments({activo: true}).then(function ( count ){
        num_pages = parseInt((count/10)+1);
    });

    busModel.find({ activo: true })
    .skip(skip_page)
    .limit(10)
    .lean()
    .exec((err, bus) =>{
        
        if(!bus){
            res.render('./buses/buses');
        }else if(err){
            
            res.render('./buses/buses', { message: err });
        }else{
            context = {
                buses : bus,
                num_page: num_page,
                num_pages: num_pages
            }
            res.render('./buses/buses', context);
        }
    });
}
exports.remove = function(req,res) {
    const id = req.params.id;
    if(id){
        busModel.update({ _id: id },{activo : false},(err,bus)=>{
            if (!bus) {
                res.redirect('/bus/page/1');
            } else if (err) {
                res.redirect('/bus/page/1');
            } else {    
                res.redirect('/bus/page/1');
            }
        })
    }
}