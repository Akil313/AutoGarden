const five = require('johnny-five');
const Raspi = require("raspi-io").RaspiIO;
const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT || 3000;

const app = express();
const server = app.listen(port, () => {
    console.log('A keen ear listens on port 3000');
});

//Static files
app.use(express.static('public'));

//Socket setup
let io = socket(server);

const board = new five.Board({
    io: new Raspi()
  });

board.on("ready", () => {
    const motor = new five.Motor({
        pins: {
            pwm: 'GPIO25',
            dir: 'GPIO24'
        }
    });

    io.on('connection', (socket) => {
        console.log('Socket connection made ... Welcome', socket.id);
    
        socket.on('status', (data) => {
            console.log("Motor On:", data.status);

            if(data.status == true){
                motor.start(255);
            }else{
                motor.stop();
            }

            io.sockets.emit('status', data);
        })
    });
});
