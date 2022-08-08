<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://cdn-icons-png.flaticon.com/512/1322/1322086.png" alt="Project logo"></a>
</p>

<h3 align="center">Teamviewer clone</h3>



<p align="center"> Il progetto ha come obbiettivo quello di far comunicare due client, un client share ed uno control.
Il client share condivide il proprio schermo. Il client control tramite il codice del client share può connettersi e prendere il controllo di mouse e tastiera.
    <br> 
</p>

## 📝 Contenuto

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

Lo scopo è stato quello di creare un applicativo che potesse essere utilizzato in ogni dispositivo, il risultato è stato raggiunto grazie al framework Electron.
L'applicativo è stato realizzato completamente in Electron, ciò ha consentito il build di un eseguibile che è possibile avviare senza l'installazione di nessun tipo di pacchetto aggiuntivo, inoltre per sua natura essendo Electron composto da un browser web e un server node interno, la portabilità dell'applicativo a web app è pressochè immediata.


## 🏁 Getting Started <a name = "getting_started"></a>

In primo luogo è necessario clonare la repo utilizzando il seguente comando: 
```
git clone https://github.com/saroo25/Teamviewer_clone.git
```

Successivamente nella cartella colonata è necessario spostarsi nella cartella server, da questa posizione è possibile installare tutte le dipendenze lanciando:
```
npm install
```
In fine il server va lanciato con il comando:
```
npm start
```
La stessa procedura va effettuata per la cartella my-electron-app, è inoltre possibile creare un eseguibile della stessa app con il comando:
```
electron-packager ./ screenshare --platform=win32 --arch=x64 --overwrite
```



### Prerequisites

Sono necessari node versione 16.16.0 ed npm versione 8.11.0.
Tutte le altre dipendenze saranno installate una volta lanciato npm install.

## 🎈 Usage <a name="usage"></a>

E' consigliato sostituire la riga 10 del file app.js e la riga 10 del file control.js , qui riportate:
```javascript
const socket = require('socket.io-client')('https://28ef-37-179-147-177.eu.ngrok.io',{transports: ['websocket']});
```
cambiando l'url e inserendo l'url che fa riferimento all'hosting del vostro server.

## ⛏️ Built Using <a name = "built_using"></a>

- [Socket.IO](https://socket.io/) 
- [NodeJs](https://nodejs.org/en/)
- [Electron](https://www.electronjs.org/)
- [Jquery](https://jquery.com/)
- [Robotjs](http://robotjs.io/)
- [Dialogs](https://github.com/jameskyburz/dialogs)

## ✍️ Author <a name = "authors"></a>

- Rosario Forte

