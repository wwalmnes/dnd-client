const express = require('express'),
      path = require('path'),
      app = express();

app.use('/public', express.static('public'));
app.use('/dist', express.static('dist'));

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
