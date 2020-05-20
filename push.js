const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BF4R0fTuHc1nIb52z8QHDnOZH2E7Co9RLv-znre5pZl_TDUQhXOsHK1NDNT_KNugGYkaoB1v9oz1DEGbwJ8hef0",
    "privateKey": "OX1Rij7d9SllgCl4YH5rRkCveUjh1RJJ7uyp4ClIdGk"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cjN2pWHNrME:APA91bG1ex15lERQIN9pC_u5BziFXJjvHQ9jxSlpPta1-F9OAOFvUER8RgC_CnziuJdFnPnpKy0xI7Hnk8q666WXI3Oktu9s6XNJxD7PZl8k4U1QizbT38tfWJ68bntaMO1lUjgGG6zt",
    "keys": {
        "p256dh": "BGdMRvlDgNAneI2tMtq+m5wwS9HP88KArlIJynHh00BZSTzwPebDkBD/ewquQBktjemxZC/iFkZDV+DUMLbeoJY=",
        "auth": "pEeAb050ZZMUqR1PN7cs1g=="
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