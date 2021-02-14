const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },

  output: {
    path: path.resolve(__dirname, 'dist'), //in mode: 'development' we're using this path (__dirname, './dist').
    filename: 'main.js',
    publicPath: ''
  },

  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 8080,

    open: false
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader'
        }]
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}
