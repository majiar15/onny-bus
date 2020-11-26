const conductorModel = require('../model/conductor');
const bcrypt = require('bcrypt');

exports.register = function(req, res) {
    if (req.body.cc && req.body.nombres && req.body.apellidos && req.body.email && req.body.password && req.body.confirmpassword) {
        if (req.body.password === req.body.confirmpassword) {
            let cc = req.body.cc,
                nombres = req.body.nombres,
                apellidos = req.body.apellidos,
                email = req.body.email,
                password = req.body.password;
                activo = true;
            conductorModel.create({ cc, nombres, apellidos, email, password, activo }, (err, newUser) => {
                if (err) {
                    res.render('./conductor/registroConductores', {error: 'ya hay alguien con la misma cedula', type: "registro"});
                } else {
                    res.render('./conductor/registroConductores', {message: 'conductor creado correctamente', type: "registro"});
                };
            });
        } else {
            res.render('./conductor/registroConductores', {error: 'las contraseñas no coincidenr', type: "registro"});
        }

    } else {
        res.render('./conductor/registroConductores', {error: 'no se enviaron los parametros necesarios,los cuales son cc,nombre,apellidos,email.password,confirmpassword', type: "registro"});
    }

}

exports.update = function(req, res) {
    const { id, cc, nombres, apellidos, email, password } = req.body;; 
    if(cc, id , nombres, apellidos, email, password){
        conductorModel.findOne({_id:id},(err, conductor)=>{
            if (!conductor) {
                res.render('./conductor/registroConductores', { type:"update"});
            } else if (err) {
                res.render('./conductor/registroConductores', { err , type: "update" });
            } else {    
                conductor.nombres = nombres;
                conductor.apellidos = apellidos;
                conductor.email = email;
            
                if(password != conductor.password){
                    conductor.password = password;
                }
                conductor.save();
                conductor.password = "password";
                res.render('./conductor/registroConductores', { conductor,message: "conductor modificado correctamente", type : "update" });
            }
    
        });
        
    }
    else{
        res.render('./conductor/registroConductores', { error: "no se enviaron los datos correctos", type : "update" });
    }
}
exports.updateGet = function(req,res) {
    const {id} = req.params;
    conductorModel.findOne({_id: id}, function(err, conductor){
        if (!conductor) {
            res.render('./conductor/registroConductores', { type:"update"});
        } else if (err) {
            res.render('./conductor/registroConductores', { err , type: "update" });
        } else {    
            res.render('./conductor/registroConductores', { conductor, type : "update" });
        }
    });
}
exports.home = function (req,res) {
    let {num_page} = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page-1)*10;
    conductorModel.countDocuments({activo: true}).then(function ( count ){
        num_pages = parseInt((count/10)+1);
    }).catch(function(err) {
        num_pages = 1;
    });

    conductorModel.find({ activo: true },"_id cc nombres apellidos email")
    .skip(skip_page)
    .limit(10)
    .lean()
    .exec((err, conductores) =>{
        contextConductor = {
            conductores : conductores,
            num_page: num_page,
            num_pages: num_pages
        }

        if(conductores.length === 0){
            res.render('./conductor/conductores', {error: "no hay conductores registrados", contextConductor} );
        }else if(err){
            
            res.render('./conductor/conductores', { message: err });
        }else{
            
            res.render('./conductor/conductores', contextConductor);
        }
    });
}
exports.remove = function(req,res) {
    const id = req.params.id;
    console.log(id);
    if(id){
        conductorModel.update({ _id: id },{activo : false},(err,conductor)=>{
            console.log(conductor);
            console.log(err);
            if (!conductor) {
                res.redirect('/conductor/page/1');
            } else if (err) {
                res.redirect('/conductor/page/1');
            } else {    
                res.redirect('/conductor/page/1');
            }
        })
    }
}