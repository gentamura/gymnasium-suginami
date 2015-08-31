// Setup New Relic
require('newrelic');
// Module dependencies.
var application_root = __dirname,
    express   = require('express'),
    path      = require('path'),
    schedules = require('./schedules.json');


// Create server
var app = express();

app.set('port', process.env.PORT || 4711);

// Configure server
app.configure( function() {
  // parses request body and populates request.body
  app.use( express.bodyParser() );

  // checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  // perform route lookup based on URL and HTTP method
  app.use( app.router );

  // Where to serve static content
  app.use( express.static( path.join( application_root, 'app' ) ) );

  // Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }) );
});

// Start server
app.listen( app.get('port'), function() {
  console.log( 'Express server listening on port %d in %s mode', app.get('port'), app.settings.env );
});


app.get('/api/schedules', function(req, res) {
  res.contentType('application/json');
  res.send(JSON.stringify(schedules));
});