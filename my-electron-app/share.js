const ipcRenderer = require('electron').ipcRenderer;
let sharing=0;
window.onload = function() {
    ipcRenderer.on("uuid", (event, data) => {
        document.getElementById("code").innerHTML = "your room id: "+data;
    })
}

function startShare(){
    sharing=1;
    document.getElementById("code").style.display = "block";
    ipcRenderer.send("start-share", {});
    document.getElementById("start").style.display = "none";
    document.getElementById("stop").style.display = "block";
}

function stopShare(){
    sharing=0;
    ipcRenderer.send("stop-share", {});
    document.getElementById("code").style.display = "none";
    document.getElementById("stop").style.display = "none";
    document.getElementById("start").style.display = "block";
}

function disconnect(){
    if(sharing==1){
        stopShare();
        
    }
    ipcRenderer.send("change-screen","home.html");
}