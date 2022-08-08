const ipcRenderer = require('electron').ipcRenderer;

function share(string){

    ipcRenderer.send("change-screen","share.html");
}

function control(string){

    ipcRenderer.send("change-screen","control.html");
}