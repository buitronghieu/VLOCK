import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image, FlatList, AsyncStorage } from 'react-native';
import { StyleCondition, Style } from '../style/Style';
import { connect } from 'react-redux';
import {
    updateLanguage
} from '../actions'
class Language extends Component {
    static navigationOptions = ({ navigation, screenProps }) => {
        const { goBack } = navigation;
        return {
            headerLeft: <TouchableHighlight style={{ flex: 1, paddingLeft: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => { goBack() }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>{screenProps.back}</Text>
            </TouchableHighlight>,
            headerRight: <TouchableHighlight style={{ flex: 1, paddingRight: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
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
            key: this.props.language
        }
        save = this.save.bind(this);
    }
    save() {
        store.dispatch(updateLanguage(this.state.key));
        AsyncStorage.setItem('language', JSON.stringify(this.state.key));
    }
    _renderItem = ({ item }) => (
            <View style={[{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',paddingTop: 5, paddingBottom:5 }, Style.border]}>
                <TouchableHighlight style={{ flex: 1}} onPress={() => {this.setState({key: item.key})}}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text>{item.header}</Text>
                    <Text style={{fontSize: 10}}>{item.footer}</Text>
                </View>
                </TouchableHighlight>
                <Image style={[{ opacity: (this.state.key === item.key) ? 1 : 0 }, styles.image]} source={require('../image/tick.png')} resizeMode='contain'/>
            </View>
    );
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[{ key: 'vi', header: 'Tiếng Việt', footer: 'Tiếng Việt ' }, { key: 'en', header: 'English', footer: 'Tiếng Anh' }]}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}
const mapStatetoProps = (state) => {
    return {
        language: state.reduce.language
    }
};
export default connect(mapStatetoProps)(Language);
var styles = StyleSheet.create({
    row: {
        paddingTop: 10,
        flexDirection: 'row',
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 15,
        height: 15,
        marginLeft: 10,
        marginRight: 10
    },
    button: {
        borderBottomWidth: 0.5,
        flex: 1,
        borderBottomColor: '#f5f5f5',
        marginLeft: 10,
    }
}) 