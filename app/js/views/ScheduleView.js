var app = app || {};

app.ScheduleView = Backbone.View.extend({
  el: '#gyms',

  initialize: function() {
    this.collection = new app.Schedule();
    this.collection.fetch({ reset: true });
    this.render();
  },

  events: {
    'change #select-gym'   : 'updateGymList',
    'click #submit'      : 'selectGym',
    'click #back_cal'    : 'backCal',
    'click #back_search' : 'backSearch'
  },

  updateGymList: function() {
    console.log('updateList');
    var gym_list = [];
    var uniq_gym_list = [];
    var select_gym = $('#select-gym').val();
    var attributes = this.collection.where({ gym: select_gym });
    
    for (var i = 0; i < attributes.length; i++) {
      gym_list.push( attributes[i].get('sport') );
    }
    uniq_gym_list = _.uniq(gym_list);

    // 競技リストを更新する
    var sport_list_view = new app.SportListView();
    sport_list_view.update( uniq_gym_list );

  },

  backSearch: function() {
    $('#back_search').remove();
    this.cal.remove();
    // 検索フォームを表示する
    this.$el.find('#search').show();
  },

  backCal: function() {
    $('#detail').remove();
    $('#back_cal').remove();
    this.selectGym();
  },

  selectGym: function() {

    // アラートが表示されていたら消す
    if ( $('.alert').length > 0 ) {
      $('.alert').remove();
    }

    var attributes;
    var collection   = this.collection;
    var select_gym   = $('#select-gym').val();
    var select_sport = $('#select-sport').val();
    var select_date  = $('#select-date').val();

    if ( select_gym && select_sport ) {
      attributes = this.collection.where({ gym: select_gym, sport: select_sport });
    } else if ( select_gym && _.isEmpty( select_sport ) ) {
      attributes = this.collection.where({ gym: select_gym });
    } else if ( _.isEmpty( select_gym ) && select_sport ) {
      attributes = this.collection.where({ sport: select_sport });
    } else if ( _.isEmpty( select_gym ) && _.isEmpty( select_sport ) ) {
      attributes = this.collection.models;
    }

    // カレンダービューを処理
    this.cal = new app.CalView();
    this.cal.remove();
    $('#result').append( this.cal.render().el );
    $('#result').append('<button id="back_search" class="form-control btn btn-success" style="margin-top:20px;"></span> 検索に戻る</button>');
    this.cal.createCal( attributes, select_date );

    // 検索フォームを隠す
    this.$el.find('#search').hide();

  },  

  render: function() {

    // 選択リストを表示
    var gym_list_view   = new app.GymListView();
    var sport_list_view = new app.SportListView();
    var date_list_view  = new app.DateListView();

    // カレンダーを表示
    // var cal_view = new app.CalView();
    // this.$el.append( cal_view.render().el );
    // cal_view.createCal();

  }
});