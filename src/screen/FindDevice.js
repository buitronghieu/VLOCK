import React, { Component } from 'react';
import {
	ScrollView,
	ListView,
	TouchableHighlight,
	Image,
	StyleSheet,
	View,
	Text,
	AsyncStorage,
	Button
} from 'react-native';
import {
	updatePeripheral,
	updateConnectDevice,
	updateInstanceId
} from '../actions'
import { connect } from 'react-redux';
import BleManager from 'react-native-ble-manager';
import BleConfig from '../util/BleConfig';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class FindDevice extends Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const { state, goBack } = navigation;
		return {
			headerLeft: <TouchableHighlight style={{ flex: 1, paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => { goBack() }}>
				<Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.back}</Text>
			</TouchableHighlight>
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			isConnect: false
		}

	}

	onNotDevice() {
		this.props.navigation.navigate('NotDevice');
	}
	onStart(property) {
		BleManager.connect(property.id)
			.then(() => {
				AsyncStorage.setItem("peripheral", JSON.stringify(property.id));
				AsyncStorage.setItem("instanceID", JSON.stringify(property.instanceID));
				store.dispatch(updateInstanceId(property.instanceID));
				this.props.navigation.navigate("Home");
			}).catch((error) => {
				console.log(error);
			});
	}

	_renderRow(property) {
		var text = "";
		if (this.props.peripheralId != null && this.props.peripheralId === property.id && this.props.isConnect) {
			text = "Đã kết nối";
		} else {
			text = "Không kết nối";
		}
		return (
			<TouchableHighlight style={styles.button}
				underlayColor='#d37878' onPress={() => this.onStart(property)}>
				<View style={{ flex: 1, flexDirection: "row", justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.buttonText}>{(property.instanceID === undefined || property.instanceID === null) ? property.id : property.instanceID}</Text>
					<Text style={styles.buttonText1}>
						{text}
					</Text>
				</View>
			</TouchableHighlight>
		);
	}
	render() {
		return (
			<View style={{ flex: 1, flexDirection: "column" }}>
				<View style={[styles.container,{backgroundColor: 'transparent',}]}>
					<Text style={styles.text1}>Thêm thiết bị </Text>
					<Text style={styles.text2}>Đảm bảo thiết bị còn năng lượng, đã bật sóng liên kết và ở gần bạn</Text>
				</View>
				<ScrollView style={{ flex: 1 }}>
					<ListView
						dataSource={this.props.dataSource}
						enableEmptySections={true}
						renderRow={(item) => this._renderRow(item)}
					/>

				</ScrollView>
				<View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={styles.text3} onPress={() => this.onNotDevice()}>Thiết bị không hiển thị ở đây? </Text>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		top: 40,
		marginLeft: 30,
		marginRight: 30,
		height: 150
	},
	text1: {
		fontWeight: 'bold',
		fontSize: 22,
	},
	text2: {
		top: 20,
		fontSize: 18,
	},
	findDevice: {
		flex: 1
	},
	text3: {
		color: '#c64e4f',
		fontSize: 14,
		textAlign: 'center',
	},
	button: {
		height: 50,
		backgroundColor: '#c64e4f',
		alignSelf: 'stretch',
		alignItems: 'center',
		marginTop: 1,
		marginBottom: 1,

	},
	button1: {
		height: 36,
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#c64e4f',
		justifyContent: 'center',
		borderRadius: 10,
		margin: 10
	},
	buttonText: {
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0)',
		fontSize: 16,
		marginLeft: 30,
		flex: 1,
	},
	buttonText1: {
		marginLeft: 15,
		marginRight: 10,
		color: 'white',
		backgroundColor: 'rgba(0,0,0,0)',
		fontSize: 16,
		flex: 1,
	},
	textButton: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	}
});

const mapStatetoProps = (state) => {
	return {
		isConnect: state.reduce.isConnect,
		dataSource: ds.cloneWithRows(Array.from(state.reduce.peripherals.values())),
		peripheralId: state.reduce.peripheralId

	}
};
export default connect(mapStatetoProps)(FindDevice);