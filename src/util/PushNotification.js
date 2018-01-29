import React from 'react';
import { AsyncStorage } from 'react-native';
import FCM from 'react-native-fcm';

export default class PushNotification {
    static scheduleLocalNotification(date, type, notification) {
        FCM.scheduleLocalNotification({
            fire_date: date,      //RN's converter is used, accept epoch time and whatever that converter supports 
            id: type,    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other 
            body: notification,
            show_in_foreground: true
        })
    }

    static removeNotification(id) {
        FCM.removeDeliveredNotification(id)
    }

    static newNofification(key, date, value, newNofification) {
        var nowDate = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setMilliseconds(0);
        var startDate = new Date(date);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setMilliseconds(0);
        while (nowDate.getTime() > startDate.getTime()) {
            startDate.setDate(startDate.getDate() + value);
        }

    }

    static updateNotification(key, value, body) {
        AsyncStorage.setItem(key, JSON.stringify(value));
        var oneday = 1000 * 60 * 60 * 24;
        var date = value.date + value.value * oneday;
        this.scheduleLocalNotification(date, key, body);
    }

}