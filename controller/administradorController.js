const administradorModel = require('../model/administrador');
const bcrypt = require('bcrypt');
exports.register = function(req, res) {
    const { cc, password, nombres, apellidos, email, confirmpassword } = req.body
    if (cc && nombres && apellidos && email && password && confirmpassword) {
        if (password === confirmpassword) {
            let rol = 'empleado';
            administradorModel.create({ cc, nombres, apellidos, email, password, rol, activo: true }, (err) => {
                if (err) {
                    console.log(err);

                    res.render('./administrador/registerAdministrador', { error: "error al guardar el administrador",  type:"registro" })
                } else {
                    res.render('./administrador/registerAdministrador', { message: "administrador creado correctamente" ,type:"registro"});
                };
            });
        } else {
            res.render('./administrador/registerAdministrador', { error: "las contraseñas no coinciden" , type:"registro"});
        }

    } else {
        res.render('./administrador/registerAdministrador', { error: "error al guardar el administrador",type:"registro" })
    }

}

exports.login = function(req, res) {
    const { cc, password } = req.body;

    if (cc && password) {
        administradorModel.findOne({ 'cc': cc }, (err, administrador) => {
            if (!administrador) {
                res.render('login', { error: 'login incorrecto' });
            } else if (err) {
                res.render('login', { error: 'login incorrecto' });
            } else {
                if (bcrypt.compareSync(password, administrador.password)) {
                    req.session.userId = administrador.cc;
                    req.session.userType = administrador.rol
                    res.redirect('/')
                } else {
                    res.render('login', { error: 'login incorrecto' });
                }
            }
        });
    }
}
exports.logout = function(req, res) {
    req.session.destroy(() => {
        console.log("object");
    });
    console.log(req.session);

    res.redirect('/login');
}

exports.home = function (req,res) {
    let {num_page} = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page-1)*10;
    administradorModel.countDocuments({activo: true}).then(function ( count ){
        num_pages = parseInt((count/10)+1);
    }).catch(function(err) {
        num_pages = 1;
    });

    administradorModel.find({ activo: true },"_id cc nombres apellidos email")
    .skip(skip_page)
    .limit(10)
    .lean()
    .exec((err, administrador) =>{
        contextadministrador = {
            administradores : administrador,
            num_page: num_page,
            num_pages: num_pages
        }
        console.log(contextadministrador);
        if(administrador.length === 0){
            res.render('./administrador/administradores', {error: "no hay administradores registrados", contextadministrador, rol: req.session.userType} );
        }else if(err){
            
            res.render('./administrador/administradores', { message: err , rol: req.session.userType});
        }else{
            
            res.render('./administrador/administradores', {contextadministrador, rol: req.session.userType});
        }
    });
}
exports.updateGet = function(req,res){
    const {id} = req.params;
    administradorModel.findOne({_id: id}, function(err, administrador){
        if (!administrador) {
            res.render('./administrador/registerAdministrador', { type:"update", rol:req.session.userType});
        } else if (err) {
            res.render('./administrador/registerAdministrador', { err , type: "update" , rol:req.session.userType});
        } else {    
            res.render('./administrador/registerAdministrador', { administrador, type : "update" , rol:req.session.userType});
        }
    });
}
exports.update = function(req,res) {
    const { id, cc, nombres, apellidos, email, password } = req.body;
    if(cc, id , nombres, apellidos, email, password){
        administradorModel.findOne({_id:id},"_id nombres apellidos email password",(err, administrador)=>{
            if (!administrador) {
                res.render('./administrador/registerAdministrador', { type:"update", rol:req.session.userType});
            } else if (err) {
                res.render('./administrador/registerAdministrador', { err , type: "update" , rol:req.session.userType});
            } else {    
                administrador.nombres = nombres;
                administrador.apellidos = apellidos;
                administrador.email = email;
                
                if(password != administrador.password){
                    administrador.password = password;
                }
                console.log(administrador);
                 administrador.save();
                
                
                res.render('./administrador/registerAdministrador', { administrador, message: "administrador modificado correctamente", type : "update" , rol:req.session.userType});
            }
    
        });
        
    }
    else{
        res.render('./conductor/registroConductores', { error: "no se enviaron los datos correctos", type : "update" });
    }
}

exports.remove = function(req,res) {
    const id = req.params.id;
    console.log(id);
    if(id){
        administradorModel.update({ _id: id },{activo : false},(err,administrador)=>{
     
            if (!administrador) {
                res.redirect('/administrador/page/1');
            } else if (err) {
                res.redirect('/administrador/page/1');
            } else {    
                res.redirect('/administrador/page/1');
            }
        })
    }
}