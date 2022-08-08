$ = window.jQuery = require('jquery');

const ipcRenderer = require('electron').ipcRenderer;
const Dialogs = require('dialogs')
const dialogs = Dialogs()

let socket;

window.onload = function() {
    socket = require('socket.io-client')('https://28ef-37-179-147-177.eu.ngrok.io',{transports: ['websocket']});
    var room 
    dialogs.prompt("Id","",(ok)=>{
        room=ok
        socket.emit("join-message", ok);

    });
    

    socket.on('screen-data', function(message){
        $("img").attr("src", "data:image/png;base64," + message);
    })

    socket.on('stop-share', function(message){
        console.log("fine delle trasmissioni");
        $("img").attr("src", "http://pngimg.com/uploads/mario/mario_PNG53.png");//sistemare
    })


    $("img").mousemove(function(e){//in app

        var posX = $(this).offset().left;
        var posY = $(this).offset().top;

        var x = e.pageX - posX;
        var y = e.pageY - posY;

        var obj = {"x" : x, "y": y, "room": room}
        socket.emit("mouse-move", JSON.stringify(obj));

    })

    $("img").click(function(e){//in app
        var obj = {"room" : room};
        socket.emit("mouse-click", JSON.stringify(obj));
    })

    $(window).bind("keyup", function(e) {//in app

        var obj = {"key": e.key, "room" : room};
        socket.emit("type", JSON.stringify(obj));
    })
}

function disconnect(){
    socket.emit("disconnect_controller");
    ipcRenderer.send("change-screen","home.html");
    
}