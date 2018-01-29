import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Style } from './style'
export default class Input extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TextInput style={[styles.textInput, this.props.style]}
                placeholder={this.props.placeholder}
                value={this.props.value}
                keyboardType={this.props.keyboardType}
                underlineColorAndroid='transparent'
                onChangeText={(text) => {
                    this.props.onChangeText(text);
                }}
                ref={this.props.ref}
                onFocus ={(event) =>this.props.onFocus === undefined ? null: this.props.onFocus(event)}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#f5f5f5',
        paddingLeft: 10,
        paddingRight:10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    },
});