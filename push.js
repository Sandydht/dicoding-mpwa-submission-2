const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BNOhyq2oZIQbBqsvQWaB8YdPvJmZWqlE5ALppo803LVLYerl5oIHItCI4yZS_7qCGpqWFWN9K22IuB0FrgyvjfQ",
    "privateKey": "spw38--S62BiYM_GaNt3J49zrKjMWEKNNp-N2fGs-K4"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dV9VbQ0osZQ:APA91bHlM7Br7QXi1jC6lOyqweBfiA57vUqlRI4GcE-H1pNQhAh7rIT2LMWkdJokJoNxf7UnCiFJnD2ulcVG-v3OuopaH1MtMXjKqJyKl1midYJeJ9eZrH7LlY2GhV5gRrr5sVv_PgS1",
    "keys": {
        "p256dh": "BGMtPOdbyomiMSE8SR8Zvkn8nLqjzX51sLTq7XsCwv8XqHNfONN4kBHoTVPrpmNBT6FQwJ8/JPncsSA/QW2EMqk=",
        "auth": "6lovHyXm75XQCUacpU0WTQ=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '308840371031',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);