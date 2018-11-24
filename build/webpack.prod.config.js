const merge = require('webpack-merge')
const { config: baseWebpackConfig } = require('./webpack.base.config')

const resolve = file => require('path').resolve(__dirname, file)

module.exports = merge(baseWebpackConfig, {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    filename: 'nimue.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader:
          'json-loader'
      }]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json']
  }
})
