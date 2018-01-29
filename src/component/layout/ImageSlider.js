'use strict';
import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableHighlight
} from 'react-native';
import {Style}  from './style'
const leftImg = require('../image/arrow_left/green.png');
const rightImg = require('../image/arrow_right/green.png');
const images = [
require('../image/sample/1000cc.png'),
require('../image/sample/125cc.png'),
require('../image/sample/cup50.png'),
require('../image/sample/honda.png'),
require('../image/sample/pcx.png'),
require('../image/sample/vespa.png')
]

export default class  ImageSlider extends Component{
	constructor(props){
		super(props);
		var valueDefault = this.props.valueDefault;
		this.state = {
			valueDefault
		}
	}

	render(){
		return(
			<View style={{flex:1, flexDirection:'row'}}>
				<TouchableHighlight
					style={{width: 50, paddingTop: 20, paddingBottom: 20}}
					underlayColor='transparent'
					onPress={() => {
						var position = images.indexOf(this.state.valueDefault)
						if(position === 0){
							position = images.length - 1
						} else {
							position = position - 1;
						}
						var temp = images[position];
						this.setState({
							valueDefault: temp
						})
						this.props.onChange(temp)
					}}>
					<Image source={leftImg} style={{tintColor:'#c10b3b',flex:1, width: 30, height: 30}} resizeMode='contain'/>
				</TouchableHighlight>
			    <Image style={{flex:1, width: undefined, height: undefined}} resizeMode='contain' source={this.state.valueDefault} />
				<TouchableHighlight
					style={{width: 50, paddingTop: 20, paddingBottom: 20}}
					underlayColor='transparent'
					onPress={() => {
						var position = images.indexOf(this.state.valueDefault)
						if(position === images.length -1){
							position = 0;
						} else {
							position = position + 1;
						}
						var temp = images[position];
						this.setState({
							valueDefault: temp
						})
						this.props.onChange(temp)
					}}>
					<Image source={rightImg} resizeMode='contain' style={{tintColor:'#c10b3b',flex:1, width: 30, height: 30}}/>
				</TouchableHighlight>

			  	
			</View>
		);
	}
}


