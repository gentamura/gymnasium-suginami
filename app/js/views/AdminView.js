var app = app || {};

app.AdminView = Backbone.View.extend({
  tagName: 'div',
  className: 'gym-container',
  template: _.template( $('#gym-template').html() ),

  events: {
    'click .delete': 'deleteGym',
    'click .add': 'addGym'
  },
  
  addGym: function(e) {
    e.preventDefault();

    var formData = {};

    $('#add-gym div').children('input').each(function( i, el ) {
      if ( $( el ).val() != '' ) {
        if ( el.id === 'adviser' ) {
          formData[ el.id ] = $('[id="adviser"]:checked').val();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
    });
    $('#add-gym div').children('select').each(function( i, el ) {
      if ( $( el ).val() != '' ) {
        if ( el.id === 'adviser' ) {
          formData[ el.id ] = $( el ).val();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
    });

    this.collection.create( formData );
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