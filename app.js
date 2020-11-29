require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const notificacionesRouter = require('./router/api/notificacionesApi');
const webRouter = require('./router/web');
const alertasRouter = require('./router/alertas');
const busRouter = require('./router/bus');
const rutaRouter = require('./router/ruta');
const conductorRouter = require('./router/conductor');
const conductorApiRouter = require('./router/api/conductorApi');
const rutasApiRouter = require('./router/api/rutasApi');
const SocketIO = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongoDB = process.env.MONGO_URI;
//configuracion vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//configuracion de puerto
app.set('port', process.env.PORT || 3000);
//secrest key jwt
app.set('secretKey', 'jwt_secret.15asASD');
// configuracion de base de datos
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', err => {
    console.log("conexion error ", err);
});
db.once('open', () => {
    console.log('conexion exitosa');
})

// function 
function vefifyLoginConductor(req, res, next) {
    jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            res.json({ status: 'error', message: err.message, data: null });
        } else {
            req.body.id = decoded._id;
            console.log('conductor logueado', decoded._id);
            next();
        }
    });
}

function redirectLogin(req, res, next) {
    console.log(req.session);

    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
}



//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET_KEY,
    cookie: {
        maxAge: 1000 * 60 * 60 * 8,
        sameSite: true,
    },
}));

//rutas

//web
// midleware vefifyLoginConductor
app.use('/', webRouter);
app.use('/alertas', alertasRouter);
app.use('/conductor',  conductorRouter);
app.use('/bus',  busRouter);
app.use('/ruta',  rutaRouter);



//api
// midleware vefifyLoginConductor
app.use('/api/conductor', conductorApiRouter);
app.use('/api/rutas', rutasApiRouter)
app.use('/api/notificaciones',  notificacionesRouter);

//levartar server
const server = app.listen(app.get('port'), function() {
    console.log('server corriendo');
});

//socket io


let io = SocketIO(server);

exports.io = io;