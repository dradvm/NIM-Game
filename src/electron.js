const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

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
            contextIsolation: false,
        }
    });


    mainWindow.loadURL('http://localhost:3000');

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
