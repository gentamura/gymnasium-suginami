var app = app || {};

app.Gym = Backbone.Model.extend({

  defaults: {
    gym      : '体育館名',
    subGym   : '詳細名',
    sport     : 'スポーツ名',
    playTime  : '時間',
    num       : '第○',
    dayOfWeek : '曜日',
    adviser   : false
  }

});