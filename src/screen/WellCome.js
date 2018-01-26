import React , {PureComponent}from 'react';
import {View, ImageBackground, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

@connect(mapStateProps = (state)=>{
    return {
        loading: state.local.loading
    }
})
export default class WellCome extends PureComponent{

    render(){
        <View style = {{flex:1}}>
            <ImageBackground source={require('../images/background.png')} style={{flex:1}}>
                <ActivityIndicator 
                    animating={this.state.loading}
                    color=''
                    size="large"
                    
                />
            </ImageBackground>
        </View>
    }
}