import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native'


export default class NotDevice extends Component {
	static navigationOptions = ({ navigation, screenProps }) => {
		const { state, goBack } = navigation;
		return {
			headerLeft: <TouchableHighlight style={{ flex: 1, paddingLeft: 5,justifyContent: 'center', alignItems: 'center' }} onPress={() => { goBack() }}>
				<Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.back}</Text>
			</TouchableHighlight>
		}
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ padding: 30,backgroundColor: 'transparent', }}>
					<Text style={styles.text}>{'Đảm bảo thiết bị còn năng lượng, đã bật sóng liên kết và ở gần bạn. \n '
						+'Nếu bạn vừa kết nối thiết bị, hãy đợi một lát, có thể thiết bị đang kết nối. \n '
						+'Hãy kiểm tra thiết bị di động của bạn có vấn đề gì về sóng liên kết không. \n '
						+'Nếu bạn vẫn gặp sự cố, hãy tham khảo hướng dẫn của nhà sản xuất phụ kiện hoặc gọi nhân viên hỗ trợ.'}
					</Text>
				</View>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	text: {
		paddingTop: 30,
		fontSize: 18,
	}
});