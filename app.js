
/**
 * Module dependencies.
 */

var config = {
  port: 80,
  ws: 8080
}


var express = require('express'),
    routes = require('./routes'),
    connect = require('connect'),
    http = require('http'),
    path = require('path'),
    io = require('socket.io').listen(8080);

var cookieParser = express.cookieParser('mapale'),
    sessionStore = new connect.middleware.session.MemoryStore();

var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
/*arepp.get('/login', routes.login.get);
app.post('/login', routes.login.post);
app.get('/register', routes.register.get);
app.post('/register', routes.register.post);*/

io.on('connection', function (socket) {
  //socket.emit('session', session);

  socket.on('login', function (data) {
    socket.get('user', function (err, user){
      if(user){
        socket.emit('err', 'You are already logged as: '+user);
      } else{
        // Check with db user
        socket.set('user', data.user, function (){
          io.sockets.emit('new', data.user);
          socket.emit('logged', 'Enjoy coolchat :P');
        });
      }
    });
  });

  socket.on('msg', function (msg){
    socket.get('user', function (err, name){
      io.sockets.emit(msg.to, {
          from: name,
          body: msg.body,
          date: Date.now()
      });
    })
  });

  socket.on('disconnect', function (a) {
      io.sockets.emit('disconnection', 'Someone ');
  });

});

app.listen(80);

var server = http.createServer(app);
