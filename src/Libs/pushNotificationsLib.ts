import config from "../config";

// Will use when apple allows push notifications
export function displayNotification() {
    if (Notification.permission == 'granted' && config.env == "prod") {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            var options = {
                body: 'Here is a notification body!',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                }
            };
            reg!.showNotification('Hello world!', options);
        });
    }
}

export function requestNotificationPermission() {
    Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status);
    });
    displayNotification();
}