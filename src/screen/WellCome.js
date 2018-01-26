import React , {PureComponent}from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

@connect(mapStateProps = (state)=>{
    return {
        loading: state.local.loading
    }
})
export default class WellCome extends PureComponent{

    render(){
        <View />
    }
}