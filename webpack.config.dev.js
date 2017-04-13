var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // necessary for hot reloading with IE:
    //'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    //'webpack-hot-middleware/client',
    // your code:
    //'./src/index'
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx', '.scss'],
    alias: {
      actions: path.join(__dirname, 'src/actions'),
      components: path.join(__dirname, 'src/components'),
      containers: path.join(__dirname, 'src/containers'),
      middleware: path.join(__dirname, 'src/middleware'),
      reducers: path.join(__dirname, 'src/reducers'),
      store: path.join(__dirname, 'src/store'),
      templates: path.join(__dirname, 'src/templates')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    // new ExtractTextPlugin('./public/css/app.css', {
    //     allChunks: true
    // }),
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.tsx?$/,
        //loaders: ['babel', 'ts-loader?configFileName=tsconfig.webpack.json'],
        loaders: ['babel', 'ts-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  externals: {
      'fetch': 'fetch'
  },
};
