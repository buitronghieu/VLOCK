import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';

export default class ASyncManager{
    static setAsync(key, value){
       await AsyncStorage.setItem(key, JSON.stringify(value))
    }

    static setLanguage(lang){
        this.setAsync("language", lang);
    }
}