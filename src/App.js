
import React, { Component } from 'react';
import {
	View,
	StatusBar,
	AsyncStorage,
} from 'react-native';
import { AppStack } from './Router';
import { connect } from 'react-redux';
import {
	updateLanguage,
	updatePeripheralId,
	updatePersonal,
	updateConnectDevice,
	updatePinBlackbox,
	updatePinRFID,
	updateLogin,
	updateUserName,
	updateOil,
	updateBrake,
	updateTire,
	updateAcquy,
	updateAll,
	updateToken,
	updateFirebase,
	updateNotification,
	updateInstanceId,
	updateAppFirst,
	updateAppFirstLogin
} from './actions'
import PushNotification from './common/PushNotification';
import BleManagerClass from './common/bleManager'
import Util from './util/Utils';
import PushNotifi from './util/PushNotification';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadMain: false
		}
	}

	componentWillMount() {
		store.dispatch(updateLanguage('vi'));
		this.getAsync();
		// AsyncStorage.removeItem('peripheral');
		// AsyncStorage.removeItem('instanceID');
		// AsyncStorage.removeItem('notification');
	}

	async getAsync() {
		try {
			let keys = await AsyncStorage.getAllKeys();
			await AsyncStorage.multiGet(keys, (err, storages) => {
				storages.map((result, i, storage) => {
					// get at each store's key/value so you can work with it
					let key = storage[i][0];
					let value = storage[i][1];
					switch (key) {
						case "appFirst": {
							const appFirst = JSON.parse(value);
							store.dispatch(updateAppFirst(appFirst));
							break;
						}
						case "appFirstLogin": {
							const appFirstLogin = JSON.parse(value);
							store.dispatch(updateAppFirstLogin(appFirstLogin));
							break;
						}
						case "language": {
							const language = JSON.parse(value);
							store.dispatch(updateLanguage(language));
							break;
						}
						case 'personal': {
							const personal = JSON.parse(value);
							store.dispatch(updatePersonal(personal));
							break;
						}
						case 'peripheral': {
							const peripheral = JSON.parse(value);
							store.dispatch(updatePeripheralId(peripheral));
							break;
						}
						case 'instanceID': {
							const instanceID = JSON.parse(value);
							store.dispatch(updateInstanceId(instanceID));
							break;
						}
						case 'pinBlackbox': {
							const pinBlackbox = JSON.parse(value);
							store.dispatch(updatePinBlackbox(pinBlackbox));
							break;
						}
						case 'pinRFID': {
							const pinRFID = JSON.parse(value);
							store.dispatch(updatePinRFID(pinRFID));
							break;
						}
						case 'username': {
							const username = JSON.parse(value);
							store.dispatch(updateUserName(username));
							break;
						}
						case 'oil': {
							const oil = JSON.parse(value);
							store.dispatch(updateOil(oil));
							break;
						}
						case 'brake': {
							const brake = JSON.parse(value);
							store.dispatch(updateBrake(brake));
							break;
						}
						case 'tire': {
							const tire = JSON.parse(value);
							store.dispatch(updateTire(tire));
							break;
						}
						case 'acquy': {
							const acquy = JSON.parse(value);
							store.dispatch(updateAcquy(acquy));
							break;
						}
						case 'all': {
							const all = JSON.parse(value);
							store.dispatch(updateAll(all));
							break;
						}
						case 'notification': {
							const notification = JSON.parse(value);
							store.dispatch(updateNotification(notification));
							break;
						}
						case 'token': {
							const token = JSON.parse(value);
							fetch(Util.APP_AUTHEN_SERVER, {
								method: 'POST',
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									method: 'm_login',
									params: {
										clientid: this.props.clientId,
										token
									}
								})
							}).then((response) => response.json())
								.then((responseData) => {
									if (responseData.status) {
										AsyncStorage.setItem("token", JSON.stringify(responseData.token))
										store.dispatch(updateToken(responseData.token));
										store.dispatch(updateLogin(true));
									}
								}).catch((err) => {
									console.log(err);
								});
							break;
						}
					}
				});
			});
			this.setState({ loadMain: true })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (this.state.loadMain) {
			return (
				<View style={{ flex: 1 }}>
					<StatusBar barStyle="light-content" />
					<AppStack screenProps={this.props.language} />
					<PushNotification />
					<BleManagerClass />
				</View>
			);
		}
		return null;
	}

}
const mapStatetoProps = (state) => {
	return {
		clientId: state.reduce.clientId,
		language: state.reduce.stringLanguage
	}
};
export default connect(mapStatetoProps)(App);
