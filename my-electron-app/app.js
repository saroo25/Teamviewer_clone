const { app, BrowserWindow, ipcMain } = require('electron')
const electron = require('electron');

//electron-packager ./ screenshare --platform=win32 --arch=x64 --overwrite
app.disableHardwareAcceleration()
const screenshot = require('screenshot-desktop');

const robot = require("robotjs");

const socket = require('socket.io-client')('https://28ef-37-179-147-177.eu.ngrok.io',{transports: ['websocket']});
let interval;

socket.on('connect',()=>{console.log(socket.id)});
socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
let win;
function createWindow () {
    win = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.removeMenu();
    //win.webContents.openDevTools()
    win.loadFile('home.html')
    const screenElectron = electron.screen;
    const mainScreen = screenElectron.getPrimaryDisplay();
    const dimensions = mainScreen.size;
    console.log(dimensions.width)
    console.log(dimensions.height);
    socket.on("mouse-move", function(data){
        var obj = JSON.parse(data);
        
        var x = obj.x;
        var y = obj.y;
        x= parseInt(((x - 0) * (1920 - 0)) / (920 - 0)) + 0
        y= parseInt(((y - 0) * (1080 - 0)) / (720 - 0)) + 0
        
        robot.moveMouse(x, y);
    })

    socket.on("mouse-click", function(data){
        robot.mouseClick();
    })

    socket.on("type", function(data){
        var obj = JSON.parse(data);
        var key = obj.key;
        //controllo se null
        console.log(key);
        key=key.toLowerCase();
        if(key)
            robot.keyTap(key);
        
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        console.log('start');
    }
})
var obj = {};
ipcMain.on("start-share", function(event, arg) {

    var uuid = (Math.random() + 1).toString(36).substring(7);//uuidv4();
    console.log("CONDIVIDO");
    socket.emit("join-message", uuid);
    event.reply("uuid", uuid);

    interval = setInterval(function() {
        screenshot().then((img) => {
            var imgStr = new Buffer.from(img).toString('base64');

            
            obj.room = uuid;
            obj.image = imgStr;
            console.log("STO MANDANDO");
            socket.emit("screen-data", JSON.stringify(obj));
        })
    }, 150)
})

ipcMain.on("stop-share", function(event, arg) {
    socket.emit("stop-share", JSON.stringify(obj));
    clearInterval(interval);
})

ipcMain.on("change-screen", function(event, arg) { win.loadFile(arg);})
