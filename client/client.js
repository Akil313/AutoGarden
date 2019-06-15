const socket = require('socket.io-client')("https://dry-spire-58310.herokuapp.com/");
const five = require('johnny-five');
const Raspi = require("raspi-io").RaspiIO;

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

    socket.on("connect", () => {
        console.log("Connected to server.");

        socket.on("updateMotorStatus", (state) => {
            console.log("The new state is: " + state);

            if(state == true){
                motor.start(255);
            }else{
                motor.stop();
            }

        });
    });
});