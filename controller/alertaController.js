const alertaModel = require('../model/alerta');
const bcrypt = require('bcrypt');


exports.home = function (req,res) {
    let {num_page} = req.params;
    num_page = parseInt(num_page)
    skip_page = (num_page-1)*10;
    alertaModel.countDocuments().then(function ( count ){
        num_pages = parseInt((count/10)+1);
    }).catch(function(err) {
        num_pages = 1;
    });

    alertaModel.find({},"bus fecha hora tipo message")
    .skip(skip_page)
    .limit(10)
    .lean()
    .sort({_id: -1})
    .exec((err, alertas) =>{
        contextAlertas = {
            alertas : alertas,
            num_page: num_page,
            num_pages: num_pages
        }
        if(alertas.length === 0){
            res.render('./alertas/alertas', {error: "no hay alertas registrados", contextAlertas} );
        }else if(err){
            
            res.render('./alertas/alertas', { message: err });
        }else{
            
            res.render('./alertas/alertas', contextAlertas);
        }
    });
}