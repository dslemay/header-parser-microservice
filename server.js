var express = require('express'),
    parse = require('ua-parser-js'),
    app = express();

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname));

app.get('/api/whoami', function(req, res) {
  req.on('error', function(err) {
    console.log(err);
  });
  var language = req.headers['accept-language'].split(',')[0],
      ipHeader = req.headers['x-forwarded-for'],
      ip = ipHeader !== undefined ? ipHeader.split(',')[0] : undefined;

  var userAgent = parse(req.headers['user-agent']),
      browser = userAgent.browser,
      os = userAgent.os,
      software = browser.name + " v" + browser.major + "; " + os.name + " " + os.version;

  var obj = {
    ipaddress: ip,
    language: language,
    software: software
  }

  res.send(obj);
})

app.on('error', function(err) {
  console.log(err);
});

app.listen(app.get('port'), function() {
  console.log('Node app is listening on port', app.get('port'));
});
