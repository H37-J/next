const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')

function createWindow () {
    const win = new BrowserWindow({
        width: 1440,
        height: 1200,
        webPreferences: {
            preload: path.join(__dirname, 'api.js'),
            nodeIntegration: true,
        },
        autoHideMenuBar: true,
    })

    win.loadFile('index.html')
    win.webContents.openDevTools();
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
})

ipcMain.on('button-click', (event) => {
    console.log('Button clicked');
    event.reply('button-click', 'Button click processed');
});