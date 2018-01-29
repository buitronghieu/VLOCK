
import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import {
    UPDATE_LANGUAGE,
    UPDATE_PERIPHERALS,
    UPDATE_PERIPHERALID,
    UPDATE_PERSIONAL,
    UPDATE_CONNECT_DEVICE,
    UPDATE_PINRFID,
    UPDATE_PINBLACKBOX,
    UPDATE_LISTKEYRFID,
    UPDATE_INSTANCEID,
    UPDATE_LOGIN,
    UPDATE_USERNAME,
    UPDATE_OIL,
    UPDATE_BRAKE,
    UPDATE_TIRE,
    UPDATE_ACQUY,
    UPDATE_ALL,
    UPDATE_NOTIFICATION,
    UPDATE_COLLISION,
    UPDATE_CONFIG_LIGHT,
    UPDATE_CONFIG_HORN,
    UPDATE_TOKEN,
    UPDATE_FIREBASE,
    UPDATE_ENABLEBLUETOOTH,
    UPDATE_ANTI_THEFT,
    UPDATE_SCAN,
    UPDATE_APP_FIRST,
    UPDATE_APP_FIRST_LOGIN
} from '../actions';
import { Language } from '../language/Language';

var DeviceInfo = require('react-native-device-info');
const appId = Platform.OS === 'ios' ? "1:1033751381614:ios:fa890c48570e769a" : "1:1033751381614:android:8fa798c3d3eca09d";
const DEFAULT_STATE = {
    isFirst: false,
    isFirstLogin: false,
    isConfig: false,
    appId,
    listKeyUUID: new Map(),
    peripherals: new Map(),
    peripheralId: null,
    clientId: DeviceInfo.getUniqueID(),
    username: null,
    isLogin: false,
    isConnect: false,
    isScan: false,
    enableBlueTooth: false,
    anti_theft: false,
    config_light: true,
    config_horn: true,
    collision: 5,
    firebase_token: null,
    token: null,
    personal: {
        username: "",
        motoType: "Honda-Wave RSX 110cc",
        licensePlate: "",
        iconMoto: require('../image/sample/honda.png')
    },
    instanceID: null,
    pinBlackbox: 0,
    pinRFID: 0,
    notification: {
            friend1: {
                name: null,
                email: null,
                phone: null,
                status: 'unregistered'
            },
            friend2: {
                name: null,
                email: null,
                phone: null,
                status: 'unregistered'
            },
            friend3: {
                name: null,
                email: null,
                phone: null,
                status: 'unregistered'
            }
    },
    oil: {
        value: 0,
        date: null
    },
    brake: {
        value: 0,
        date: null
    },
    tire: {
        value: 0,
        date: null
    },
    acquy: {
        value: 0,
        date: null
    },
    all: {
        value: 0,
        date: null
    },
    stringLanguage: Language,
    language: 'vi'
}
//'unregistered','registration','active'
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case UPDATE_LANGUAGE:
            {
                const language = action.language;
                Language.setLanguage(language);
                return {
                    ...state,
                    language,
                    stringLanguage: Language
                }
            }
        case UPDATE_PERIPHERALS: {
            return {
                ...state,
                peripherals: action.peripherals
            }
        }
        case UPDATE_PERIPHERALID: {
            return {
                ...state,
                peripheralId: action.peripheralId
            }
        }
        case UPDATE_PERSIONAL: {
            return {
                ...state,
                personal: action.personal
            }
        }
        case UPDATE_CONNECT_DEVICE: {
            return {
                ...state,
                isConnect: action.boolean
            }
        }
        case UPDATE_PINRFID: {
            return {
                ...state,
                pinRFID: action.pinRFID
            }
        }
        case UPDATE_PINBLACKBOX: {
            return {
                ...state,
                pinBlackbox: action.pinBlackbox
            }
        }
        case UPDATE_LISTKEYRFID: {
            return {
                ...state,
                listKeyUUID: action.listKeyUUID
            }
        }
        case UPDATE_INSTANCEID: {
            return {
                ...state,
                instanceID: action.instanceID
            }
        }
        case UPDATE_LOGIN: {
            return {
                ...state,
                isLogin: action.isLogin
            }
        }
        case UPDATE_USERNAME: {
            return {
                ...state,
                username: action.username
            }
        }
        case UPDATE_OIL: {
            return {
                ...state,
                oil: action.oil
            }
        }
        case UPDATE_BRAKE: {
            return {
                ...state,
                brake: action.brake
            }
        }
        case UPDATE_TIRE: {
            return {
                ...state,
                tire: action.tire
            }
        }
        case UPDATE_ACQUY: {
            return {
                ...state,
                acquy: action.acquy
            }
        }
        case UPDATE_ALL: {
            return {
                ...state,
                all: action.all
            }
        }
        case UPDATE_NOTIFICATION: {
            return {
                ...state,
                notification: action.notification
            }
        }
        case UPDATE_COLLISION: {
            return {
                ...state,
                collision: action.collision
            }
        }
        case UPDATE_CONFIG_LIGHT: {
            return {
                ...state,
                config_light: action.config_light
            }
        }
        case UPDATE_CONFIG_HORN: {
            return {
                ...state,
                config_horn: action.config_horn
            }
        }
        case UPDATE_TOKEN: {
            return {
                ...state,
                token: action.token
            }
        }
        case UPDATE_FIREBASE: {
            return {
                ...state,
                firebase_token: action.firebase
            }
        }
        case UPDATE_ENABLEBLUETOOTH: {
            return {
                ...state,
                enableBlueTooth: action.enableBlueTooth
            }
        }
        case UPDATE_ANTI_THEFT: {
            return {
                ...state,
                anti_theft: action.anti_theft
            }
        }
        case UPDATE_SCAN: {
            return {
                ...state,
                isScan: action.isScan
            }
        }
        case UPDATE_APP_FIRST: {
            return {
                ...state,
                isFirst: action.isFirst
            }
        }
        case UPDATE_APP_FIRST_LOGIN: {
            return {
                ...state,
                isFirstLogin: action.isFirstLogin
            }
        }
        default:
            return state;
    }
}