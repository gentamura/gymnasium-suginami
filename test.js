jQuery.get( '/api/gyms/', function( data, textStatus, jqXHR ) {
  console.log( 'Get response:' );
  console.dir( data );
  console.log( textStatus );
  console.dir( jqXHR );
});

jQuery.post( '/api/gyms', {
  'gym': '大宮前',
  'subGym': '体育室',
  'sport': '卓球・ラージボール卓球',
  'playTime': '午前',
  'num': 1,
  'dayOfWeek': '日',
  'adviser': true
}, function( data, textStatus, jqXHR ) {
  console.log( 'Post response:' );
  console.dir( data );
  console.log( textStatus );
  console.dir( jqXHR );
});

jQuery.get( '/api/gyms/5529fc18ba60fa855b000001', function( data, textStatus, jqXHR ) {
  console.log( 'Get response:' );
  console.dir( data );
  console.log( textStatus );
  console.dir( jqXHR );
});

jQuery.ajax({
  url: '/api/gyms/5529fe3a45f6c1415e000001',
  type: 'PUT',
  data: {
    'gym': '永福',
    'subGym': '体育室',
    'sport': '卓球・ラージボール卓球',
    'playTime': '午前',
    'num': 1,
    'dayOfWeek': '日',
    'adviser': true
  },
  success: function( data, textStatus, jqXHR ) {
    console.log( 'Post response:' );
    console.dir( data );
    console.log( textStatus );
    console.dir( jqXHR );
  }
});



jQuery.ajax({
  url: '/api/gyms/5529fe3a45f6c1415e000001',
  type: 'DELETE',
  success: function( data, textStatus, jqXHR ) {
    console.log( 'Post response:' );
    console.dir( data );
    console.log( textStatus );
    console.dir( jqXHR );
  }
});