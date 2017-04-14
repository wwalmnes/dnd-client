var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config;

if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.config.prod');
} else {
  config = require('./webpack.config.dev');
}

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3001, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3001');
});
