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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dxvV3K5PbjI:APA91bGHdUq3x7syr0z3O7UUvU2kIXF6FH_jQ7Fya1BG2fhBRDsX4vmXkX3JYsHtqr_JBu2R4zYYcy2SKkGDQYKMGe2qGfmGrfJjKml8WDxpa4hZiiz3qfpPtQUXtf4xENzfcN8xIOUs",
    "keys": {
        "p256dh": "BLYCuiAcVPMwczf5Znq6o18PNS1UC01djfVzliJ7OLHKhdMmycE9JFOTgmo0NUrNdobEKZy72OG7FRi1nRWj9jw=",
        "auth": "Jq2ZjxQZjqSGXPXhur8ncA=="
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