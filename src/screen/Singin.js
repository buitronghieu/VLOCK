import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    StatusBar,
    TouchableHighlight,
    Modal,
    Keyboard,
    TouchableWithoutFeedback,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Style } from '../style/Style';
import Util from '../util/Utils';
import {
    updateToken,
    updateUserName,
    updateLogin,
    updateNotification
} from '../actions'
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            username: null,
            pass: null,
            strError: "",
            modalVisible: false
        }
    }

    doLogin() {
        this.setState({
            disabled: true,
        });
        if (this.state.username != null && this.state.pass != null) {
            console.log(this.state.username, this.state.pass, this.props.clientId, Util.PRODUCT_CODE)
            try {
                fetch(Util.APP_AUTHEN_SERVER, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        method: 'm_login',
                        params: {
                            username: this.state.username,
                            password: this.state.pass,
                            clientid: this.props.clientId,
                            appid: this.props.appId,
                            product: Util.PRODUCT_CODE,
                        }
                    })
                }).then((response) => response.json()).then((responsejson) => {
                    console.log(responsejson)
                    if (responsejson.status) {
                        if (this.props.firebase_token !== null) {
                            fetch(Util.APP_AUTHEN_SERVER, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    method: 'm_firebase_change_token',
                                    params: {
                                        clientid: this.props.clientId,
                                        firebase_token: this.props.firebase_token
                                    }
                                })
                            }).then((response) => response.json())
                                .then((responseData) => {

                                }).catch((err) => {
                                    console.log(err);
                                });
                        }

                        store.dispatch(updateUserName(this.state.username));
                        store.dispatch(updateLogin(true));
                        store.dispatch(updateToken(responsejson.token));
                        AsyncStorage.setItem("username", JSON.stringify(this.state.username));
                        AsyncStorage.setItem("token", JSON.stringify(responsejson.token));
                        if (this.props.instanceID != null) {
                            fetch(Util.USER_ACTION_SERVER, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    method: 'vlock_get_friend',
                                    params: {
                                        username: this.state.username,
                                        device: this.props.instanceID
                                    }
                                })
                            }).then((response) => response.json())
                                .then((responseData) => {
                                    console.log(responseData);
                                    let data = JSON.parse(responseData.friends);
                                    let notification = this.props.notification;
                                    for(let i in data){
                                        switch (i) {
                                            case "0":
                                                let friend1 = {...data[i], status: 'active'};
                                                notification.friend1 = friend1;
                                                break;
                                        case "1":
                                                let friend2 = {...data[i], status: 'active'};
                                                notification.friend2 = friend2;
                                                break;
                                                case "2":
                                                let friend3 = {...data[i], status: 'active'};
                                                notification.friend3 = friend3;
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    store.dispatch(updateNotification(notification));
                                     this.props.navigation.navigate("Profile");
                                }).catch((err) => {
                                    console.log(err);
                                });
                        }else{
                            this.props.navigation.navigate("Profile");
                        }
                       
                    } else {
                        this.setState({
                            strError: "Tài khoản không hợp lệ!",
                            modalVisible: true,
                        })
                    }
                }).catch((ex) => {
                    console.log(ex);
                    this.setState({
                        strError: "Kiểm tra lại kết nối mạng!",
                        modalVisible: true,
                    })
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            if (this.state.username == null) {
                this.setState({
                    strError: "Bạn chưa nhập tài khoản"
                })
            }

            if (this.state.pass == null) {
                this.setState({
                    strError: "Bạn chưa nhập mật khẩu"
                })
            }
            this.setState({ modalVisible: true });
        }
    }

    forgotPassword() {
        this.props.navigation.navigate("ForgotPassword");
    }

    register() {
        this.props.navigation.navigate("Register")
    }

    render() {
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                <View style={styles.layout}>
                    <StatusBar
                        backgroundColor="black"
                        barStyle="dark-content"
                    />
                    <Image source={require('../image/logo.png')} style={styles.logo} />
                    <Text>Đăng nhập với tài khoản Vietek</Text>
                    <View style={styles.controls}>
                        <View style={styles.rowInput}>
                            <Image source={require('../image/user.png')} style={styles.image} />
                            <View style={styles.inputControl}>
                                <TextInput style={styles.input}
                                    placeholder={'Email / Số điện thoại'}
                                    onChangeText={(value) => this.setState({ username: value })}
                                    placeholderTextColor='#c6c6c6'

                                    underlineColorAndroid='transparent' />
                            </View>
                        </View>
                        <View style={styles.sperator} />
                        <View style={styles.rowInput}>
                            <Image source={require('../image/pass.png')} style={styles.image} />
                            <View style={styles.inputControl}>
                                <TextInput style={styles.input}
                                    placeholder={'Mật khẩu'}
                                    secureTextEntry={true}
                                    onChangeText={(value) => this.setState({ pass: value })}
                                    placeholderTextColor='#c6c6c6'
                                    underlineColorAndroid='transparent' />
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TouchableHighlight style={[Style.button, { backgroundColor: '#c64e4f', borderRadius: 10 }]}
                            disabled={this.state.disabled}
                            underlayColor='#d37878'
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={styles.buttonText}>Quay lại</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={[Style.button, { backgroundColor: '#c64e4f', borderRadius: 10 }]}
                            disabled={this.state.disabled}
                            underlayColor='#d37878'
                            onPress={this.doLogin.bind(this)}>
                            <Text style={styles.buttonText}>Đăng nhập</Text>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight style={styles.forgotButton}
                        underlayColor='transparent'
                        onPress={this.forgotPassword.bind(this)}>
                        <Text style={{ color: '#30afda', fontSize: 18 }}>Quên mật khẩu?</Text>
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Bạn chưa có tài khoản?</Text>
                        <TouchableHighlight style={{ marginLeft: 5 }}
                            underlayColor='transparent'
                            onPress={this.register.bind(this)}>
                            <Text style={{ color: '#c64e4f', fontSize: 18 }}>Đăng ký</Text>
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
                        onRequestClose={() => { }}>
                        <View style={Style.modalbox}>
                            <View style={Style.innerContainer}>
                                <Text >{this.state.strError}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <TouchableHighlight
                                        style={Style.button}
                                        onPress={() => { this.setState({ modalVisible: false, disabled: false }) }}>
                                        <Text style={Style.buttonText}>Đồng ý </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

const mapStatetoProps = (state) => {
    return {
        appId: state.reduce.appId,
        clientId: state.reduce.clientId,
        firebase_token: state.reduce.firebase_token,
        instanceID: state.reduce.instanceID,
        notification: state.reduce.notification
    }
};
export default connect(mapStatetoProps)(SignIn);

var styles = StyleSheet.create({
    layout: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    logo: {
        width: 200,
        height: 83,
        marginTop: 50,
        marginBottom: 30
    },
    copyright: {
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyrightText: {
        fontSize: 8
    },
    controls: {
        //flex:1,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginTop: 20,

    },
    rowInput: {
        //flex:1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        padding: 10
    },
    image: {
        width: 20,
        height: 20,
        marginTop: 6,
        justifyContent: 'center'
    },
    inputControl: {
        flex: 1,
        height: 36
    },
    input: {
        flex: 1,
        marginLeft: 10,
        height: 36,
        paddingLeft: 5,
        paddingRight: 5
    },
    sperator: {
        height: 1,
        backgroundColor: '#e5e5e5'
    },
    button: {
        height: 40,
        backgroundColor: '#c64e4f',
        borderRadius: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    forgotButton: {
        height: 30,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    socialButton: {
        height: 40,
        borderRadius: 10,
        alignSelf: 'stretch',
        marginTop: 5,
    },
    fbButton: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 8,
        //textAlign: 'center',
        backgroundColor: '#4f86bf'
    },
    ggButton: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 8,
        //textAlign: 'center',
        backgroundColor: '#e05341'
    },
    imgSocial: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: 8,
        left: 8,
        justifyContent: 'center'
    },
    textSocial: {
        flex: 1,
        alignSelf: 'stretch',
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
        //backgroundColor:'grey'
    }
});