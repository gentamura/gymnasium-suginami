var app = app || {};

app.ScheduleView = Backbone.View.extend({
  el: '#gyms',

  initialize: function( initializeGyms ) {
    this.collection = new app.Schedule();
    this.collection.fetch({ reset: true });
    this.render();

    this.listenTo( this.collection, 'add', this.renderGym );
    this.listenTo( this.collection, 'reset', this.render );
  },

  events: {
    'click #add': 'addGym'
  },

  addGym: function( e ) {
    e.preventDefault();

    var formData = {};

    $('#add-gym div').children('input').each(function( i, el ) {
      if ( $( el ).val() != '' ) {
        console.log('el.id, $(el).val()', el.id, $(el).val());
        if ( el.id === 'adviser' ) {
          formData[ el.id ] = $('[id="adviser"]:checked').val();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
    });
    $('#add-gym div').children('select').each(function( i, el ) {
      if ( $( el ).val() != '' ) {
        console.log('el.id, $(el).val()', el.id, $(el).val());
        if ( el.id === 'adviser' ) {
          formData[ el.id ] = $( el ).val();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
    });

    this.collection.create( formData );
  },

  render: function() {
    this.collection.each( function( item ) {
      this.renderGym( item );
    }, this );
  },

  renderGym: function( item ) {
    var gymView = new app.GymView({
      model: item
    });
    this.$el.append( gymView.render().el );
  }
});