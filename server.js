// Module dependencies.
var application_root = __dirname,
    express = require('express'), // Web framework
    path = require('path'), // Utilities for dealing with file paths
    mongoose = require('mongoose'); // MongoDB integration

// Create server
var app = express();

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
var port = 4711;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

// Connect to database
mongoose.connect( 'mongodb://localhost/gymnasium_database' );

// Schemas
var Gym = new mongoose.Schema({
  gym: String,
  subGym: String,
  sport: String,
  playTime: String,
  num: Number,
  dayOfWeek: String,
  adviser: Boolean
});

// Models
var GymModel = mongoose.model( 'Gym', Gym );

// Routes
app.get( '/api', function( request, response ) {
  response.send( 'Library API is running' );
});

// Get a list of all Gyms
app.get( '/api/gyms', function( request, response ) {
  return GymModel.find( function( err, gyms ) {
    if ( ! err ) {
      return response.send( gyms );
    } else {
      return console.log( err );
    }
  });
});

// Insert a new Gym
app.post( '/api/gyms', function( request, response ) {
  var gym = new GymModel({
    gym: request.body.gym,
    subGym: request.body.subGym,
    sport: request.body.sport,
    playTime: request.body.playTime,
    num: parseInt( request.body.num ),
    dayOfWeek: request.body.dayOfWeek,
    adviser: request.body.adviser === 0 ? true : false
  });
  gym.save( function( err ) {
    if ( ! err ) {
      return console.log( 'created' );
    } else {
      return console.log( err );
    }
  });
  return response.send( gym );
});

// Get a single gym by id
app.get( '/api/gyms/:id', function( request, response ) {
  return GymModel.findById( request.params.id, function( err, gym ) {
    if ( ! err ) {
      return response.send( gym );
    } else {
      return console.log( err );
    }
  });
});

// Update a gym
app.put( '/api/gyms/:id', function( request, response ) {
  console.log( 'Updating gym: ' + request.body.gym );
  return GymModel.findById( request.params.id, function( err, gym ) {
    gym.gym = request.body.gym;
    gym.subGym = request.body.subGym;
    gym.sport = request.body.sport;
    gym.playTime = request.body.playTime;
    gym.num = parseInt( request.body.num );
    gym.dayOfWeek = request.body.dayOfWeek;
    gym.adviser = request.body.adviser === 0 ? true : false

    return gym.save( function( err ) {
      if ( ! err ) {
        console.log( 'gym updated' );
      } else {
        console.log( err );
      }
      return response.send( gym );
    });
  });
});

// Delete a gym
app.delete( '/api/gyms/:id', function( request, response ) {
  console.log( 'Deleting gym with id: ' + request.params.id );
  return GymModel.findById( request.params.id, function( err, gym ) {
    return gym.remove( function( err ) {
      if ( ! err ) {
        console.log( 'Gym removed' );
        return response.send( '' );
      } else {
        console.log( err );
      }
    });
  });
});