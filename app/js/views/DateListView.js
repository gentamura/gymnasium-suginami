var app = app || {};

app.DateListView = Backbone.View.extend({
  el: '#select-date',
  template: _.template( $('#date-list-template').html() ),
  dates: { dates: [] },
  initialize: function() {
    this.setup();
    this.render();
  },

  setup: function() {
    
    var m     = moment();
    var m_ary = [];

    // 当日から前後2ヶ月
    for (var i = -2; i <= 2; i++) {
      m_ary.push( m.clone().add(i, 'months') );
    }

    // フォーマット
    var value_format = 'YYYY-MM';
    var show_format = 'YYYY年MM月';
    for (var i = 0; i < m_ary.length; i++) {
      this.dates.dates.push({
        value : m_ary[i].format(value_format),
        show  : m_ary[i].format(show_format),
        selected : m_ary[i].format(value_format) === m.format(value_format) ? true : false
      });
    }

  },

  render: function() {
     this.$el.html( this.template( this.dates ) );
    return this; 
  }

});