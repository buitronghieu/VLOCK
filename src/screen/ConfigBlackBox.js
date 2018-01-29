import React, { Component } from 'react';
import {
    View,
    Switch,
    Slider,
    Text,
    TouchableHighlight,
    Image,
    Modal,
    StyleSheet,
    Button,
    Platform,
    AsyncStorage
} from 'react-native';
import { StyleCondition, Style } from '../style/Style';
import BleManager from 'react-native-ble-manager';
import BleConfig from '../util/BleConfig';
import { connect } from 'react-redux';
import {
    updateConfigHorn,
    updateConfigLight,
    updateCollision
} from '../actions'
class ConfigBlackBox extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { state, goBack } = navigation;
        const { params } = state;
        return {
            headerLeft: <TouchableHighlight style={{ flex: 1, paddingLeft: 5,justifyContent: 'center', alignItems: 'center' }} onPress={() => { goBack() }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.back}</Text>
            </TouchableHighlight>,
            headerRight: <TouchableHighlight style={{ flex: 1, paddingRight: 5,justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                this.save();
                navigation.navigate("Setup");
            }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.save}</Text>
            </TouchableHighlight>
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            config_light: this.props.config_light,
            config_horn: this.props.config_horn,
            collision: this.props.collision
        }
        save = this.save.bind(this);
    }

    save() {
        if (this.props.isConnect) {
            let data = 0;
            if (this.state.config_light) {
                if (this.state.config_horn) {
                    data = 3;
                } else {
                    data = 1;
                }
            } else {
                if (this.state.config_horn) {
                    data = 2;
                }
            }

            if (this.props.config_light !== this.state.config_light || this.props.config_horn !== this.state.config_horn) {
                this.writeDevice(data);
                if (this.props.config_light !== this.state.config_light){
                    this.setAsync("config_light", this.state.config_light);
                    store.dispatch(updateConfigLight(this.state.config_light));
                }
                if (this.props.config_horn !== this.state.config_horn){
                    this.setAsync("config_horn", this.state.config_horn);
                    store.dispatch(updateConfigHorn(this.state.config_horn))
                }

            }
        }
    }

    onChange_Config_Light(value) {
        if (!this.state.config_horn && !value) {
            this.setState({ modalVisible: true });
        } else {
            this.setState({ config_light: value })
        }
    }
    onChange_Config_Horn(value) {
        if (!this.state.config_light && !value) {
            this.setState({ modalVisible: true });
        } else {
            this.setState({ config_horn: value })
        }
    }

    async setAsync(key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.log(err);
        }
    }

    writeDevice(data) {
        // const value = (2+ )
            BleManager.write(this.props.peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKIOCFG_CHARACTERISTIC, [data], 1).then(() => {
                // Success code 
                console.log('Write: ' + data);
            }).catch((error) => {
                // Failure code 
                console.log(error);
            });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "column", marginTop: 10, backgroundColor: "white" }}>
                    <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" }}>
                        <Image source={require('../image/lamp/red.png')} style={styles.smallIcon} />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Text style={{ marginLeft: 5 }}>Đèn </Text>
                        </View>
                        <Switch onTintColor='#46b914'
                            disabled={!this.props.isConnect}
                            value={this.state.config_light}
                            onValueChange={(value) => {
                                this.onChange_Config_Light(value);
                            }} />
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Image source={require('../image/horn/red.png')} style={styles.smallIcon} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginLeft: 5 }}>Còi </Text>
                        </View>
                        <Switch onTintColor='#46b914'
                            disabled={!this.props.isConnect}
                            value={this.state.config_horn}
                            onValueChange={(value) => {
                                this.onChange_Config_Horn(value);
                            }} />
                    </View>
                </View>
                <Modal transparent={true} position={"center"}
                    visible={this.state.modalVisible}
                    animationType={"slide"}
                    onRequestClose={() => {}}>
                    <View style={Style.modalbox}>
                        <View style={Style.innerContainer}>
                            <Text >Phải có đèn hoặc còi</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableHighlight
                                    style={Style.button}
                                    onPress={() => { this.setState({ modalVisible: false }) }}>
                                    <Text style={Style.buttonText}>Đồng ý </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

const mapStatetoProps = (state) => {
    console.log(state);
    return {
        peripheralId: state.reduce.peripheralId,
        isConnect: state.reduce.isConnect,
        config_light: state.reduce.config_light,
        config_horn: state.reduce.config_horn,
        collision: state.reduce.collision
    }
};
export default connect(mapStatetoProps)(ConfigBlackBox);
var styles = StyleSheet.create({
    layout: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
    },
    smallIcon: {
        width: 20,
        height: 20,
        alignItems: 'center'
    },
});