import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

@connect(mapStateProps= (state)=>{
    return {
        persional: state.local.personal,
        connect: state.device.connect,
        pinBlackbox: state.device.pinBlackbox,
        pinRFID: state.device.pinRFID,
        peripheralId: state.device.peripheralId,
        anti_theft: state.device.anti_theft
    }
})
export default class Condition extends PureComponent{

    render(){
        return(
            <View />
        )
    }
}

const styles= StyleSheet.create({

})