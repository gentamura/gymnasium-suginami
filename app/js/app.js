var app = app || {};

$(function() {
  var gyms = [
    {
      name      : '高円寺',
      subName   : '体育室',
      sport     : '卓球',
      playTime  : '9:00-13:00',
      num       : '1',
      dayOfWeek : '水',
      adviser   : false
    },
    {
      name      : '永福',
      subName   : '体育室',
      sport     : 'バスケットボール',
      playTime  : '17:00-21:00',
      num       : '2',
      dayOfWeek : '日',
      adviser   : false
    }
  ];
  new app.ScheduleView( gyms );
});