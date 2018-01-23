import React, {PureComponent} from 'react';
import Notification from './Notification';
import { connect } from 'react-redux';

class Popup extends PureComponent{

    render(){
        if()
    }
}
const mapStateProps = (state)=>{
    return {modal: state.local.modal}
}
export default connect(mapStateProps)(Popup)
