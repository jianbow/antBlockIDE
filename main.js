// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { shell } = require('electron');

console.log(app.getAppPath());

let pathToApp = app.getAppPath();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create arduinoSettings.json file to keep track of port.
var obj = {
    table: []
};
obj.table.push({ ifYou: "readThis", nice: 'job' });
var json = JSON.stringify(obj);
var fs = require('fs');
fs.writeFile(pathToApp + '\\arduino-manager\\arduinoSettings.json', json, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});

process.env['APP_PATH'] = app.getAppPath();

// Create browser window.
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '/images/antbot64x64.ico'),  //icon: process.env['APP_PATH'] + 'images\codeoutlinedprogrammingsigns_81143.ico',
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        // Comment when working with uncompressed blockly files.
        nodeIntegration: true
      }

  })

  // Load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.


      //DELETES JSON FILE SO NEXT BOOT DOESN'T HAVE PRESENT. IDEALLY, CHANGE JSON FILE ON CLOSE. THIS WORKS THOUGH.
      const fs = require('fs');

      fs.unlink(pathToApp + '/arduino-manager/arduinoSettings.json', (err) => {
          if (err) throw err;
          console.log('path/file.txt was deleted');
      });



    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
