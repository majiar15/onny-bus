require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const notificacionesRouter = require('./router/api/notificacionesApi');
const webRouter = require('./router/web');
const conductorRouter = require('./router/api/conductorApi');
const SocketIO = require('socket.io');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongoDB = process.env.MONGO_URI;
//configuracion vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//configuracion de puerto
app.set('port', process.env.PORT || 3000);
// configuracion de base de datos
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', err => {
    console.log("conexion error ", err);
});
db.once('open', () => {
    console.log('conexion exitosa');
})

// function 
function vefifyLogin(req, res, next) {
    req.headers['x-access-token'];
    jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY, function(err, decoded) {
        if (err) {
            res.json({ status: 'error', message: err.message, data: null });
        } else {
            req.body.id = decoded._id;
            console.log('usuario logueado', decoded._id);
            next();
        }
    });
}
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

//rutas

app.use('/', webRouter);
app.use('/conductor', conductorRouter)
const server = app.listen(app.get('port'), function() {
    console.log('server corriendo');
});

//socket io


let io = SocketIO(server);
io.on('connect', (socket) => {
    console.log('hello2 ', socket.id);

});


app.use('/api/notificaciones', vefifyLogin, notificacionesRouter);


exports.io = io;