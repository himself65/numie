require('dotenv').config()

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  new FriendlyErrorsWebpackPlugin({
    clearConsole: true
  }),
  new ProgressBarPlugin()
]


exports.config = {
  mode: isProd ? 'production' : 'development',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  plugins
}
