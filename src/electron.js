const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('path');
const updateElectronApp = require('update-electron-app');

updateElectronApp();
let mainWindow;

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: width,    // Chiều rộng bằng màn hình
        height: height,  // Chiều cao bằng màn hình
        x: 0,            // Vị trí bắt đầu từ góc trái trên
        y: 0,
        frame: true,     // Hiển thị thanh điều hướng
        resizable: true, // Cho phép thay đổi kích thước cửa sổ
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });


    mainWindow.loadURL('https://dradvm.github.io/NIM-Game');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("close-app", () => {
    app.quit();
});