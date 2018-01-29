import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Switch,
    TouchableHighlight,
    AsyncStorage,
    Modal,
    TextInput,
    Button
} from 'react-native'

export default class Relative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.relative.name,
            email: this.props.relative.email,
            phone: this.props.relative.phone
        }
    }

    _renderButtonLeft() {
        if (this.props.relative.status === 'registration') {
            return (
                <TouchableHighlight
                    style={{ flex: 1, marginRight: 5, backgroundColor: '#ebebeb', height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { this.props.onActive(this.props.keyValue) }}>
                    <Text style={{ backgroundColor: 'transparent', color: '#989898', fontSize: 12 }}>Nhập mã xác minh</Text>
                </TouchableHighlight>
            );
        } else {
            return (
                <View style={{ flex: 1, paddingRight: 5 }} />
            );

        }
    }

    render() {
        if (this.props.show) {
            if (this.props.relative.status === 'unregistered') {
                return (
                    <View style={{ height: 180, backgroundColor: 'white', flexDirection: 'row' }}>
                        <View style={{ width: 40 }} />
                        <View style={{ flex: 1, paddingTop: 10, paddingRight: 10, paddingBottom: 10, borderTopWidth: 0.5, borderTopColor: '#dcdcdc', flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#ebebeb', padding: 5, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}>
                                    <Image style={{ width: 20, height: 20, tintColor: '#7b7b7b' }} source={require('../image/icon-avt.png')} resizeMode='contain' />
                                </View>
                                <TextInput
                                    style={{ flex: 1, height: 30, backgroundColor: '#ebebeb', borderTopRightRadius: 5, borderBottomRightRadius: 5, fontSize: 12 }}
                                    value={this.state.name}
                                    placeholder={'Nhập tên của người thân'}
                                    onChangeText={(text) => { this.setState({ name: text }) }}
                                    ref={this.props.ref}
                                    onFocus={(event) => this.props.onFocus === undefined ? null : this.props.onFocus(event)} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ backgroundColor: '#ebebeb', padding: 5, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}>
                                    <Image style={{ width: 20, height: 20, tintColor: '#7b7b7b' }} source={require('../image/sodienthoai.png')} resizeMode='contain' />
                                </View>
                                <TextInput
                                    style={{ flex: 1, height: 30, backgroundColor: '#ebebeb', borderTopRightRadius: 5, borderBottomRightRadius: 5, fontSize: 12 }}
                                    value={this.state.phone}
                                    keyboardType={'numeric'}
                                    placeholder={'Nhập số điện thoại của người thân'}
                                    onChangeText={(text) => { this.setState({ phone: text }) }}
                                    ref={this.props.ref}
                                    onFocus={(event) => this.props.onFocus === undefined ? null : this.props.onFocus(event)} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ backgroundColor: '#ebebeb', padding: 5, borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }}>
                                    <Image style={{ width: 20, height: 20, tintColor: '#7b7b7b' }} source={require('../image/thu.png')} resizeMode='contain' />
                                </View>
                                <TextInput
                                    style={{ flex: 1, height: 30, backgroundColor: '#ebebeb', borderTopRightRadius: 5, borderBottomRightRadius: 5, fontSize: 12 }}
                                    placeholder={'Nhập email của người thân'}
                                    keyboardType={'email-address'}
                                    value={this.state.email}
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                    ref={this.props.ref}
                                    onFocus={(event) => this.props.onFocus === undefined ? null : this.props.onFocus(event)} />
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <TouchableHighlight
                                    style={{ flex: 1, backgroundColor: '#ebebeb', height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        let value = {
                                            key: this.props.keyValue,
                                            name: this.state.name,
                                            phone: this.state.phone,
                                            email: this.state.email
                                        }
                                        this.props.onRegister(value);
                                    }}>
                                    <Text style={{ backgroundColor: 'transparent', color: '#989898', fontSize: 12 }}>Đăng ký</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={{ height: 150, backgroundColor: 'white', flexDirection: 'row' }}>
                        <View style={{ width: 40 }} />
                        <View style={{ flex: 1, paddingTop: 10, paddingRight: 10, paddingBottom: 10, borderTopWidth: 0.5, borderTopColor: '#dcdcdc', flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 20, tintColor: '#7b7b7b', marginRight: 10 }} source={require('../image/icon-avt.png')} resizeMode='contain' />
                                <Text style={{ backgroundColor: 'transparent', fontSize: 12 }}>{this.props.relative.name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Image style={{ width: 20, height: 20, tintColor: '#7b7b7b', marginRight: 10 }} source={require('../image/sodienthoai.png')} resizeMode='contain' />
                                <Text style={{ backgroundColor: 'transparent', fontSize: 12 }}>{this.props.relative.phone}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <Image style={{ width: 20, height: 20, tintColor: '#7b7b7b', marginRight: 10 }} source={require('../image/thu.png')} resizeMode='contain' />
                                <Text style={{ backgroundColor: 'transparent', fontSize: 12 }}>{this.props.relative.email}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                {this._renderButtonLeft()}
                                <TouchableHighlight
                                    style={{ flex: 1, marginLeft: 5, backgroundColor: '#ebebeb', height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { this.props.onRemove(this.props.keyValue) }}>
                                    <Text style={{ backgroundColor: 'transparent', color: '#989898', fontSize: 12 }}>Xoá người này</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                );
            }
        }
        return null;
    }
}