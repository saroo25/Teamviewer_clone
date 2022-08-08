let app = require('express')(); 
let http = require('http').createServer(app);
let {Server} = require('socket.io');
let io = new Server(http);




io.on('connection', (socket)=> {
    console.log(socket.id);
    socket.on("join-message", (roomId) => {
        socket.join(roomId);
        console.log("User joined in a room : " + roomId);
    })

    socket.on("screen-data", function(data) {
        console.log("STO RICEVENDO")
        data = JSON.parse(data);
        var room = data.room;
        var imgStr = data.image;
        socket.broadcast.to(room).emit('screen-data', imgStr);
    })
    socket.on("stop-share", function (data) { 
        console.log("rimuovo la room")
        data = JSON.parse(data);
        var room = data.room;
        io.in(room).socketsLeave(room);
        socket.broadcast.to(room).emit('stop-share');
    })

    socket.on("mouse-move", function(data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-move", data);
    })

    socket.on("mouse-click", function(data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("mouse-click", data);
    })

    socket.on("type", function(data) {
        var room = JSON.parse(data).room;
        socket.broadcast.to(room).emit("type", data);
    })
    socket.on("disconnect_controller",function(data) {
        console.log("disconnect_controller called");
        socket.disconnect();
    })
})

let server_port = process.env.YOUR_PORT || process.env.PORT || 5005;
console.log(server_port);

http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})