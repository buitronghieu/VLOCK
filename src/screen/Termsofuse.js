import React , {Component}from 'react';
import {WebView,TouchableHighlight, Text} from 'react-native';

export default class TermsofUse extends Component{
 static navigationOptions = ({navigation,screenProps }) => {
        const {goBack } = navigation;
        return {
            headerLeft: <TouchableHighlight style={{ flex: 1, paddingLeft: 5,justifyContent: 'center', alignItems: 'center' }} onPress={() => { goBack() }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.back}</Text>
            </TouchableHighlight>
        }
    }
    render(){

        return(
           <WebView 
           source={{uri: 'https://vlock.vity.com.vn/help.zul'}}
        style={{marginTop: 20}}/>
        );
    }
}