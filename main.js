// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
//const { shell } = require('electron');

//var fs = require('fs');

//fs.readFile('arduino-manager/temp.txt', 'utf8', function (err, data) {
//    if (err) throw err;
//    console.log(data);
//});


// Open a local file in the default app

//UNCOMMENT THE SHELL OPEN ITME LINE TO RUN THE BATCH FILE TO CREATE LOCAL SERVER FOR ARDUINO

shell.openItem(app.getAppPath() + '\\arduino-manager\\load_server.bat');

//your code
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
//store.set('foo.bar', false);
//console.log(store.get('foo'));

//console.log(app.getPath('userData'));

var obj = {
    table: []
};
obj.table.push({ 1: 2, yee: 'haw' });
var json = JSON.stringify(obj);
var fs = require('fs');
fs.writeFile('arduino-manager\\arduinoSettings.json', json, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
    //console.log('inside function');

});

//console.log('hooray');



function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        //THIS ONE LINE OF CODE TOOK ME 3 DAYS. ELECTRON DOCS LIE AND SAY NODE API USABLE. CHANGED SINCE VERSION 5, MUST SET TRUE
        //nodeIntegration: true
      }

  })

  // and load the index.html of the app.
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

      fs.unlink('arduino-manager/arduinoSettings.json', (err) => {
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

