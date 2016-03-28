var application_root = __dirname,
    express   = require('express'),
    path      = require('path'),
    schedules = require('./schedules.json');

var app = express();

app.set('port', process.env.PORT || 4711);

app.configure( function() {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( application_root, 'app' ) ) );
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
});

app.listen( app.get('port'), function() {
  console.log( 'Express server listening on port %d in %s mode', app.get('port'), app.settings.env );
});

app.get('/api/schedules', function(req, res) {
  res.contentType('application/json');
  res.send(JSON.stringify(schedules));
});
