'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    Modal,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ScrollView,
    findNodeHandle
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import { Style } from '../style/Style';
import Util from '../util/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            colorUserName: '#6d6b6b',
            fullname: null,
            colorfullName: '#6d6b6b',
            password: null,
            colorPassword: '#6d6b6b',
            rePass: null,
            colorRePass: '#6d6b6b',
            checked: true,
            label: "",
            modalVisible: false,
            disabled: false
        }
    }

    doRegister() {
        this.setState({ disabled: true })
        if (this.state.username !== null && this.state.password !== null && this.state.rePass !== null && !this.state.checked) {
            this.setState({
                colorUserName: '#6d6b6b',
                colorPassword: '#6d6b6b',
                colorRePass: '#6d6b6b'
            })
            if (this.state.password != this.state.rePass) {
                this.setState({
                    label: "Mật khẩu không đúng!",
                    colorPassword: '#c64e4f',
                    colorRePass: '#c64e4f',
                    modalVisible: true
                })
            } else {
                if (Util.validateEmail(this.state.username) || Util.validatePhone(this.state.username)) {
                    try {
                        fetch(Util.APP_AUTHEN_SERVER, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                method: 'm_register',
                                params: {
                                    username: this.state.username,
                                    password: this.state.password,
                                    fullname: this.state.fullname,
                                    product: Util.PRODUCT_CODE,
                                }
                            })
                        }).then((response) => {
                            if (response.status == 200) {
                                return response.json()
                            }
                        }).then((responseData) => {
                            this.setState({ label: responseData.message, modalVisible: true });
                            if (responseData.status) {
                                this.props.navigation.navigate("SingIn");
                            }
                        }).catch((ex) => {
                            this.setState({
                                label: "Kiểm tra lại kết nối mạng!",
                                modalVisible: true,
                            })
                        });
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    this.setState({
                        label: "Tài khoản không đúng định dạng, bạn cần nhập đúng email hoặc số điện thoại",
                        colorUserName: '#c64e4f',
                        modalVisible: true
                    })
                }
            }

        } else {
            if (!this.state.checked) {
                if (this.state.username === null) {
                    this.setState({
                        colorUserName: '#c64e4f'
                    })
                } else {
                    this.setState({
                        colorUserName: '#6d6b6b'
                    })
                }
                if (this.state.password === null) {
                    this.setState({
                        colorPassword: '#c64e4f'
                    })
                } else {
                    this.setState({
                        colorPassword: '#6d6b6b'
                    })
                }
                if (this.state.rePass === null) {
                    this.setState({
                        colorRePass: '#c64e4f'
                    })
                } else {
                    this.setState({
                        colorRePass: '#6d6b6b'
                    })
                }
                this.setState({
                    modalVisible: true,
                    label: "Bạn không được nhập trống những ô đỏ"
                })
            } else {
                this.setState({
                    modalVisible: true,
                    label: "Bạn chưa đồng ý với điều khoản sử dụng của chúng tôi"
                })
            }

        }
    }

_scrollToInput (reactNode) {
  // Add a 'scroll' ref to your ScrollView 
  this.refs.scroll.scrollToFocusedInput(reactNode)
}

    render() {
        return (
            <KeyboardAwareScrollView ref='scroll' contentContainerStyle={{flex:1}}>
                <View style={styles.layout}>
                    <Image source={require('../image/logo.png')} style={styles.logo} />
                    <TextInput style={[styles.input, { borderColor: this.state.colorUserName }]}
                        underlineColorAndroid='transparent'
                        onChangeText={(value) => this.setState({ username: value })}
                        placeholder={'Email / Số điện thoại'}
                        placeholderTextColor='#c6c6c6' 
                        />
                    <TextInput style={[styles.input, { borderColor: this.state.colorfullName }]}
                        underlineColorAndroid='transparent'
                        onChangeText={(value) => this.setState({ fullname: value })}
                        placeholder={'Tên đầy đủ'}
                        placeholderTextColor='#c6c6c6' 
                        />
                    <TextInput style={[styles.input, { borderColor: this.state.colorPassword }]}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({ password: value })}
                        placeholder={'Mật khẩu'}
                        placeholderTextColor='#c6c6c6' 
                        ref="password"
                        onFocus={(event) => {
      // `bind` the function if you're using ES6 classes
            this._scrollToInput(findNodeHandle(event.target))}}
                        />
                    <TextInput style={[styles.input, { borderColor: this.state.colorRePass }]}
                        underlineColorAndroid='transparent'
                        secureTextEntry={true}
                        onChangeText={(value) => this.setState({ rePass: value })}
                        placeholder={'Nhập lại mật khẩu'}
                        placeholderTextColor='#c6c6c6' 
                        ref="repassword"
                        onFocus={(event) => {
      // `bind` the function if you're using ES6 classes
            this._scrollToInput(findNodeHandle(event.target))}}
                        />
                    <CheckBox
                        label='Tôi đồng ý với các điều khoản và điều kiện'
                        checkboxStyle={styles.checkbox}
                        labelStyle={{ color: '#36b7de', alignItems: 'center', textAlign: 'center', top: 5 }}
                        underlayColor='transparent'
                        onChange={(checked) => this.setState({ checked: checked })}
                    />
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <TouchableHighlight style={[Style.button,{backgroundColor:'#c64e4f',borderRadius:10}]}
                            underlayColor='#d37878'
                            disabled={this.state.disabled}
                            onPress={() => this.doRegister()}>
                            <Text style={styles.buttonText}>Đăng ký</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 18 }}>Bạn đã có tài khoản?</Text>
                        <TouchableHighlight style={{ marginLeft: 5 }}
                            underlayColor='transparent'
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Text style={{ color: '#c64e4f', fontSize: 18 }}>Đăng nhập</Text>
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
                        onRequestClose={() => {}}>
                        <View style={Style.modalbox}>
                            <View style={Style.innerContainer}>
                                <Text >{this.state.label}</Text>
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
                </KeyboardAwareScrollView>
        );
    }
}

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
    input: {
        height: 50,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 8,
        paddingLeft: 10
    },
    checkbox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#6d6b6b',
        marginTop: 10
    },
    button: {
        height: 40,
        backgroundColor: '#c64e4f',
        borderRadius: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    modalbox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 20
    },
    button1: {
        height: 36,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#c64e4f',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 10
    },
});