var app = app || {};

app.Schedule = Backbone.Collection.extend({
  model: app.Gym,
  url: '/api/gyms'
});