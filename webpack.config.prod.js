var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx', '.scss']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('./public/css/app.css', {
        allChunks: true
    })
  ],
  module: {
    loaders: [
       {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
              'style',
              'css!sass')
    },
      {
      test: /\.ts(x?)$/,
      loaders: ['babel', 'ts-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};
