/**
 * Created by HungDang on 8/15/2017.
 */
'use strict';
import React, {Component} from 'react';

import {
    Image,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Alert,
    AsyncStorage
} from 'react-native';
import {
    DrawerNavigator,
    NavigationActions
} from 'react-navigation';
var ConfigUtil = require('../../common/ConfigUtil');
class SignUp extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: 'SignUp',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../../assets/logout.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render() {
        Alert.alert(
            'Vietek',
            'Bạn có muốn đăng xuất?',
            [
                {text: 'Cancel', onPress: () => this.onCancel(), style: 'cancel'},
                {text: 'OK', onPress: () => this.onOK()},
            ]
        )
        return null;
    }

    onCancel() {
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Main'}));
    }

    onOK() {
        AsyncStorage.getItem('teminal-token').then((teminalKey) => {
            fetch(ConfigUtil._getTrackingServerURL() + '/rest/terminal/logout/' + teminalKey, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json()).then((responseJson) => {
                if (responseJson.status) {
                    AsyncStorage.removeItem('teminal-token')
                    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Login'}));
                    navigation.navigate()
                }
            })
        })
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    }
});
module.exports = SignUp;