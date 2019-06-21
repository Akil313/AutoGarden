const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const moment = require('moment');

const port = process.env.PORT || 3000;

server.listen(port);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });

//Static files
//app.use(express.static('public'));

var now = moment().format();
console.log(now)

io.on('connection', (socket) => {
    console.log('Socket connection made ... Welcome', socket.id);
    
    socket.on('motorStatus', (data) => {
        console.log("Motor On: " + data);
        io.emit('updateMotorStatus', data);
    });
});