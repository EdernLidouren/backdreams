const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const path = require('path');

const fs = require("fs");


// On initialise puis crée la fenêtre principale :
let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    webPreferences: {
      //nodeIntegration: true,
      //contextIsolation: false,
      //enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

// Lorsqu'Electron a fini de charger, l'on ouvre la fenêtre principale :
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Sur windows ou linux, lorsque toutes les fenêtres de l'application sont fermées, alors l'application entière est fermée :
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
