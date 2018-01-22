import React, { Component } from 'react';
import {View} from 'react-native';
import{addNavigationHelpers} from 'react-navigation';
import Root from './src/navigations';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        < Root navigation={addNavigationHelpers({dispatch: this.props.dispatch, state: this.props.nav})}/>
      </View>
    );
  }
}
const mapStateProps = (state)=>{
  return{nav: state.nav}
}

export default connect(mapStateProps)(App);
