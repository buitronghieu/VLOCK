import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight, Modal} from 'react-native';
import ProgressBar from './Propgress_bar';
import { connect } from 'react-redux';
import PushNotification from '../../util/PushNotification';
import { StyleCondition, Style } from '../../style/Style';
import {
    updateOil,
    updateBrake,
    updateTire,
    updateAcquy,
    updateAll
} from '../../actions'
class Maintenance extends Component {

	constructor(props) {
		super(props);
		this.state = {
            modalVisible: false,
            label: ""
        }

	}
	onClick(){
		if(this.value.date !==null){
					var nowDate = new Date();
        nowDate.setHours(7);
        nowDate.setMinutes(0);
        nowDate.setMilliseconds(0);
		var value= {
			...this.props[this.props.keyLoad],
			date:nowDate.getTime()
		};
		switch (this.props.keyLoad) {
			case 'oil':
				 store.dispatch(updateOil(value));
				break;
			case 'brake':
				 store.dispatch(updateBrake(value));
				break;
				case 'tire':
				 store.dispatch(updateTire(value));
				break;

				case 'acquy':
				 store.dispatch(updateAcquy(tire));
				break;
				case 'all':
				 store.dispatch(updateAll(value));
				break;
			default:
				break;
		}
			PushNotification.updateNotification(this.props.keyLoad,value,"Hôm nay cần "+ this.props.text);
		}else{
			this.props.navigation.navigate('InfomationVehicle');
		}
		this.setState({
			modalVisible:false,
		});
	}
	onShowModal(){
		if(this.value.date !== null){
			this.setState({
			modalVisible:true,
			label: "Bạn đã "+this.props.text+"? Reset lại thời gian?"
		});
		}else{
			this.setState({
			modalVisible:true,
			label: "Bạn chưa điền thông tin ngày bảo dưỡng, vào màn hình cài đặt?"
		});
		}
	}

	render() {
		this.value= this.props[this.props.keyLoad];
		var color = "#c10b3b";
		var percent = 1;
		var maintenance = "!";
		var strMaintenance = "Cấu hình";
		var nowDate = new Date();
		if(this.value.date !== null){
			var startDate = new Date(this.value.date);
			var endDate = startDate.setDate(startDate.getDate() + this.value.value);
			var oneday = 1000 * 60 * 60 * 24;
			var a = Math.round((endDate - nowDate.getTime()) / oneday);
			if(a >0){
				percent = 1 - Math.round((a / this.value.value) * 10 / 10);
				maintenance = a;
				strMaintenance = "Còn" + a +" ngày";
				if(a >= 3){
					color = "#19c60a";
				}
			}else if(a ==0){
				maintenance  = a;
				strMaintenance = "Hôm nay cần bảo dưỡng";
			}else{
				strMaintenance = "Quá hạn";
			}
		}
		return (
			<View style={{flex:1}}>
			<TouchableHighlight style={{flex:1}} onPress={()=>this.onShowModal()}>
			<View style={styles.row}>
				<View style={styles.rowTop}>
					<Text style={styles.text1}>{this.props.text.toUpperCase()}</Text>
				</View>
				<View style={styles.rowBottom}>
					<Image source={this.props.image} resizeMode='contain'/>
					<View style={{ backgroundColor: 'transparent',flex: 1, paddingLeft: 10,flexDirection: "column", justifyContent: "center" }}>
						<Text style={[{ color: color, paddingBottom:5 }, styles.text3]}>{strMaintenance}</Text>
						<ProgressBar progress={percent} color={color} />
					</View>
					<View style={{ width: 70,backgroundColor: 'transparent', justifyContent: 'center', alignItems:'center' }}>
						<Text style={[{ color: color }, styles.text2]}>{maintenance}</Text>
					</View>
				</View>
			</View>
			</TouchableHighlight>
                <Modal transparent={true} position={"center"}
                    visible={this.state.modalVisible}
                    animationType={"slide"}
                    onRequestClose={() => {}}>
                    <View style={Style.modalbox}>
                        <View style={Style.innerContainer}>
                            <Text >{this.state.label}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableHighlight
                                    style={Style.button}
                                    onPress={() => {this.setState({modalVisible: false})}}>
                                    <Text style={Style.buttonText}>Huỷ</Text>
                                </TouchableHighlight>
								<TouchableHighlight
                                    style={Style.button}
                                    onPress={() => this.onClick()}>
                                    <Text style={Style.buttonText}>Đồng ý </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
			</View>
		);
	}
}

const mapStatetoProps = (state) => {
    return {
        oil: state.reduce.oil,
        brake: state.reduce.brake,
        tire: state.reduce.tire,
        acquy: state.reduce.acquy,
        all: state.reduce.all
    }
};
export default connect(mapStatetoProps)(Maintenance);

var styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: '#f4f4f4',
		borderRadius: 10,
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowColor: 'black',
		shadowOpacity: 0.3,
	},
	rowTop: {
		backgroundColor: '#606668',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		
	},
	rowBottom: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: '#f4f4f4',
		padding: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	text1: {
		color: 'white',
		margin: 5,
		marginLeft: 10,
		fontSize: 18,
		backgroundColor: 'transparent'
	},
	text2: {
		textAlign: 'center',
		fontSize: 25,
		fontWeight: 'bold',
	},
	text3: {
		fontSize: 12
	},
	expiredTime: {
		width: 90,
		flexDirection: 'column',

	}

});