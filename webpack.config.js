const path = require('path')
const webpack = require('webpack')

module.exports = {
  debug: true,
  target: 'electron-renderer',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'source-map-support',
    // 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './src/renderer/app'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  externals: [],
  module: {
    loaders: [
      {
        test: /\.global\.less/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap',
          'less'
        ]
      },
      {
        test: /^((?!\.global).)*\.less/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'less'
        ]
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  }
}
