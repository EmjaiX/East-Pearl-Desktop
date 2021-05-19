const electron = require("electron");
const { ipcRenderer } = electron;
// import fetch from 'electron-fetch';

fetch("http://raspberrypi/home.php").then(
    res => res.text()
).then(data => {
    console.log(data);
})
ipcRenderer.send("servername");

ipcRenderer.on("servername", (event, arg) => {
    console.log(arg);
})