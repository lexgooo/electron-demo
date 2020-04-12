const { app, BrowserWindow, ipcMain } = require('electron')
let win, printWin
function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('./index.html')
    win.webContents.openDevTools({
        activate: false,
        webviewTag: true
    })
}

function createPrintWin () {
    printWin = new BrowserWindow({
        width: 400,
        height: 300,
        title: '打印的内容',
        webPreferences: {
            nodeIntegration: true
        },
        show: false,
        paintWhenInitiallyHidden: true
    })
    printWin.loadFile('./printer.html')
}

ipcMain.on('get-printers', event => {
    createPrintWin()
    const printers = win.webContents.getPrinters()
    win.send('printerList', printers)
})
ipcMain.on('do-print', (event, args) => {
    printWin.webContents.print(args, (success, reson) => {
        if (!success) console.log(reson)
    })
})
ipcMain.on('print-to-pdf', event => {
    printWin.webContents.printToPDF({pageSize: 'A4'}).then(res => {
        console.log(res)
    })
})

app.whenReady().then(createWindow)
