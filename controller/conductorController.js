const conductorModel = require('../model/conductor');
const bcrypt = require('bcrypt');
const conductor = require('../model/conductor');
exports.register = function(req, res) {
    if (req.body.cc && req.body.nombres && req.body.apellidos && req.body.email && req.body.password && req.body.confirmpassword) {
        if (req.body.password === req.body.confirmpassword) {
            let cc = req.body.cc,
                nombres = req.body.nombres,
                apellidos = req.body.apellidos,
                email = req.body.email,
                password = req.body.password;
            conductorModel.create({ cc, nombres, apellidos, email, password }, (err, newUser) => {
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

exports.modificar = function(req, res) {
    const { cc, nombres, apellidos, email, password } = req.body;
    conductorModel.findOneAndUpdate({ 'cc': cc },{nombres,apellidos,email,password}, (err, conductor) => {
        if (!conductor) {
            res.render('./conductor/registroConductores', { message: "error al rende", type:"update"});
        } else if (err) {
            res.render('./conductor/registroConductores', { err , type: "update" });
        } else {
            res.render('./conductor/registroConductores', { message: "datos moficados correctamente", type : "update" });
        }
    });
}

exports.home = function (req,res) {
    let {num_page} = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page-1)*10;
    conductorModel.countDocuments().then(function ( count ){
        num_pages = parseInt((count/10)+1);
    });

    conductorModel.find({},"_id cc nombres apellidos email")
    .skip(skip_page)
    .limit(10)
    .lean()
    .exec((err, conductores) =>{
        
        if(!conductor){
            res.render('./conductor/conductores');
        }else if(err){
            
            res.render('./conductor/conductores', { message: err });
        }else{
            context = {
                conductores : conductores,
                num_page: num_page,
                num_pages: num_pages
            }
            console.log(context);
            res.render('./conductor/conductores', context);
        }
    });
}