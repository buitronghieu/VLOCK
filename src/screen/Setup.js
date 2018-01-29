import React, { Component } from 'react';
import {
    View, 
    Text, 
    ScrollView, 
    TouchableHighlight, 
    Image, 
    AsyncStorage, 
    StyleSheet,
    NativeModules,
    NativeEventEmitter
} from 'react-native';
import {
    updateLogin
} from '../actions'
import { Style } from '../style/Style';
import { connect } from 'react-redux';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
class Setup extends Component {
    _onLogin() {
        if (this.props.isLogin) {
            this.props.navigation.navigate('Profile');
        } else {
            this.props.navigation.navigate('SingIn');
        }
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingTop: 10 }}>
                    <View style={styles.row}>
                        <Image source={require('../image/thongtinxe.png')} resizeMode='contain' style={styles.image} />
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                this.props.navigation.navigate('InfomationVehicle')
                            }}
                        >
                            <View style={[Style.row, { borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }]}>
                                <Text >{this.props.screenProps.infomationVehicle}</Text>
                                <Image style={Style.img} source={require('../image/arrow_right/green.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.row}>
                        <Image source={require('../image/timthietbi.png')} resizeMode='contain' style={styles.image} />
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => { this.props.navigation.navigate('FindDevice') }}>
                            <View style={[Style.row, { borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }]}>
                                <Text >{this.props.screenProps.finddevice}</Text>
                                <Image style={Style.img} source={require('../image/arrow_right/green.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.row}>
                        <Image source={require('../image/cauhinh.png')} resizeMode='contain' style={styles.image} />
                        <TouchableHighlight
                            underlayColor='transparent' style={styles.button}
                            onPress={() => { this.props.navigation.navigate('ConfigBlackBox') }}>
                            <View style={[Style.row, { borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }]}>
                                <Text >{this.props.screenProps.configBlackBox}</Text>
                                <Image style={Style.img} source={require('../image/arrow_right/green.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.row}>
                        <Image source={require('../image/ngonngu.png')} resizeMode='contain' style={styles.image} />
                        <TouchableHighlight
                            style={{ borderBottomWidth: 0.5, flex: 1, borderBottomColor: '#f5f5f5' }}
                            onPress={() => { this.props.navigation.navigate("Language") }}>
                            <View style={[Style.row, { borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }]}>
                                <Text>{this.props.screenProps.language}</Text>
                                <Image style={Style.img} source={require('../image/arrow_right/green.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <View style={styles.row}>
                        <Image source={require('../image/gioi-thieu-cong-ty.png')} resizeMode='contain' style={styles.image} />
                        <TouchableHighlight
                            style={{ borderBottomWidth: 0.5, flex: 1, borderBottomColor: '#f5f5f5' }}
                            onPress={() => { this.props.navigation.navigate('Company') }}>
                            <View style={[Style.row, { borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }]}>
                                <Text>{this.props.screenProps.company}</Text>
                                <Image style={Style.img} source={require('../image/arrow_right/green.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.row}>
                        <Image source={require('../image/check/red.png')} resizeMode='contain' style={styles.image} />
                        <TouchableHighlight
                            style={{ borderBottomWidth: 0.5, flex: 1, borderBottomColor: '#f5f5f5' }}
                            onPress={() => { this.props.navigation.navigate('Termsofuse') }}>
                            <View style={[Style.row, { borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }]}>
                                <Text>{this.props.screenProps.termsofuse}</Text>
                                <Image style={Style.img} source={require('../image/arrow_right/green.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 10 }}>
                    <View style={styles.row}>
                        <Image source={require('../image/dangnhap.png')} resizeMode='contain' style={styles.image} />
                        <TouchableHighlight
                            style={{ borderBottomWidth: 0.5, flex: 1, borderBottomColor: '#f5f5f5' }}
                            onPress={() => this._onLogin()}
                        >
                            <View style={[Style.row, { borderBottomWidth: 1, borderBottomColor: '#f2f2f2' }]}>
                                <Text>{this.props.isLogin ? this.props.screenProps.profile : this.props.screenProps.login}</Text>
                                <Image style={Style.img} source={require('../image/arrow_right/green.png')} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const mapStatetoProps = (state) => {
    return {
        isLogin: state.reduce.isLogin,
    }
};
export default connect(mapStatetoProps)(Setup);

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 28,
        height: 28,
        tintColor: '#c10b3b',
        marginLeft: 10
    },
    button: {
        borderBottomWidth: 0.5,
        flex: 1,
        borderBottomColor: '#f5f5f5',
        marginLeft: 10
    }
}) 