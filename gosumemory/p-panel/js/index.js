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
//let grade = document.getElementById('grade');
function grade(text,colour) {
    grade.textContent = text;
    grade.style.colour = colour;
}


// main loop
let img_primary;
let colour;
let image;
socket.onmessage = event => {
    let data = JSON.parse(event.data);

    
    // backgrounds
    if (img_primary != data.menu.bm.path.full) {
        img_primary = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25');
        document.getElementById('img.primary').src = `http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`;
    }

    // content
    document.getElementById('attr.title').innerHTML = `${data.menu.bm.metadata.artist} - <strong>${data.menu.bm.metadata.title}</strong>`;
    document.getElementById('attr.difficulty').innerHTML = `difficulty <strong>${data.menu.bm.metadata.difficulty}</strong>`;
    document.getElementById('attr.mapper').innerHTML = `mapper <strong>${data.menu.bm.metadata.mapper}</strong>`;
}