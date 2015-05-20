// Module dependencies.
var application_root = __dirname,
    express = require('express'), // Web framework
    path = require('path'), // Utilities for dealing with file paths
    mongoose = require('mongoose'); // MongoDB integration

// Create server
var app = express();

app.set('port', process.env.PORT || 4711);
app.set('uri', process.env.MONGOLAB_URI || 'mongodb://localhost/gymnasium_database');

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

// Connect to database
mongoose.connect( app.get('uri') );

// Schemas
var Schedule = new mongoose.Schema({
  gym: String,
  subGym: String,
  sport: String,
  playTime: String,
  num: Number,
  dayOfWeek: String,
  adviser: Boolean
});

// Models
var ScheduleModel = mongoose.model( 'Schedule', Schedule );

// Routes
app.get( '/api', function( request, response ) {
  response.send( 'Library API is running' );
});

// Get a list of all schedule
app.get( '/api/schedules', function( request, response ) {
  return ScheduleModel.find( function( err, schedule ) {
    if ( ! err ) {
      return response.send( schedule );
    } else {
      return console.log( err );
    }
  });
});

// Insert a new schedule
app.post( '/api/schedules', function( request, response ) {
  var schedule = new ScheduleModel({
    gym: request.body.gym,
    subGym: request.body.subGym,
    sport: request.body.sport,
    playTime: request.body.playTime,
    num: parseInt( request.body.num ),
    dayOfWeek: request.body.dayOfWeek,
    adviser: request.body.adviser === 0 ? true : false
  });
  schedule.save( function( err ) {
    if ( ! err ) {
      return console.log( 'created' );
    } else {
      return console.log( err );
    }
  });
  return response.send( schedule );
});

// Get a single schedule by id
app.get( '/api/schedules/:id', function( request, response ) {
  return ScheduleModel.findById( request.params.id, function( err, schedule ) {
    if ( ! err ) {
      return response.send( schedule );
    } else {
      return console.log( err );
    }
  });
});

// Update a schedule
app.put( '/api/schedules/:id', function( request, response ) {
  console.log( 'Updating schedule' );
  return ScheduleModel.findById( request.params.id, function( err, schedule ) {
    schedule.gym = request.body.gym;
    schedule.subGym = request.body.subGym;
    schedule.sport = request.body.sport;
    schedule.playTime = request.body.playTime;
    schedule.num = parseInt( request.body.num );
    schedule.dayOfWeek = request.body.dayOfWeek;
    schedule.adviser = request.body.adviser === 0 ? true : false

    return schedule.save( function( err ) {
      if ( ! err ) {
        console.log( 'schedule updated' );
      } else {
        console.log( err );
      }
      return response.send( schedule );
    });
  });
});

// Delete a schedule
app.delete( '/api/schedules/:id', function( request, response ) {
  console.log( 'Deleting schedule with id: ' + request.params.id );
  return ScheduleModel.findById( request.params.id, function( err, schedule ) {
    return schedule.remove( function( err ) {
      if ( ! err ) {
        console.log( 'schedule removed' );
        return response.send( '' );
      } else {
        console.log( err );
      }
    });
  });
});