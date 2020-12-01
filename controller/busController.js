const busModel = require('../model/bus');

exports.register = function(req, res) {
    let {placa , nSerie} = req.body;
    if (placa && nSerie) {      
        placa = placa.substring(0,3) + '-'+ placa.substring(3,6);
        let bus = busModel.createInstance(placa, nSerie);
        busModel.add(bus,(err, newBus) => {
            if (err) {
                console.log(err);
                res.render('./buses/registroBuses', {error: 'la placa debe tener 6 caracteres y el numero de serie 3 digitos', type: "registro", rol:req.session.userType});
            } else {
                res.render('./buses/registroBuses', {message: 'conductor creado correctamente', type: "registro", rol:req.session.userType});
            };
        });
        // busModel.create({ placa, nSerie, activo:true}, 
    } else {
        res.render('./buses/registroBuses', {error: 'no se enviaron los parametros necesarios(placa, numero de serie) o no son numeros ', type: "registro", rol:req.session.userType});
    }

}

exports.update = function(req, res) {
    let { placa, nSerie, id} = req.body; 
    if( placa && nSerie){
        busModel.findBusById(id, (err, bus)=>{
            if (!bus) {
                res.render('./buses/registroBuses', { type:"update", rol:req.session.userType});
            } else if (err) {
                res.render('./buses/registroBuses', { error:err , type: "update" , rol:req.session.userType});
            } else {    
               
                if(placa.length < 7){
                    placa = placa.substring(0,3) + '-'+ placa.substring(3,6);
                }
                bus.placa = placa;
                bus.nSerie = nSerie;
                
                bus.save();
                res.render('./buses/registroBuses', { bus,message: "guardado correcto", type : "update" , rol:req.session.userType});
            }
    
        });
        
    }
    else{
        res.render('./buses/registroBuses', { error: "no se enviaron los datos correctos", type : "update" , rol:req.session.userType});
    }
}
exports.updateGet = function(req,res) {
    const {id} = req.params;
    busModel.findBusById(id, function(err, bus){
        if (!bus) {
            res.render('./buses/registroBuses', { type:"update", rol:req.session.userType});
        } else if (err) {
            res.render('./buses/registroBuses', { err , type: "update" , rol:req.session.userType});
        } else {    
            res.render('./buses/registroBuses', { bus, type : "update" , rol:req.session.userType});
        }
    });
}
exports.home = function (req,res) {
    let {num_page} = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page-1)*10;
    busModel.countDocuments({activo: true}).then(function ( count ){
        num_pages = parseInt((count/10)+1);
    }).catch(function(err) {
        num_pages = 1;
    });

    busModel.find({ activo: true })
    .skip(skip_page)
    .limit(10)
    .lean()
    .exec((err, bus) =>{
        contextBus = {
            buses : bus,
            num_page: num_page,
            num_pages: num_pages
        }
        if(bus.length === 0){
            res.render('./buses/buses', {error: "no hay buses registrados", contextBus, rol:req.session.userType});
        }else if(err){
            
            res.render('./buses/buses', { message: err , rol:req.session.userType});
        }else{
            
            res.render('./buses/buses', {contextBus, rol:req.session.userType});
        }
    });
}
exports.remove = function(req,res) {
    const id = req.params.id;
    if(id){
        busModel.removeByID(id, (err,bus)=>{
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