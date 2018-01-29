import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Style} from '../../style/Style';
import MaintenanceChild from '../layout/Maintenance';
import { connect } from 'react-redux';
export default class Maintenance extends Component{
    render(){
        return(
            <ScrollView style={Style.background}>
            <View style={{paddingTop: 10}}>
                <View style={styles.row}>
                    <MaintenanceChild image={require('../image/oil/red.png')} text={'Thay dầu'} keyLoad={'oil'} navigation={this.props.navigation}/>
                </View>
                 <View style={styles.row}>
                    <MaintenanceChild image={require('../image/brake/red.png')} text={'Bảo hành phanh'} keyLoad={'brake'} navigation={this.props.navigation}/>
                </View>
                <View style={styles.row}>
                    <MaintenanceChild image={require('../image/tire/red.png')} text={'Thay lốp'} keyLoad={'tire'} navigation={this.props.navigation}/>
                </View>
                <View style={styles.row}>
                    <MaintenanceChild image={require('../image/acquy/red.png')} text={'Thay acquy'} keyLoad={'acquy'} navigation={this.props.navigation}/>
                </View>
                 <View style={styles.row}>
                    <MaintenanceChild image={require('../image/check/red.png')} text={'Kiểm tra toàn bộ'} keyLoad={'all'} navigation={this.props.navigation}/>
                </View>
            </View>   
            </ScrollView>
        );
        
    }
}

var styles = StyleSheet.create({
    row: {
        height:130, 
        padding: 10,
    }
})