const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dev_build')
  },
  devServer: {
    contentBase: './dev_build',
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/html-templates/index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?|jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
