
const app = require('app')
const BrowserWindow = require('browser-window')

let mainWindow = null

if (process.env.NODE_ENV === 'development') {
  const config = require('./webpack.config.js')
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/')
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler)
  server.listen(8080)
}

app.on('ready', () => {
  const size = require('screen').getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`file://${__dirname}/renderer/index.html`)
    mainWindow.openDevTools()
  } else {
    mainWindow.loadURL(`file://${__dirname}/dist/renderer/index.html`)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
