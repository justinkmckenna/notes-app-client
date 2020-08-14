// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', function(e) {
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    var action = e.action;
  
    if (action === 'close') {
      notification.close();
    } else {
      // eslint-disable-next-line no-undef
      clients.openWindow('https://d2c9h0xuf9fw04.cloudfront.net/');
      notification.close();
    }
  });