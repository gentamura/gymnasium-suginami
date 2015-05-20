var app = app || {};

app.CalView = Backbone.View.extend({
  tagName: 'div',
  id: 'cal-view',
  template: _.template( $('#detail-template').html() ),

  remove: function() {
    // カレンダー削除
    $('body').find('#cal-view').remove();
  },

  render: function() {
    return this;
  },

  createCal: function( attrs, select_date ) {
    // 初期化
    var year, month;
    var gym_events = [];
    var template = this.template;

    if ( select_date ) {
      year = select_date.split('-')[0];
      month = select_date.split('-')[1];
    } else {
      var date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
    }

    if ( attrs ) {
      for (var i = 0; i < attrs.length; i++) {
        gym_events[i] = {
          title: attrs[i].get('sport'),
          start: this.getWeekOfDay(attrs[i].get('num'), attrs[i].get('dayOfWeek'), attrs[i].get('playTime'), 'start', year, month),
          end: this.getWeekOfDay(attrs[i].get('num'), attrs[i].get('dayOfWeek'), attrs[i].get('playTime'), 'end', year, month),
          gym: attrs[i].get('gym'),
          subGym: attrs[i].get('subGym'),
          adviser: this.getAdviser(attrs[i].get('adviser'))
        };
      } 
    }
    
    this.$el.fullCalendar({
      header: {
        left: 'title',
        center: '',
        right:''
      },
      defaultDate: moment(year + "-" + month + "-01", "YYYY-MM-DD"),
      selectable: true,
      events: gym_events,
      timeFormat: 'H:mm', // uppercase H for 24-hour clock
      eventClick: function(calEvent, jsEvent, view) {
        var date_format = 'YYYY/MM/DD[(]ddd[)]';
        var time_format = 'HH:mm';

        var obj = {
          gym     : calEvent.gym,
          subGym  : calEvent.subGym,
          sport   : calEvent.title,
          date    : calEvent.start.format(date_format),
          start   : calEvent.start.format(time_format),
          end     : calEvent.end.format(time_format),
          adviser : calEvent.adviser,
          gymLink : getGymLink( calEvent.gym )
        };
        $('#result').html( template(obj) );
        // カレンダー削除
        $('body').find('#cal-view').remove();

        function getGymLink( gym ) {
          var gym_link;
          if (gym === '永福') {
            gym_link = 'https://www2.city.suginami.tokyo.jp/map/detail.asp?home=H05380';
          }
          if (gym === '大宮前'){
            gym_link = 'https://www2.city.suginami.tokyo.jp/map/detail.asp?home=H05390';
          }
          if (gym === '荻窪'){
            gym_link = 'https://www2.city.suginami.tokyo.jp/map/detail.asp?home=H05400';
          }
          if (gym === '上井草'){
            gym_link = 'http://www.kamiigusa-spocen.net/';
          }
          if (gym === '高円寺'){
            gym_link = 'https://www2.city.suginami.tokyo.jp/map/detail.asp?home=H05420';
          }
          return gym_link;
        }
      }
    });
  },

  getAdviser: function(advier) {
    return advier ? 'います' : 'いません';
  },

  getWeekOfDay: function(count, j_day, play_time, start_or_end_flg, year, month) {
    var date, year, moth, jday_s, day;
    date = new Date();
    year = year ? year : date.getFullYear() ;
    month = month ? month : date.getMonth() + 1;
    j_days = ['日', '月', '火', '水', '木', '金', '土']
    day = j_days.indexOf(j_day);

    // 1・指定した年月の最初の曜日を取得
    var date = new Date(year+"/"+month+"/1");
    var first_day = date.getDay();
    
    // 2・求めたい曜日の第1週の日付けを計算する
    var day = day - first_day + 1;
    if( day <= 0 ) {
      day += 7;
    }
    
    // 3・n週まで1週間を足す
    day += 7 * ( count - 1 );

    // 4・結果
    result = new Date(year+"/"+month+"/"+day);
    
    var Y = result.getFullYear();
    var m = this.toDoubleDigits( result.getMonth()+1 );
    var d = this.toDoubleDigits( result.getDate() );

    return Y+"-"+m+"-"+d+this.getPlayTime(play_time, start_or_end_flg);
  },

  getPlayTime: function( play_time, start_or_end_flg ) {
    var flg = start_or_end_flg;
    var result;
    if ( play_time === '午前' ) {
      result = flg === 'start' ? 'T09:00:00' : 'T13:00:00';
    }
    else if ( play_time === '午後' ) {
      result = flg === 'start' ? 'T13:00:00' : 'T17:00:00';
    }
    else if ( play_time === '夜間' ) {
      result = flg === 'start' ? 'T17:00:00' : 'T21:00:00';
    }
    return result;
  },

  // 1桁の数字を0埋めで2桁にする
  toDoubleDigits: function(num) {
    num += "";
    if (num.length === 1) {
      num = "0" + num;
    }
   return num;     
  }
  
});