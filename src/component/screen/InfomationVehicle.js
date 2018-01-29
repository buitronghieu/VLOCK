import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    Image,
    Picker,
    TextInput,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    TouchableWithoutFeedback,
    findNodeHandle,
    Modal
} from 'react-native';
import ImageSlider from '../layout/ImageSlider';
import { Style } from '../../style/Style';
import { connect } from 'react-redux';
import {
    updatePersonal,
    updateOil,
    updateBrake,
    updateTire,
    updateAcquy,
    updateAll
} from '../../actions'
import Input from '../layout/Input'
import PushNotification from '../../util/PushNotification'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
class InfomationVehicle extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { state, goBack } = navigation;
        const { params } = state;
        return {
            headerLeft:
            <TouchableHighlight style={{ flex: 1, paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => { goBack() }}>
                <Text style={{ marginLeft: 10, color: 'white', textAlign: 'center' }}>{screenProps.back}</Text>
            </TouchableHighlight>,
            headerRight: <TouchableHighlight style={{ paddingRight: 5, flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                this.save();
                navigation.navigate("Setup");
            }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.save}</Text>
            </TouchableHighlight>
        }

    };
    constructor(props) {
        super(props);
        this.company = ['Honda', "Piaggio", "Suzuki", "SYM", "Yamaha"];
        this.vehicles = {
            'Honda': ["LEAD 125cc", "SH 300cc", "SH 125cc/150cc", "SH mode 125cc", "Air Blade 125cc", "PCX 125cc", "Vision 110cc", "Wave Alpha 110cc", "Blade 110cc", "Wave RSX 110cc", "Future 125cc", "WINNER 150cc", "MSX 125cc"],
            'Piaggio': ["Beverly i.e", "Medley ABS", "New Liberty ABS", "Fly i.e", "Zip"],
            'Suzuki': ["GSX-S1000", "V-STROM 1000", "GZ 150", "RAIDER FI", "GD110", "GSX-S150", "GSX-S150", "GSX-R150", "AXELO 125", "IMPULSE 125 FI", "ADDRESS 110 FI", "AXELO 125", "HAYATE SS - FI", "HAYATE SS", "HAYATE 125", "UA 125T", "VIVA 115 FI", "REVO 110"],
            'SYM': ["Elite 50", "Shark mini 125 EFI", "Elizabeth 110 EFI", "Attila-V 125 EFI", "Venus 125 EFI", "StarX 125 EFI", "Galaxy 115", "Elegant II 100", "Amigo 50", "Elegant 50", "Angela 50", "EV Elite"],
            'Yamaha': ["MT-03", "TFX 150", "FZ 150i", "NM-X", "YZF-R3", "NVX 155", "NVX 125", "Janus", "Grande", "Acruzo", "Exciter", "Jupiter", "Sirius",]
        },
            this.state = {
                username: this.props.personal.username,
                motoType: this.props.personal.motoType,
                licensePlate: this.props.personal.licensePlate,
                iconMoto: this.props.personal.iconMoto,
                oil: this.props.oil.value,
                brake: this.props.brake.value,
                tire: this.props.tire.value,
                acquy: this.props.acquy.value,
                all: this.props.all.value,
                company: this.props.personal.motoType.split("-")[0],
                vehicle: this.props.personal.motoType.split("-")[1],
                modalVisible: false,
                label: ""
            }
        save = this.save.bind(this);
    }
    save() {
        var motoType = this.state.company + "-" + this.state.vehicle;
        var personal = {
            iconMoto: this.state.iconMoto,
            licensePlate: this.state.licensePlate,
            username: this.state.username,
            motoType
        };
        AsyncStorage.setItem("personal", JSON.stringify(personal));
        store.dispatch(updatePersonal(personal));

        var nowDate = new Date();
        nowDate.setHours(7);
        nowDate.setMinutes(0);
        nowDate.setMilliseconds(0);
        if (this.state.oil > 0 && this.state.oil !== this.props.oil.value) {
            var oil = {
                value: this.state.oil,
                date: nowDate.getTime()
            }
            store.dispatch(updateOil(oil));
            PushNotification.updateNotification('oil', oil, "Hôm nay cần thay dầu");
        }
        if (this.state.brake > 0 && this.state.brake !== this.props.brake.value) {
            var brake = {
                value: this.state.brake,
                date: nowDate.getTime()
            }
            store.dispatch(updateBrake(brake));
            PushNotification.updateNotification('brake', brake, "Hôm nay cần bảo hành phanh");
        }
        if (this.state.tire > 0 && this.state.tire !== this.props.tire.value) {
            var tire = {
                value: this.state.tire,
                date: nowDate.getTime()
            }
            store.dispatch(updateTire(tire));
            PushNotification.updateNotification('tire', tire, "Hôm nay cần thay lốp");
        }
        if (this.state.acquy > 0 && this.state.acquy !== this.props.acquy.value) {
            var acquy = {
                value: this.state.acquy,
                date: nowDate.getTime()
            }
            store.dispatch(updateAcquy(acquy));
            PushNotification.updateNotification('acquy', acquy, "Hôm nay cần thay acquy");
        }
        if (this.state.all > 0 && this.state.all !== this.props.all.value) {
            var all = {
                value: this.state.all,
                date: nowDate.getTime()
            }
            store.dispatch(updateAll(all));
            PushNotification.updateNotification('all', all, "Hôm nay cần thay kiểm tra toàn bộ");
        }
    }

    setPushNotification(key, value, body) {
        var endDate = value.date + value.value * 1000 * 60 * 60 * 24;
        PushNotification.scheduleLocalNotification(endDate, key, body);
        AsyncStorage.setItem(key, JSON.stringify(value));
    }

    _scrollToInput(reactNode) {
        // Add a 'scroll' ref to your ScrollView 
        this.refs.scroll.scrollToFocusedInput(reactNode)
    }
    onChangeMotoTypeCompany(value) {
        this.setState({ company: value })
    }
    onChangeMotoTypeVehicle(value) {
        this.setState({ vehicle: value })
    }

    checkInput(val) {
        var index = parseInt(val);
        if (index > 9999) {
            this.setState({
                modalVisible: true,
                label: "Gía trị tối đa có thể nhập là 9999 ngày!"
            })
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} ref="scroll">
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ backgroundColor: "white", flex: 10, padding: 10, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image style={{ flex: 5, width: undefined, height: undefined }} source={require('../image/avt.png')} resizeMode='contain' />
                            <View style={{ flex: 16, flexDirection: 'column', paddingBottom: 5 }}>
                                <Input
                                    style={{ flex: 1, marginTop: 5 }}
                                    placeholder='Tên chủ xe'
                                    value={this.state.username}
                                    onChangeText={(text) => {
                                        this.setState({ username: text })
                                    }}
                                />
                                <Input
                                    style={{ flex: 1, marginTop: 5 }}
                                    placeholder='Biển số xe'
                                    value={this.state.licensePlate}
                                    onChangeText={(text) => {
                                        this.setState({ licensePlate: text })
                                    }}
                                />
                            </View>

                        </View>
                        <ImageSlider style={{ flex: 1 }}
                            valueDefault={this.state.iconMoto}
                            onChange={(data) => {
                                this.setState({ iconMoto: data })
                            }} />
                    </View>
                    <View style={{ backgroundColor: "white", flex: 6, marginTop: 5, flexDirection: 'row' }}>
                        <Picker style={{ flex: 1 }} itemStyle={{ height: 80 }}
                            selectedValue={this.state.company}
                            onValueChange={(value) => { this.onChangeMotoTypeCompany(value) }}
                        >
                            {this._renderItemComany()}
                        </Picker>
                        <Picker style={{ flex: 1 }} itemStyle={{ height: 80 }}
                            selectedValue={this.state.vehicle}
                            onValueChange={(value) => { this.onChangeMotoTypeVehicle(value) }}
                        >
                            {this._renderItemVehicle()}
                        </Picker>
                    </View>
                    <View style={{ flex: 15, marginTop: 5, marginBottom: 5, flexDirection: 'column' }}>
                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', flex: 1, marginBottom: 5, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../image/oil/red.png')} resizeMode='contain' style={styles.icon} />
                            <Text style={styles.text}>THAY DẦU </Text>
                            <Input style={styles.input}
                                placeholder='20'
                                keyboardType='numeric'
                                value={this.state.oil === 0 ? null : this.state.oil.toString()}
                                onChangeText={(text) => {
                                    let oil = (text === "" || text === null) ? 0 : parseInt(text);
                                    this.setState({ oil })
                                    this.checkInput(oil);
                                }}
                                onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}
                            />
                            <Text style={{ fontSize: 9 }}>Ngày</Text>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 5, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', flex: 1, marginBottom: 5, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../image/brake/red.png')} resizeMode='contain' style={styles.icon} />
                            <Text style={styles.text}>BẢO HÀNH PHANH </Text>
                            <Input style={styles.input}
                                placeholder='20'
                                keyboardType='numeric'
                                value={this.state.brake === 0 ? null : this.state.brake.toString()}
                                onChangeText={(text) => {
                                    let brake = (text === "" || text === null) ? 0 : parseInt(text);
                                    this.setState({ brake })
                                    this.checkInput(brake);
                                }}
                                onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}
                            />
                            <Text style={{ fontSize: 9 }}>Ngày</Text>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', flex: 1, marginBottom: 5, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../image/tire/red.png')} resizeMode='contain' style={styles.icon} />
                            <Text style={styles.text}>THAY LỐP</Text>
                            <Input style={styles.input}
                                placeholder='20'
                                keyboardType='numeric'
                                value={this.state.tire == 0 ? null : this.state.tire.toString()}
                                onChangeText={(text) => {
                                    let tire = (text === "" || text === null) ? 0 : parseInt(text);
                                    this.setState({ tire })
                                    this.checkInput(tire);
                                }}
                                onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}
                            />
                            <Text style={{ fontSize: 9 }}>Ngày</Text>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', flex: 1, marginBottom: 5, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../image/acquy/red.png')} resizeMode='contain' style={styles.icon} />
                            <Text style={styles.text}>THAY ACQUY</Text>
                            <Input style={styles.input}
                                placeholder='20'
                                keyboardType='numeric'
                                value={this.state.acquy == 0 ? null : this.state.acquy.toString()}
                                onChangeText={(text) => {
                                    let acquy = (text === "" || text === null) ? 0 : parseInt(text);
                                    this.setState({ acquy })
                                    this.checkInput(acquy);
                                }}
                                onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }}
                            />
                            <Text style={{ fontSize: 9 }}>Ngày</Text>
                        </View>
                        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, flexDirection: 'row', flex: 1, marginBottom: 5, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../image/check/red.png')} resizeMode='contain' style={styles.icon} />
                            <Text style={styles.text}>KIỂM TRA TOÀN BỘ </Text>
                            <Input style={styles.input}
                                placeholder='20'
                                keyboardType='numeric'
                                value={this.state.all == 0 ? null : this.state.all.toString()}
                                onChangeText={(text) => {
                                    var all = (text === "" || text === null) ? 0 : parseInt(text);
                                    this.setState({ all });
                                    this.checkInput(all);
                                }}
                                onFocus={(event) => {
                                    this._scrollToInput(findNodeHandle(event.target))
                                }} />
                            <Text style={{ fontSize: 9 }}>Ngày</Text>
                        </View>

                    </View>
                    <Modal transparent={true} position={"center"}
                        visible={this.state.modalVisible}
                        animationType={"slide"}
                        onRequestClose={() => { }}>
                        <View style={Style.modalbox}>
                            <View style={Style.innerContainer}>
                                <Text style={{ backgroundColor: 'transparent', padding: 20 }}>{this.state.label}</Text>
                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                    <TouchableHighlight
                                        style={[Style.button, { borderBottomRightRadius: 5, borderBottomLeftRadius: 5 }]}
                                        onPress={() => { this.setState({ modalVisible: false }) }}>
                                        <Text style={[Style.buttonText, { backgroundColor: 'transparent', }]}>ĐÓNG</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </KeyboardAwareScrollView>
        );
    }
    _renderItemComany() {
        items = [];
        for (let item of this.company)
            items.push(<Picker.Item key={item} label={item} value={item} />)
        return items;
    }
    _renderItemVehicle() {
        items = [];
        for (let item of this.vehicles[this.state.company])
            items.push(<Picker.Item key={item} label={item} value={item} />)
        return items;
    }
}

const mapStatetoProps = (state) => {
    return {
        personal: state.reduce.personal,
        oil: state.reduce.oil,
        brake: state.reduce.brake,
        tire: state.reduce.tire,
        acquy: state.reduce.acquy,
        all: state.reduce.all,
    }
};
export default connect(mapStatetoProps)(InfomationVehicle);


var styles = StyleSheet.create({
    input: {
        flex: 1,
        textAlign: 'right',
        height: 30
    },
    picker: {
        height: 80,
        flex: 1
    },
    icon: {
        width: 30,
        height: 30
    },
    text: {
        marginLeft: 10,
        fontSize: 9,
        flex: 1
    }
});