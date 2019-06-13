// Make connection
let socket = io.connect('http://localhost:3000');

let btn = document.getElementById('change');
let status = document.getElementById('status');
let isOn = false;

// Emit event

btn.addEventListener('click', () => {
    socket.emit('status', {
        status: !isOn
    });
});

// Listen for events
socket.on('status', (data) => {
    isOn = data.status;
    status.innerHTML = '<p>' + isOn + '</p>';
});