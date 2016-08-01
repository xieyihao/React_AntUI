var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var Clean = require("clean-webpack-plugin");

var rootDir = path.join(__dirname, "..");
var processName = process.env.NODE_ENV;

var config = {
  context: path.join(rootDir, "src"),
  entry:{
    app: [
    'webpack-hot-middleware/client?noInfo=false&quiet=false&reload=true',
    './app.js'],
    lib: ["react", "react-dom", "react-router", "history", "react-redux", "js-cookie"]
  },
  output:{
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    // publicPath: '/assets/'
    // path: path.join(rootDir, "build"),
    // filename: '[name].js',
    publicPath: "/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/, loader: 'url?limit=10000&name=assets/img/[sha512:hash:base64:7].[ext]' },
      { test: /\.json$/, loader:'file-loader?name=./[path][name].[ext]'}
    ]
  },
  plugins:[
    //new Clean(['dist/index.html'], rootDir),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"'+processName+'"'}),
    // new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
    // new webpack.optimize.UglifyJsPlugin({warnings: false, minimize: true, sourceMap: false}),
    new ExtractTextPlugin("css/styles.css"), //提取CSS. http://npm.taobao.org/package/extract-text-webpack-plugin
    //new CopyWebpackPlugin([
    //  {from :"../node_modules/antd/dist/antd.min.css", to: "../dist/css/antd.min.css"}
    //])
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'assets/index.html',
    //   host:'http://localhost:3081'
    // })
  ]
};

module.exports = config;
