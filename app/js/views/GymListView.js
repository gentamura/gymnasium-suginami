var app = app || {};

app.GymListView = Backbone.View.extend({
  el: '#select-gym',
  template: _.template( $('#gym-list-template').html() ),
  gyms: { gyms :['永福','大宮前','荻窪','上井草','高円寺'] },
  
  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html( this.template( this.gyms ) );
    return this;
  }

});