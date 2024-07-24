const { app, BrowserWindow,ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 2040,
        height: 1400,
        webPreferences: {
            contextIsolation: true,
            sandbox: false,
            preload: path.resolve(app.getAppPath(), 'src/preload.js')
        },
        autoHideMenuBar: true,
    })
    win.loadFile('naver.html')
    // win.loadFile('coupang.html')
    win.webContents.openDevTools()
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