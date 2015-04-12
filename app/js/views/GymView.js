var app = app || {};

app.GymView = Backbone.View.extend({
  tagName: 'div',
  className: 'gym-container',
  template: _.template( $('#gym-template').html() ),

  events: {
    'click .delete': 'deleteGym'
  },

  deleteGym: function() {
    // Delete model
    this.model.destroy();

    // Delete view
    this.remove();
  },

  render: function() {
    this.$el.html( this.template( this.model.toJSON() ) );
    return this;
  }
});