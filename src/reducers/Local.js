import React from 'react';
import {Platform} from 'react-native';
import {UPDATE_LANGUAGE} from '../types';
import Language from '../language';
const LanguageDefault = ()=>{
    Language.setLanguage("vi");
    return Language;
}
const appId = Platform.select({
    ios: "1:1033751381614:ios:fa890c48570e769a",
    android: "1:1033751381614:android:8fa798c3d3eca09d"
})
const DEFAULT_STATE ={
    appId,
    stringLanguage: 'vi',
    language: LanguageDefault
}

export default (state = DEFAULT_STATE, action)=>{
    switch (action.type) {
        case UPDATE_LANGUAGE:
            Language.setLanguage(action.payload);
            return{
                ...state,
                stringLanguage: action.payload,
                language: Language
            }
            break;
    
        default:
            break;
    }
}