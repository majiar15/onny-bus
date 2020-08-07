const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const notificacionesRouter = require('./router/api/notificacionesApi');
const webRouter = require('./router/web');
const SocketIO = require('socket.io');
//configuracion vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//configuracion de puerto
app.set('port', process.env.PORT || 3000);
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

//rutas

app.use('/', webRouter);

const server = app.listen(app.get('port'), function() {
    console.log('server corriendo');
});
//socket io


let io = SocketIO(server);
io.on('connect', (socket) => {
    console.log('hello2 ', socket.id);

});


app.use('/api/notificaciones', notificacionesRouter);


exports.io = io;