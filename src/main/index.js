const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const electron = require('electron')
const { app, BrowserWindow } = electron
const config = require(path.resolve('./webpack.config.js'))

let mainWindow = null

if (process.env.NODE_ENV === 'development') {
  config.output.publicPath = 'http://localhost:8080/'
  config.entry.unshift('react-hot-loader/patch')
  config.entry.unshift('webpack-dev-server/client?http://localhost:8080/')
  config.entry.unshift('webpack/hot/only-dev-server')

  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, { hot: true })
  server.listen(8080)
}

app.on('ready', () => {
  const { screen } = electron
  const size = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(`file://${__dirname}/../renderer/index.html`)
    mainWindow.openDevTools()
  } else {
    mainWindow.loadURL(`file://${__dirname}/renderer/index.html`)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})
