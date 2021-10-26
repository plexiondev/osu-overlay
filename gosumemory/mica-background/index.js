let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');

let bg = document.getElementById("bg");

socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
let tempImg;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25');
        //bg.setAttribute('style',`background-image: url('http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}');`);
        bg.setAttribute('src',`http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`);
    }
}
