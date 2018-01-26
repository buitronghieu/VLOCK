import React, { Component, PureComponent } from 'react';
import { View, AsyncStorage } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import Root from './src/navigations';
import { connect } from 'react-redux';
import {WellCome}from './src/screen'

@connect(mapStateProps = (state) => {
  return {
    nav: state.nav,
    loading: state.local.loading
  }
}, {})
export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      loadding: true
    }
  }
  componentWillMount() {
    // this.props.getUser();
    this.getAsyncLocal();
  }
  async getAsyncLocal() {
    try {

      const keys = await AsyncStorage.getAllKeys();

      await AsyncStorage.multiGet(keys, (err, storages) => {
        storages.map((result, i, storage) => {
          let key = storages[i][0];
          let value = storages[i][1];
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    if (this.props.loading) {
      return (
        <View style={{ flex: 1 }}>
          < Root navigation={addNavigationHelpers({ dispatch: this.props.dispatch, state: this.props.nav })} />
        </View>
      );
    }
    return <WellCome />

  }
}
const mapStateProps = (state) => {
  return {
    nav: state.nav,
    loading: state.local.loading
  }
}

