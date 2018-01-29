import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
    AsyncStorage,
    Modal,
    ScrollView,
    findNodeHandle,
    TextInput
} from 'react-native'
import { connect } from 'react-redux';
import { Style } from '../../style/Style';
import Util from '../../util/Utils';
import Relative from '../layout/Relative';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    updateNotification,
    updateLogin
} from '../../actions'
class Profile extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { state, goBack } = navigation;
        const { params } = state;
        return {
            headerLeft: <TouchableHighlight style={{ flex: 1, paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => { 
                  navigation.navigate('Setup');  
                 {/* goBack('Setup');  */}
                }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.back}</Text>
            </TouchableHighlight>,
            headerRight: null
        }

    };

    constructor(props) {
        super(props);
        this.state = {
            showRelative1: false,
            showRelative2: false,
            showRelative3: false,
            label: '',
            visibleModal: false,
            key: null,
            verifyCode: null,
            keyValue: null,
            friend1: this.props.notification.friend1,
            friend2: this.props.notification.friend2,
            friend3: this.props.notification.friend3
        }
    }

    color(val) {
        var color = '#7b7b7b';
        if (val === 'registration') {
            color = '#c10b3b';
        } else if (val === 'active') {
            color = '#13c905';
        }
        return color;
    }

    status(val) {
        var status = "Chưa đăng ký";
        if (val === 'registration') {
            status = "Đang xác minh";
        } else if (val === 'active') {
            status = "Đã xác minh";
        }
        return status;
    }

    onRegister(value) {
        if (this.checkError(value)) {
            fetch(Util.USER_ACTION_SERVER, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    method: 'vlock_register_friend',
                    params: {
                        email: value.email,
                        phone: value.phone,
                        fullname: value.name,
                        license_plate: this.props.personal.licensePlate,
                        device_code: this.props.instanceID,
                        username: this.props.username
                    }
                })
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.status) {
                        const friend = {
                            name: value.name,
                            email: value.email,
                            phone: value.phone,
                            status: 'registration'
                        }
                        switch (value.key) {
                            case 'friend1':
                                this.setState({
                                    friend1: friend
                                });
                                this.notification = {
                                    ...this.props.notification,
                                    friend1: friend
                                }
                                break;
                            case 'friend2':
                                this.setState({
                                    friend2: friend
                                });
                                this.notification = {
                                    ...this.props.notification,
                                    friend2: friend
                                }
                                break;
                            case 'friend3':
                                this.setState({
                                    friend3: friend
                                });
                                this.notification = {
                                    ...this.props.notification,
                                    friend3: friend
                                }
                                break;
                        }
                        store.dispatch(updateNotification(this.notification));
                        AsyncStorage.setItem("notification", JSON.stringify(this.notification));
                        this.setState({
                            visibleModal: true,
                            key: 'active',
                            keyValue: value.key
                        })
                    }
                    console.log(responseData);
                }).catch((err) => {
                    console.log(err);
                });
        }

    }


    onActive(value) {
        this.setState({
            visibleModal: true,
            key: 'active',
            keyValue: value
        })
    }

    onRemove(value) {
        this.setState({
            visibleModal: true,
            key: 'remove',
            label: "Bạn muốn xoá người này?",
            keyValue: value
        })
    }

    sendVerifyCode() {
        var value = null;
        switch (this.state.keyValue) {
            case 'friend1':
                value = this.state.friend1;
                break;
            case 'friend2':
                value = this.state.friend2;
                break;
            case 'friend3':
                value = this.state.friend3;
                break;
        }
        fetch(Util.USER_ACTION_SERVER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'vlock_ask_friend',
                params: {
                    email: value.email,
                    phone: value.phone,
                    device_code: this.props.instanceID,
                    username: this.props.username,
                    verifyCode: this.state.verifyCode
                }
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.status) {
                    const friend = {
                        name: value.name,
                        email: value.email,
                        phone: value.phone,
                        status: 'active'
                    }
                    this.friend = null;
                    switch (this.state.keyValue) {
                        case 'friend1':
                            this.friend = {
                                ...this.state.friend1,
                                status: 'active'
                            };
                            this.setState({ friend1: this.friend });
                            this.notification = {
                                ...this.props.notification,
                                friend1: this.friend
                            }
                            break;
                        case 'friend2':
                            this.friend = {
                                ...this.state.friend2,
                                status: 'active'
                            };
                            this.setState({ friend2: this.friend });
                            this.notification = {
                                ...this.props.notification,
                                friend2: this.friend
                            }
                            break;
                        case 'friend3':
                            this.friend = {
                                ...this.state.friend3,
                                status: 'active'
                            };
                            this.setState({ friend3: this.friend });
                            this.notification = {
                                ...this.props.notification,
                                friend3: this.friend
                            }
                            break;
                    }
                    store.dispatch(updateNotification(this.notification));
                    AsyncStorage.setItem("notification", JSON.stringify(this.notification));
                    this.setState({
                        visibleModal: true,
                        key: 'waring',
                        label: responseData.message,
                        keyValue: value.key
                    })
                }
                console.log(responseData);
            }).catch((err) => {
                console.log(err);
            });
    }


    remove() {

        switch (this.state.keyValue) {
            case 'friend1':
                this.updateNotifi(this.state.friend1);
                break;
            case 'friend2':
                this.updateNotifi(this.state.friend2);
                break;
            case 'friend3':
                this.updateNotifi(this.state.friend3);
                break;
        }

    }

    updateNotifi(value) {
        fetch(Util.USER_ACTION_SERVER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                method: 'vlock_remove_friend',
                params: {
                    email: value.email,
                    phone: value.phone,
                    device_code: this.props.instanceID,
                    username: this.props.username,
                }
            })
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.status) {
                    const friend = {
                        name: null,
                        email: null,
                        phone: null,
                        status: 'unregistered'
                    }
                    switch (this.state.keyValue) {
                        case 'friend1':
                            this.setState({ friend1: friend });
                            this.notification = {
                                ...this.props.notification,
                                friend1: friend
                            }
                            break;
                        case 'friend2':
                            this.friend = {
                                ...this.state.friend2,
                                status: 'active'
                            };
                            this.setState({ friend2: friend });
                            this.notification = {
                                ...this.props.notification,
                                friend2: friend
                            }
                            break;
                        case 'friend3':
                            this.friend = {
                                ...this.state.friend3,
                                status: 'active'
                            };
                            this.setState({ friend3: friend });
                            this.notification = {
                                ...this.props.notification,
                                friend3: friend
                            }
                            break;
                    }
                    store.dispatch(updateNotification(this.notification));
                    AsyncStorage.setItem("notification", JSON.stringify(this.notification));
                    this.setState({
                        visibleModal: true,
                        key: 'waring',
                        label: responseData.message,
                        keyValue: value.key
                    })
                }
                console.log(responseData);
            }).catch((err) => {
                console.log(err);
            });
    }

    modalBox() {
        if (this.state.key === 'waring') {
            return (
                <Modal transparent={true} position={"center"}
                    visible={this.state.visibleModal}
                    animationType={"slide"}
                    onRequestClose={() => { }}>
                    <View style={Style.modalbox}>
                        <View style={Style.innerContainer}>
                            <Text style={{ backgroundColor: 'transparent', padding: 20 }}>{this.state.label}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableHighlight
                                    style={[Style.button, { borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }]}
                                    onPress={() => {
                                        this.setState({ visibleModal: false })
                                    }}>
                                    <Text style={[Style.buttonText, { backgroundColor: 'transparent', }]}>Đồng ý </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        } else if (this.state.key === 'active') {
            return (
                <Modal transparent={true} position={"center"}
                    visible={this.state.visibleModal}
                    animationType={"slide"}
                    onRequestClose={() => { }}>
                    <View style={Style.modalbox}>
                        <View style={Style.innerContainer}>
                            <View style={{ marginLeft: 20, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ backgroundColor: 'transparent', fontSize: 15 }}>Mã xác nhận</Text>
                            </View>
                            <TextInput
                                style={{ height: 40, backgroundColor: '#ebebeb', borderRadius: 5, fontSize: 12, margin: 20, textAlign: 'center' }}
                                placeholder={'Nhập tên của người thân'}
                                keyboardType='numeric'
                                onChangeText={(text) => { this.setState({ verifyCode: text }) }} />

                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableHighlight
                                    style={[Style.button, { borderBottomLeftRadius: 5 }]}
                                    onPress={() => {
                                        this.setState({ visibleModal: false })
                                    }}>
                                    <Text style={[Style.buttonText, { backgroundColor: 'transparent', }]}>Huỷ </Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={[Style.button, { borderBottomRightRadius: 5 }]}
                                    onPress={() => {
                                        this.sendVerifyCode();
                                    }}>
                                    <Text style={[Style.buttonText, { backgroundColor: 'transparent', }]}>Đồng ý </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        } else if (this.state.key === 'remove') {
            return (
                <Modal transparent={true} position={"center"}
                    visible={this.state.visibleModal}
                    animationType={"slide"}
                    onRequestClose={() => { }}>
                    <View style={Style.modalbox}>
                        <View style={Style.innerContainer}>
                            <Text style={{ padding: 20 }}>{this.state.label}</Text>
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <TouchableHighlight
                                    style={[Style.button, { borderBottomLeftRadius: 5 }]}
                                    onPress={() => {
                                        this.setState({ visibleModal: false })
                                    }}>
                                    <Text style={[Style.buttonText, { backgroundColor: 'transparent', }]}>Huỷ </Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={[Style.button, { borderBottomRightRadius: 5 }]}
                                    onPress={() => {
                                        this.remove();
                                    }}>
                                    <Text style={[Style.buttonText, { backgroundColor: 'transparent', }]}>Đồng ý </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            );
        }
    }

    checkError(value) {
        if ((value.email === null || value.email === "") && (value.phone === null || value.phone === "")) {
            this.setState({
                visibleModal: true,
                label: 'Bạn phải điền số điện thoại hoặc email!',
                key: 'waring'
            })
            return false;
        } else {
            if (value.phone !== null && !Util.validatePhone(value.phone)) {
                this.setState({
                    visibleModal: true,
                    label: 'Định dạng số điện thoại không đúng!',
                    key: 'waring'
                })
                return false;
            }
            if (value.email !== null && !Util.validateEmail(value.email)) {
                this.setState({
                    visibleModal: true,
                    label: 'Định dạng email không đúng!',
                    key: 'waring'
                })
                return false;
            }
        }
        return true;
    }

     _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView 
        this.refs.scroll.scrollToFocusedInput(reactNode)
    }
    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1,flexDirection: 'column' }} ref="scroll">
                <TouchableHighlight
                    onPress={() => {
                        let show = this.state.showRelative1;
                        this.setState({ showRelative1: !show })
                    }}
                    style={{ height: 40, backgroundColor: 'white', marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                        <Image style={{ width: 30, height: 30, tintColor: this.color(this.state.friend1.status) }} source={require('../image/icon-avt.png')} resizeMode='contain' />
                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
                            <Text style={{ backgroundColor: 'transparent', fontSize: 12 }}>NGƯỜI THÂN MỘT</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', marginRight: 5 }}>
                                <Text style={{ backgroundColor: 'transparent', fontSize: 9.5, marginRight: 5, color: this.color(this.state.friend1.status) }}>{this.status(this.state.friend1.status)}</Text>
                            </View>
                            <Image style={{ width: 20, height: 20, tintColor: this.color(this.state.friend1.status) }} source={this.state.showRelative1 ? require('../image/keyboard-left-arrow-button.png') : require('../image/right-arrow-button.png')} resizeMode='contain' />
                        </View>
                    </View>
                </TouchableHighlight>
                <Relative
                    relative={this.state.friend1}
                    keyValue={'friend1'}
                    show={this.state.showRelative1}
                    onRegister={(value) => { this.onRegister(value) }}
                    onActive={(value) => { this.onActive(value) }}
                    onRemove={(value) => { this.onRemove(value) }} 
                    onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}/>
                <TouchableHighlight
                    onPress={() => {
                        let show = this.state.showRelative2;
                        this.setState({ showRelative2: !show })
                    }}
                    style={{ height: 40, backgroundColor: 'white', marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                        <Image style={{ width: 30, height: 30, tintColor: this.color(this.state.friend2.status) }} source={require('../image/icon-avt.png')} resizeMode='contain' />
                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
                            <Text style={{ backgroundColor: 'transparent', fontSize: 12 }}>NGƯỜI THÂN HAI</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', marginRight: 5 }}>
                                <Text style={{ backgroundColor: 'transparent', fontSize: 9.5, marginRight: 5, color: this.color(this.state.friend2.status) }}>{this.status(this.state.friend2.status)}</Text>
                            </View>
                            <Image style={{ width: 20, height: 20, tintColor: this.color(this.state.friend2.status) }} source={this.state.showRelative2 ? require('../image/keyboard-left-arrow-button.png') : require('../image/right-arrow-button.png')} resizeMode='contain' />
                        </View>
                    </View>
                </TouchableHighlight>
                <Relative
                    relative={this.state.friend2}
                    keyValue={'friend2'}
                    show={this.state.showRelative2}
                    onRegister={(value) => { this.onRegister(value) }}
                    onActive={(value) => { this.onActive(value) }}
                    onRemove={(value) => { this.onRemove(value) }} 
                    onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}/>
                <TouchableHighlight
                    onPress={() => {
                        let show = this.state.showRelative3;
                        this.setState({ showRelative3: !show })
                    }}
                    style={{ height: 40, backgroundColor: 'white', marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 5 }}>
                        <Image style={{ width: 30, height: 30, tintColor: this.color(this.state.friend3.status) }} source={require('../image/icon-avt.png')} resizeMode='contain' />
                        <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
                            <Text style={{ backgroundColor: 'transparent', fontSize: 12 }}>NGƯỜI THÂN BA</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', marginRight: 5 }}>
                                <Text style={{ backgroundColor: 'transparent', fontSize: 9.5, marginRight: 5, color: this.color(this.state.friend3.status) }}>{this.status(this.state.friend3.status)}</Text>
                            </View>
                            <Image style={{ width: 20, height: 20, tintColor: this.color(this.state.friend3.status) }} source={this.state.showRelative3 ? require('../image/keyboard-left-arrow-button.png') : require('../image/right-arrow-button.png')} resizeMode='contain' />
                        </View>
                    </View>
                </TouchableHighlight>
                <Relative
                    relative={this.state.friend3}
                    keyValue={'friend3'}
                    show={this.state.showRelative3}
                    onRegister={(value) => { this.onRegister(value) }}
                    onActive={(value) => { this.onActive(value) }}
                    onRemove={(value) => { this.onRemove(value) }} 
                    onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}/>
                <View style={{ height: 40, margin: 10 }}>
                    <Text style={{ backgroundColor: 'transparent', fontSize: 12, color: '#c10b3b' }}>Ghi chú:</Text>
                    <Text style={{ backgroundColor: 'transparent', fontSize: 11, color: '#6b6b6b', marginTop: 10 }}> {'-  Khi đăng ký người thân mà bạn đăng ký phải là thông tin chính xác. Sau khi đăng ký thông tin bằng số điện thoại, chúng tôi sẽ gửi thông báo yêu cầu xác nhận đến người thân của bạn để hoàn tất đăng ký.'}</Text>
                    <Text style={{ backgroundColor: 'transparent', fontSize: 11, color: '#6b6b6b', marginTop: 10 }}> {'-  Bạn nên đăng ký thông tin của những người sinh hoạt tiếp xúc hằng ngày với bạn để đảm bảo chắc chắn thông tin của thiết bị gửi về sẽ được tương tác ngay.'}</Text>
                    <Text style={{ backgroundColor: 'transparent', fontSize: 11, color: '#6b6b6b', marginTop: 10 }}> {'-  Mục đích của việc này đảm bảo người thân sẵn sàng nhận những thông tin cảnh báo va chạm từ xe máy đến.'}</Text>
                </View>
                {this.modalBox()}
            </KeyboardAwareScrollView>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        notification: state.reduce.notification,
        personal: state.reduce.personal,
        peripheralId: state.reduce.peripheralId,
        username: state.reduce.username,
        instanceID: state.reduce.instanceID
    }
};
export default connect(mapStatetoProps)(Profile);
