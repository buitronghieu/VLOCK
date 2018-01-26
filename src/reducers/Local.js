import React from 'react';
import { Platform } from 'react-native';
import { UPDATE_LANGUAGE, UPDATE_PERSONAL } from '../types';
import Language from '../language';
const LanguageDefault = () => {
    Language.setLanguage("vi");
    return Language;
}
const DEFAULT_STATE = {
    loading: false,
    stringLanguage: 'vi',
    language: LanguageDefault,
    personal: {
        username: null,
        motoType: "Honda-Ware RSX 110cc",
        licensePlace: null,
        iconMoto: require('../image/honda.png')
    },
    modal: []
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case UPDATE_LANGUAGE:
            Language.setLanguage(action.payload);
            return {
                ...state,
                stringLanguage: action.payload,
                language: Language
            }
        case UPDATE_PERSONAL:
            return {
                ...state,
                personal: action.payload
            }
        default:
            break;
    }
}