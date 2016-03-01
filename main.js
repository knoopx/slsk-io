var BrowserWindow, app, mainWindow;

app = require('app');
app.commandLine.appendSwitch('ignore-connections-limit', '*');

BrowserWindow = require('browser-window');

mainWindow = null;

app.on('ready', function() {
  var size = require('screen').getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height
  });

  mainWindow.loadURL("file://" + __dirname + "/build/index.html");
  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
