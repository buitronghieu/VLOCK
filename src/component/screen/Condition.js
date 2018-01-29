import React, { Component } from 'react';
import {
    ScrollView, View,
    Text,
    TouchableHighlight,
    Image,
    AsyncStorage,
    Modal,
    Platform,
    Linking
} from 'react-native';
import { StyleCondition, Style } from '../../style/Style';
import { connect } from 'react-redux';
import {
    updateAntiTheft,
    updateAppFirst,
    updateAppFirstLogin
} from '../../actions'
import BleConfig from '../../util/BleConfig';
import BleManager from 'react-native-ble-manager';
class Condition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            label: ""
        }
    }

    findDriver() {
        if (this.props.isConnect) {
            BleManager.writeWithoutResponse(this.props.peripheralId, BleConfig.MHPADLOCK, BleConfig.IDTAGBT_CHARACTERISTIC, [1], 1).then(() => {
                // Success code 
                console.log("WriteWithoutResponse Success!");
            }).catch((error) => {
                // Failure code 
                this.setState({
                    modalVisible: true,
                    label: "Bạn cần kết nối đến thiết bị để sử dụng chức năng này"
                })
                console.log("WriteWithoutResponse Error", error);
            });
        }
        else {
            this.setState({
                modalVisible: true,
                label: "Bạn cần kết nối đến thiết bị để sử dụng chức năng này"
            })
        }
    }

    ondisable() {
        if (this.props.isConnect) {
            if (this.props.anti_theft) {
                this.writeDisable(0, false);
            } else {
                this.writeDisable(1, true);
            }
        } else {
            this.setState({
                modalVisible: true,
                label: "Bạn cần kết nối đến thiết bị để sử dụng chức năng này"
            })
        }
    }

    writeDisable(data, anti_theft) {
        BleManager.write(this.props.peripheralId, BleConfig.MHPADLOCK, BleConfig.IDTAGAL_CHARACTERISTIC, [data], 1).then(() => {
            // Success code 
            store.dispatch(updateAntiTheft(anti_theft));

        }).catch((error) => {
            this.setState({
                modalVisible: true,
                label: "Bạn cần kết nối đến thiết bị để sử dụng chức năng này"
            })
            console.log("WriteWithoutResponse Error", error);
        });
    }
    ondisConnect(){
        Linking.openURL("App-Prefs:root=Bluetooth")
    }

    modalBox() {
        if (!this.props.isFirst) {
            return (
                <Modal transparent={true} position={"center"}
                    visible={!this.props.isFirst}
                    animationType={"slide"}
                    onRequestClose={() => { }}>
                    <View style={Style.modalbox}>
                        <View style={{ backgroundColor: 'white', flex: 1 }}>
                            <View style={{ height:150, borderBottomWidth: 0.5, borderBottomColor: '#dcdcdc' }}>
                                <Image style={{ flex: 1, width: undefined, height: 100 }} source={require('../image/ola.jpg')} resizeMode='contain' />
                            </View>
                            <ScrollView style={{ flex:1,margin: 20 }}>
                                <Text style={{ backgroundColor: 'transparent',paddingBottom: 10, fontSize: 11 }}>     Vietek xin giới thiệu đến các bạn một ứng dụng app dành chocho thiết bị chống trộm VLock Thông minh - Hoàn toàn mới của chúng tôi.</Text>
                                <Text style={{ backgroundColor: 'transparent',paddingBottom: 10, fontSize: 11 }}>     Ứng dụng này dùng để : tìm xe, kích hoạt chống trộm, chống dắt , bảo dưỡng xe... và đặc biệt còn có tính năng <Text style={{ color: 'red', fontWeight: 'bold' }}>CẢNH BÁO </Text>cho người thân khi xảy ra va chạm.</Text>
                                <Text style={{ backgroundColor: 'transparent',paddingBottom: 10, fontSize: 11 }}>     Người thân sẽ nhận được tin nhắn, email cảnh báo về vị trí, thời điểm của xe máy khi hệ thống ghi nhận có khả năng xa máy đã xảy ra va chạm mà chủ xe không kiểm soát được tai nạn đó.</Text>
                                <Text style={{ backgroundColor: 'transparent',fontSize: 11 }}>      Đọc thêm hướng dẫn và thực hiện để sử dụng <Text style={{ color: 'red', fontWeight: 'bold' }}>APP VLOCK</Text> một sản phẩm hoàn toàn mới.</Text>
                            </ScrollView>
                            <View style={{backgroundColor: 'white', height: 50, flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#dcdcdc' }}>
                                <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderRightColor: '#dcdcdc' }}
                                    onPress={() => { this.closeAppFirst() }}>
                                    <Text style={{ backgroundColor: 'transparent',fontWeight: 'bold', color: '#c10b3b', fontSize: 11 }}>ĐÓNG</Text>
                                </TouchableHighlight >
                                <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderRightColor: '#dcdcdc' }}
                                    onPress={() => { this.closeAppFirst() }}>
                                    <Text style={{ backgroundColor: 'transparent',fontWeight: 'bold', color: '#c10b3b', fontSize: 11 }}>HƯỚNG DẪN</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        this.props.navigation.navigate('FindDevice');
                                        this.closeAppFirst()
                                    }}>
                                    <Text style={{ backgroundColor: 'transparent',fontWeight: 'bold', color: '#c10b3b', fontSize: 11 }}>TÌM THIẾT BỊ</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        } else {
            if (!this.props.isFirstLogin) {
                return (
                    <Modal transparent={true} position={"center"}
                        visible={!this.props.isFirstLogin}
                        animationType={"slide"}
                        onRequestClose={() => { }}>
                        <View style={[Style.modalbox, {paddingTop: 60, paddingBottom:60}]}>
                            <View style={{ backgroundColor: 'white', flex: 1 }}>
                                <View style={{ height: 150,borderBottomColor: '#dcdcdc' }}>
                                    <Image style={{ flex: 1, width: undefined, height: 100 }} source={require('../image/thongbao.jpg')} resizeMode='contain' />
                                </View>
                                <ScrollView style={{flex:1, margin: 20 }}>
                                    <Text style={{ backgroundColor: 'transparent',paddingBottom: 10, fontSize: 11 }}>     Việc đăng ký thông báo va chạm cho người thân cần tài khoản Vietek của bạn.</Text>
                                    <Text style={{ backgroundColor: 'transparent',paddingBottom: 10, fontSize: 11 }}>     Sau khi đăng ký thành công bạn sẽ có thêm tính năng <Text style={{ color: 'red', fontWeight: 'bold' }}>CẢNH BÁO</Text> cho người thân khi xảy ra va chạm.</Text>
                                    <Text style={{ backgroundColor: 'transparent',paddingBottom: 10, fontSize: 11 }}>     Người thân sẽ nhận được tin nhắn, email cảnh báo về vị trí, thời điểm của xe máy khi hệ thống ghi nhận có khả năng xa máy đã xảy ra va chạm mà chủ xe không kiểm soát được tai nạn đó.</Text>
                                </ScrollView>
                                <View style={{ height: 50, flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: '#dcdcdc' }}>
                                    <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderRightColor: '#dcdcdc' }}
                                        onPress={() => { this.closeAppFirstLogin() }}>
                                        <Text style={{ backgroundColor: 'transparent',fontWeight: 'bold', color: '#c10b3b', fontSize: 11 }}>ĐÓNG</Text>
                                    </TouchableHighlight >
                                    <TouchableHighlight style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                        onPress={() => {
                                            this.props.navigation.navigate('SingIn');
                                            this.closeAppFirstLogin()
                                        }}>
                                        <Text style={{ backgroundColor: 'transparent',fontWeight: 'bold', color: '#c10b3b', fontSize: 11 }}>ĐĂNG NHẬP</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                );
            } else {
                return (
                    <Modal transparent={true} position={"center"}
                        visible={this.state.modalVisible}
                        animationType={"slide"}
                        onRequestClose={() => { }}>
                        <View style={Style.modalbox}>
                            <View style={Style.innerContainer}>
                                <Text style={{ backgroundColor: 'transparent',padding: 20 }}>{this.state.label}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <TouchableHighlight
                                        style={[Style.button, { borderBottomLeftRadius: 5 }]}
                                        onPress={() => { this.setState({ modalVisible: false }) }}>
                                        <Text style={[Style.buttonText,{backgroundColor: 'transparent',}]}>ĐÓNG</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={[Style.button, { borderBottomRightRadius: 5 }]}
                                        onPress={() => {
                                            this.props.navigation.navigate('FindDevice');
                                            this.setState({ modalVisible: false })
                                        }}>
                                        <Text style={[Style.buttonText,{backgroundColor: 'transparent',}]}>Đồng ý </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                );
            }
        }
    }

    closeAppFirst() {
        store.dispatch(updateAppFirst(true));
        AsyncStorage.setItem('appFirst', JSON.stringify(true));
    }
    
    closeAppFirstLogin(){
        store.dispatch(updateAppFirstLogin(true));
        AsyncStorage.setItem('appFirstLogin', JSON.stringify(true));
    }

    render() {
        return (
            <View style={[StyleCondition.contain]}>
                <TouchableHighlight style={{ flex: 3 }} onPress={() => { this.props.navigation.navigate('InfomationVehicle') }}>
                    <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row', paddingTop: 5, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}>
                        <Image style={{ flex: 3, width: undefined, height: undefined, paddingRight: 5 }} source={require('../image/avt.png')} resizeMode='contain' />
                        <View style={{ backgroundColor: 'transparent',flex: 5, flexDirection: 'column', paddingLeft: 10, paddingRight: 10, alignContent: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 12, color: '#c10b3b', fontWeight: 'bold' }}>{"CHỦ XE:" + this.props.personal.username.toUpperCase()}</Text>
                            <Text style={{ fontSize: 11 }}>{'Biển số: ' + this.props.personal.licensePlate.toString()}</Text>
                            <Text style={{ fontSize: 11 }}>{'Kiểu xe: ' + this.props.personal.motoType.toString()}</Text>
                        </View>
                        <View style={{ paddingTop: 30, paddingBottom: 30, flex: 1, }}>
                            <Image style={{ flex: 1, width: undefined, height: undefined, paddingRight: 5, tintColor: '#cecece' }} source={require('../image/right-arrow-button.png')} resizeMode='contain' />
                        </View>

                    </View>
                </TouchableHighlight>
                <Text style={{ fontSize: 10, paddingTop: 2, paddingBottom: 2, paddingLeft: 20, color: '#969292' }}>Tình trạng thiết bị</Text>
                <View style={{ flex: 4, backgroundColor: 'white', flexDirection: 'row', paddingBottom: 10, paddingRight: 20, paddingLeft: 20 }}>
                    <View style={{ flex: 3, flexDirection: 'column', paddingTop: 20 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                                <Image style={{ flex: 1, width: undefined, height: undefined, }} source={require('../image/RFID.png')} resizeMode='contain' />
                            </View>
                            <View style={{ backgroundColor: 'transparent',flex: 2, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <Text style={{ fontSize: 10, paddingBottom: 5 }}>Pin RFID key</Text>
                                <Text style={{ marginLeft: 10, color: '#25c10b', fontWeight: 'bold' }}>{Math.round(parseInt(this.props.pinRFID) / 1000) + 'V'} </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
                                <Image style={{ flex: 1, width: undefined, height: undefined, }} source={require('../image/car-battery.png')} resizeMode='contain' />
                            </View>
                            <View style={{backgroundColor: 'transparent', flex: 2, flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <Text style={{ fontSize: 10, paddingBottom: 5 }}>Acquy</Text>
                                <Text style={{ marginLeft: 10, color: '#25c10b', fontWeight: 'bold' }}>{Math.round(parseInt(this.props.pinRFID) / 1000) + 'V'}</Text>
                            </View>
                        </View>

                    </View>
                    <Image style={{ flex: 4, width: undefined, height: undefined, paddingRight: 20 }} source={require('../image/xe250.png')} resizeMode='contain' />
                </View>
                <Text style={{ fontSize: 10, paddingTop: 2, paddingBottom: 2, paddingLeft: 20, color: '#969292' }}>Tinh chỉnh</Text>
                <View style={{ flex: 3, backgroundColor: 'white', flexDirection: 'column', paddingRight: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#dcdcdc' }}>
                        <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={require('../image/ketnoihopden.png')} resizeMode='contain' />
                        </View>

                        <Text style={{ flex: 3, fontSize: 10 }}>Kết nối hộp đen</Text>
                        <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                            <TouchableHighlight
                                style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: this.props.isConnect ? '#26c10d' : '#c10b3b' }}
                                onPress={this.ondisConnect.bind(this)}>
                                <Text style={{ color: 'white' }}>{this.props.isConnect ? 'BẬT' : 'TẮT'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                            <Image style={{ flex: 1, width: undefined, height: undefined }} source={require('../image/xe.png')} resizeMode='contain' />
                        </View>
                        <Text style={{ flex: 3, fontSize: 10 }}>Chống dắt</Text>
                        <View style={{ flex: 1, marginTop: 10, marginBottom: 10 }}>
                            <TouchableHighlight
                                style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: this.props.anti_theft ? '#26c10d' : '#c10b3b' }}
                                onPress={this.ondisable.bind(this)}>
                                <Text style={{ color: 'white' }}>{this.props.anti_theft ? 'BẬT' : 'TẮT'}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 4, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight style={{
                        margin: 20, flex: 1, width: 80, height: 80, borderRadius: 80, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
                        shadowOffset: { width: 5, height: 5, }, shadowColor: 'black', shadowOpacity: 0.3,
                    }} onPress={this.findDriver.bind(this)}>
                        <View style={{ width: 75, height: 75, borderRadius: 75, backgroundColor: '#c10b3b', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: 40, tintColor: 'white' }} source={require('../image/Vector-Smart.png')} resizeMode='contain' />
                            <Text style={{ backgroundColor: 'transparent',fontSize: 12, fontWeight: 'bold', color: 'white' }}>TÌM XE</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.modalBox()}
            </View>
        );
    }
}
const mapStatetoProps = (state) => {
    return {
        personal: state.reduce.personal,
        isConnect: state.reduce.isConnect,
        pinBlackbox: state.reduce.pinBlackbox,
        pinRFID: state.reduce.pinRFID,
        peripheralId: state.reduce.peripheralId,
        anti_theft: state.reduce.anti_theft,
        isFirst: state.reduce.isFirst,
        isFirstLogin: state.reduce.isFirstLogin
    }
};
export default connect(mapStatetoProps)(Condition);