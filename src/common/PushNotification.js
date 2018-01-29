import React, { Component } from 'react';
import {
	AsyncStorage,
	PermissionsAndroid,
	Platform,
	NativeAppEventEmitter,
	NativeEventEmitter,
	NativeModules,
	Linking,
} from 'react-native';
import { connect } from 'react-redux';
import {
	updateFirebase
} from '../actions'
import PushNotifi from '../util/PushNotification'

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import Util from '../util/Utils';
class PushNotification extends Component {
	componentDidMount() {
		FCM.requestPermissions(); // for iOS
		FCM.getFCMToken().then(token => {
			store.dispatch(updateFirebase(token));
		});
		this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
			if (notif.local_notification) {
				return;
			}
			if (notif.opened_from_tray) {
				FCM.getBadgeNumber().then(number=>{
				FCM.setBadgeNumber(number-1);
			});
				if(notif.aps !== undefined){
				const alert = notif.aps.alert;
				const link = alert.substring(alert.indexOf("https://www.google.com/maps/"), alert.length);
				Linking.openURL(link).then(() => {
					console.log("SentURL success!")
				})
					.catch((err) => {
						// handle error 
						console.log("Error");
					});
				}
				return;
			}
			FCM.getBadgeNumber().then(number=>{
				FCM.setBadgeNumber(number+1);
			}); 
			if (Platform.OS === 'ios') {
				switch (notif._notificationType) {
					case NotificationType.Remote:
						notif.finish(RemoteNotificationResult.NewData)
						break;
					case NotificationType.NotificationResponse:
						notif.finish();
						break;
					case NotificationType.WillPresent:
						notif.finish(WillPresentNotificationResult.All)
						break;
				}
			}
			this.showLocalNotification(notif);
		});
		this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
			this.saveToken(token);

			// fcm token may not be available on first load, catch it here
		});
	}


	showLocalNotification(notif) {
		if (Platform.OS === 'ios') {
			if (notif && notif.notification)
				FCM.presentLocalNotification({
					title: notif.notification.title,
					body: notif.notification.body,
					priority: "high",
					click_action: notif.click_action,
					show_in_foreground: true,
				});
		} else {
			FCM.presentLocalNotification({
				title: notif.fcm.title,
				body: notif.fcm.body,
				priority: "high",
				click_action: notif.click_action,
				show_in_foreground: true,
			});
		}
	}
	async saveToken(token) {
		try {
			fetch(Util.APP_AUTHEN_SERVER, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					method: 'm_firebase_change_token',
					params: {
						clientid: this.props.clientId,
						firebase_token: token
					}
				})
			}).then((response) => response.json())
				.then((responseData) => {
				}).done();
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return null;
	}
}

const mapStatetoProps = (state) => {
	return {
		firebase_token: state.reduce.firebase_token,
		clientId: state.reduce.clientId,
		oil: state.reduce.oil,
		brake: state.reduce.brake,
		tire: state.reduce.tire,
		acquy: state.reduce.acquy,
		all: state.reduce.all
	}
};
export default connect(mapStatetoProps)(PushNotification);