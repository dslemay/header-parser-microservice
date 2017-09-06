var express = require('express'),
    app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname));

app.get('/api/whoami', function(req, res) {
  req.on('error', function(err) {
    console.log(err);
  });
  console.log(req.headers);


  res.end();
})

app.on('error', function(err) {
  console.log(err);
});

app.listen(app.get('port'), function() {
  console.log('Node app is listening on port', app.get('port'));
});
