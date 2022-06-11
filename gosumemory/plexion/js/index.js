/*
    osu! overlay
*/


// socket
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
// connect
socket.onopen = () => {
    console.log('Connected');
};
// on exit
socket.onclose = event => {
    console.log(`Closed connection: ${event}`);
    socket.send('Client closed!');
};
// on error
socket.onerror = error => {
    console.log(`Encountered error: ${error}`);
};


// grades
let grade = document.getElementById('grade');
function grade(text,colour) {
    grade.textContent = text;
    grade.style.colour = colour;
}


// main loop
socket.onmessage = event => {
    let data = JSON.parse(event.data);
}