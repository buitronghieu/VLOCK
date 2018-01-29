import React,{Component} from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';

export default class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.state = {
			width:100
		}
    }
    render(){
        var progress = this.props.progress;
        var progressWidth = this.state.width * progress;
        return(
             <View style={{height:8,backgroundColor:'#b9b9b9',borderRadius:4}}
				onLayout={(event) => {
	  				var {x, y, width, height} = event.nativeEvent.layout;
	  				if(this.state.width != width){
	  					this.setState({width:width});
	  				}
	  			}}>
				<View style={{width:progressWidth,height:8,backgroundColor:this.props.color, borderRadius:4}} />
			</View>   
        );
    }
}