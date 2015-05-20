var app = app || {};

app.SportListView = Backbone.View.extend({
  el: '#select-sport',
  template: _.template( $('#sport-list-template').html() ),
  sports: { sports :[
    '卓球・ラージボール卓球',
    'フェンシング',
    'バレーボール',
    'ソフトバレーボール',
    'インディアカ',
    'ユニカール',
    'バウンドテニス',
    'ミニテニス',
    'パドルテニス',
    'フットサル',
    'バスケットボール',
    'ソシアルダンス',
    'ダンス',
    'バドミントン',
    '気功',
    '合気道',
    '太極拳',
    '柔道',
    '空手',
    '剣道',
    'なぎなた',
    '居合道',
    '武道タイム'
  ] },

  initialize: function() {
    this.render();
  },

  update: function(list) {
    // optionを削除
    this.$el.html('');
    // 上書き
    this.sports = { sports: list };
    this.$el.html( this.template( this.sports ) );
    return this;
  },

  render: function() {
    this.$el.html( this.template( this.sports ) );
    return this;
  }
  
});