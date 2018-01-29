'use strict';
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	TextInput,
	TouchableHighlight,
	BackAndroid,
	Modal,
	Keyboard,
	TouchableWithoutFeedback
} from 'react-native';
import {Style} from '../style/Style';
import Util from '../util/Utils';

export default class ForgotPassword extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: null,
			label: null,
			modalVisible: false,
			disabled: false
		}
	}
	doSentMessage(){
		this.setState({disabled: true})
		try{
			if(this.state.username !== null){
					fetch(Util.APP_AUTHEN_SERVER, {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							method: 'm_reset_password',
							params : {
								authen: this.state.username
							}
						})	
						}).then((response) => response.json())
					.then((responseData) => {
						console.log(responseData);
							if(responseData.status){
								this.setState({
									modalVisible: true,
									label: responseData.message,
								})
							}else{
								this.setState({
									modalVisible: true,
									label: "Tài khoản không hợp lệ!"
								})
							}
						}).catch((ex) =>{
							console.log(ex);
                            this.setState({
                                label: "Kiểm tra lại kết nối mạng!",
                                modalVisible: true,
                            })
                        });
			}else{
				this.setState({modalVisible: true, label: "Không được nhập trống"})
			}
			}catch(error){
				console.log(error)
			}
	}

	render(){
		return(
			<TouchableWithoutFeedback style= {{ flex:1}} onPress={() => {Keyboard.dismiss()}}>
			<View style={styles.layout}>
			<Image source={require('../image/logo.png')} style={styles.logo} />
			<TextInput style={styles.input}
			underlineColorAndroid='transparent'
			onChangeText={(value) => this.setState({username:value})}
			placeholder={'Email / Số điện thoại'}
			placeholderTextColor='#c6c6c6'/>
			<View style={{flexDirection:'row', margin: 10}}>
			<TouchableHighlight style={[Style.button,{backgroundColor:'#c64e4f',borderRadius:10}]}
			underlayColor='transparent'
			onPress={() => {this.props.navigation.goBack()}}>
			<Text style={{color:'#ffffff',fontSize:18,}}>Quay lại</Text>
			</TouchableHighlight>
			<TouchableHighlight style={[Style.button,{backgroundColor:'#c64e4f',borderRadius:10}]}
			underlayColor='transparent'
			disabled={this.state.disabled}
			onPress={() => this.doSentMessage()}>
			<Text style={{color:'#ffffff',fontSize:18,}}>Gửi yêu cầu</Text>
			</TouchableHighlight>
			</View>
			<View style={Style.copyright}>
			<Text style={Style.copyrightText}>
			Copyright © 2014-2016 VIET TECHNOLOGY AND SOFTWARE DEVELOPMENT JSC
			</Text>
			</View>
			<Modal transparent={true} position={"center"} 
			visible={this.state.modalVisible}
			animationType={"slide"}
			onRequestClose={() => {}}>
			<View style={Style.modalbox}>
			<View style={Style.innerContainer}>
			<Text style={Style.modalTitle}>{this.state.label}</Text>
			<View style={{flexDirection:'row'}}>
			<TouchableHighlight
			style={Style.button}
			onPress={() => {
				this.setState({
					modalVisible: false,
					disabled: false
				})
			}}>
			<Text style={Style.buttonText}>Đồng ý</Text>
			</TouchableHighlight>
			</View>
			</View>
			</View>
			</Modal>
			</View>
			</TouchableWithoutFeedback>
			);
	}
}

var styles = StyleSheet.create({
	layout : {
		flex:1,
		alignSelf:'stretch',
		backgroundColor:'#ffffff',
		alignItems:'center',
		paddingLeft:20,
		paddingRight:20
	},
		logo : {
		width:200,
		height:83,
		marginTop:50,
		marginBottom:30
	},
	input : {
		height:36,
		alignSelf:'stretch',
		backgroundColor:'transparent',
		borderWidth:0.5,
		borderColor:'#c6c6c6',
		borderRadius:8,
		paddingLeft:5,
		paddingRight:5
	},
	checkbox : {
		borderRadius:5,
		borderWidth:1,
		borderColor:'#6d6b6b',
		marginTop:10
	},
	button : {
		flex:1,
		height: 40,
		backgroundColor:'#c64e4f',
		borderRadius:10,
		alignSelf:'stretch',
		justifyContent:'center',
		alignItems:'center',
		marginLeft: 5,
		marginRight: 5
	},
	buttonText : {
		color:'#ffffff',
		fontSize:18,
	}
});