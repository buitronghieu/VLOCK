import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
class Condition extends PureComponent{

    render(){
        return(
            <View />
        )
    }
}
const mapStateProps=(state)=>{
    return {state}
}
export default connect(mapStateProps)(Condition);