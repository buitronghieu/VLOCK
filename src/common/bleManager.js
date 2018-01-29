'use strict'
import React, { Component } from 'react';
import {
    AsyncStorage,
    PermissionsAndroid,
    Platform,
    NativeAppEventEmitter,
    NativeEventEmitter,
    NativeModules,
    Modal,
    Text,
    TouchableHighlight,
    View,
    Linking,
    AppState
} from 'react-native';
import { connect } from 'react-redux';
import {
    updatePeripherals,
    updatePeripheralId,
    updateConnectDevice,
    updatePinRFID,
    updatePinBlackbox,
    updateListKeyRFID,
    updateInstanceId,
    updateEnableBluetooth,
    updateAntiTheft,
    updateCollision,
    updateConfigLight,
    updateConfigHorn,
    updateScan
} from '../actions'
import BleManager from 'react-native-ble-manager';
import BleConfig from '../util/BleConfig';
import Util from '../util/Utils';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
import { StyleCondition, Style } from '../style/Style';
class BleManagerClass extends Component {
    constructor(props) {
        super(props);
        var _this = this;
        this.state = {
            keyRFID: null,
            instanceID: null,
            doSent: false,
            modalVisible: false,
            enableBlueTooth: true,
            peripheralIdDisconnect: null,
        }
        this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
        this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
        this.handleConnectPeripheral = this.handleConnectPeripheral.bind(this);
        this.handleStopScan = this.handleStopScan.bind(this);
        this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    }

