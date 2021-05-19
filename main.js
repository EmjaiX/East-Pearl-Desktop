const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
var fs = require('fs')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })


    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }

        // // Build menu from template
        // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
        //     // Insert Menu
        // Menu.setApplicationMenu(mainMenu)


        // // Create menu template
        // const mainMenuTemplate = [{
        //     label: 'File',
        //     submenu: [{
        //         label: 'Quit',
        //         accelerator: 'CmdOrCtrl+Q',
        //         click() {
        //             app.quit()
        //         }
        //     }]
        // }]

    })
    // IPC Calls

ipcMain.on("login:user", function(event, user) {
    console.log(user);
    return ("succress");
})
ipcMain.on("servername", (event) => {
    fs.readFile('./data.x', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        event.reply("servername", data);
    });

})