    componentDidMount() {
        BleManager.start({ showAlert: false });
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log("User accept");
                        } else {
                            console.log("User refuse");
                        }
                    });
                }
            });
        }
        this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral);
        this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral);
        this.handlerConnect = bleManagerEmitter.addListener('BleManagerConnectPeripheral', this.handleConnectPeripheral);
        this.handlerStopScaner = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan);

        this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic);
        BleManager.checkState();
        bleManagerEmitter.addListener(
            'BleManagerDidUpdateState',
            (args) => {
                console.log(args);
                if (args.state === 'off') {
                    if (this.props.isScan)
                        BleManager.stopScan();
                    this.setState({ modalVisible: true, enableBlueTooth: false })
                } else if (args.state === 'on') {
                    this.setState({ modalVisible: false, enableBlueTooth: true });
                    this.scanBle();
                }

            }
        );
    }

    scanBle() {
        BleManager.scan([BleConfig.EDDYSTONE_SERVICE_UUID], 5, true).then((results) => {
            if (this.props.peripheralId !== null && !this.props.isConnect)
                BleManager.connect(this.props.peripheralId);
        });
    }

    handleStopScan() {
        if(!this.props.isConnect)
            this.scanBle();
    }

    handleDisconnectedPeripheral(data) {
        store.dispatch(updateConnectDevice(false))
        BleManager.connect(this.props.peripheralId);

    }
    handleUpdateValueForCharacteristic(data) {
        console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
    }
    async handleConnectPeripheral(data) {
        try {
            const peripheralId = data.peripheral;
            const peripheral = await BleManager.retrieveServices(peripheralId);
            store.dispatch(updatePeripheralId(peripheralId));
            store.dispatch(updateConnectDevice(true));
            // Lấy dung lượng acquy
            const pinBlackbox = await BleManager.read(peripheralId, BleConfig.BATTERY_SERVICE, BleConfig.BATTERY_LEVEL_CHARACTERISTIC);
            store.dispatch(updatePinBlackbox(pinBlackbox));
            AsyncStorage.setItem("pinBlackbox", JSON.stringify(pinBlackbox));
            // Lấy trạng thái chống dắt
            let isTheft = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.IDTAGAL_CHARACTERISTIC);
            isTheft = isTheft[0] === 1 ? true : false;
            store.dispatch(updateAntiTheft(isTheft));
            //Lấy mức va chạm
            const accConfig = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKIOCFG_CHARACTERISTIC);
            // store.dispatch(updateCollision((collision[1] << 8) * (24 / 32768)));
            // console.log(accConfig);
            // console.log(accConfig[0]<<6);
            const collision = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKACCCFG_CHARACTERISTIC);
            console.log((collision[1] << 8) * (6 / 32768));
            store.dispatch(updateCollision((collision[1] << 8) * (6 / 32768)));
            //Lấy cấu hình đèn/ còi
            let config = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKIOCFG_CHARACTERISTIC);
            let config_light = false;
            let config_horn = false;
            config = config[0];
            if (config === 3) {
                config_light = true;
                config_horn = true;
            } else if (config === 2) {
                config_light = false;
                config_horn = true;
            } else if (config === 1) {
                config_light = true;
                config_horn = false;
            }
            store.dispatch(updateConfigLight(config_light));
            store.dispatch(updateConfigHorn(config_horn));
            // lấy tất cả các key đã từng kết nối đến Lock 
            let listKeyUUID = new Map();
            let padlock0 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT0_CHARACTERISTIC)
            padlock0 = BleConfig.convertArraytoHex(padlock0);
            listKeyUUID.set(padlock0, padlock0);

            let padlock1 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT1_CHARACTERISTIC)
            padlock1 = BleConfig.convertArraytoHex(padlock1);
            listKeyUUID.set(padlock1, padlock1);

            let padlock2 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT2_CHARACTERISTIC)
            padlock2 = BleConfig.convertArraytoHex(padlock2);
            listKeyUUID.set(padlock2, padlock2);

            let padlock3 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT3_CHARACTERISTIC)
            padlock3 = BleConfig.convertArraytoHex(padlock0);
            listKeyUUID.set(padlock3, padlock3);

            let padlock4 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT4_CHARACTERISTIC)
            padlock4 = BleConfig.convertArraytoHex(padlock4);
            listKeyUUID.set(padlock4, padlock4);

            let padlock5 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT5_CHARACTERISTIC)
            padlock5 = BleConfig.convertArraytoHex(padlock5);
            listKeyUUID.set(padlock5, padlock5);

            let padlock6 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT6_CHARACTERISTIC)
            padlock6 = BleConfig.convertArraytoHex(padlock6);
            listKeyUUID.set(padlock6, padlock6);

            let padlock7 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT7_CHARACTERISTIC)
            padlock7 = BleConfig.convertArraytoHex(padlock7);
            listKeyUUID.set(padlock7, padlock7);

            let padlock8 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT8_CHARACTERISTIC)
            padlock8 = BleConfig.convertArraytoHex(padlock8);
            listKeyUUID.set(padlock8, padlock8);

            let padlock9 = await BleManager.read(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKCLIENT9_CHARACTERISTIC);
            padlock9 = BleConfig.convertArraytoHex(padlock9);
            listKeyUUID.set(padlock9, padlock9);

            store.dispatch(updateListKeyRFID(listKeyUUID));
            BleManager.write(peripheralId, BleConfig.MHPADLOCK, BleConfig.PADLOCKTM_CHARACTERISTIC, [0, 0], 2).then(() => {
                console.log("In thanh cong");
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleDiscoverPeripheral(peripheral) {
        console.log(peripheral);
        const data = Platform.OS === 'ios' ? peripheral.advertising.kCBAdvDataServiceData["FEAA"].bytes : peripheral.advertising.bytes.slice(11, 30);
        const eddy = BleConfig.validate(data);
        const strEddy = BleConfig.convertArraytoString(data.slice(2, 10));
        if (strEddy === "blemidt1") {
            if (this.props.listKeyUUID.has(eddy.instanceID) || this.props.listKeyUUID.has(BleConfig.reverseStr(eddy.instanceID))) {
                this.setState({
                    keyRFID: peripheral.id
                })
            }
        } else if (strEddy === "blemidt0") {
            if (peripheral.name !== undefined && peripheral.name !== null) {
                let peripherals = this.props.peripherals;
                peripheral.instanceID = eddy.instanceID;
                peripherals.set(peripheral.id, peripheral);
                store.dispatch(updatePeripherals(peripherals));
            }
        }
        if (peripheral.id === this.state.keyRFID && eddy.battery !== undefined) {
            store.dispatch(updatePinRFID(eddy.battery));
            AsyncStorage.setItem("pinRFID", JSON.stringify(eddy.battery));
        }
    }


    enableBlueTooth() {
        Platform.OS === 'ios' ? Linking.openURL("App-Prefs:root=Bluetooth") : BleManager.enableBluetooth();
        this.setState({ modalVisible: false });
    }
    render() {
        if (this.props.isFirst) {
            return (
                <Modal transparent={true} position={"center"}
                    visible={this.state.modalVisible}
                    animationType={"slide"}
                    onRequestClose={() => { }}>
                    <View style={Style.modalbox}>
                        <View style={Style.innerContainer}>
                            <Text style={{ padding: 20 }}>Bạn cần bật kết nối đến thiết bị để sử dụng chức năng tìm xe</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableHighlight
                                    style={[Style.button, { borderBottomLeftRadius: 5 }]}
                                    onPress={() => { this.setState({ modalVisible: false }) }}>
                                    <Text style={Style.buttonText}>Huỷ </Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={[Style.button, { borderBottomRightRadius: 5 }]}
                                    onPress={() => this.enableBlueTooth()}>
                                    <Text style={Style.buttonText}>Đồng ý </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        } else {
            return null;
        }
    }
}

const mapStatetoProps = (state) => {
    return {
        peripherals: state.reduce.peripherals,
        listKeyUUID: state.reduce.listKeyUUID,
        peripheralId: state.reduce.peripheralId,
        instanceID: state.reduce.instanceID,
        isConnect: state.reduce.isConnect,
        isScan: state.reduce.isScan,
        isFirst: state.reduce.isFirst
    }
};
export default connect(mapStatetoProps)(BleManagerClass);