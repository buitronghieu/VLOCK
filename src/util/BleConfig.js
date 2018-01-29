'use strict'
import React from 'react';
import { Platform } from 'react-native';
const SERVICE = "ee0c4x00-8786-40ba-ab96-99b919c989e9";
export default class BleConfig {
    constructor(){
    }

    static EDDYSTONE_SERVICE_UUID = Platform.OS === 'android'? "0000feaa-0000-1000-8000-00805f9b34fb" : "0000FEAA-0000-1000-8000-00805F9B34FB";
    static MHPADLOCK =  Platform.OS === 'android' ? SERVICE.replace("4x00", "4400") : SERVICE.replace("4x00", "4400").toUpperCase();
    static IDTAGBT_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4401") : SERVICE.replace("4x00", "4401").toUpperCase();
    static IDTAGAL_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4402"): SERVICE.replace("4x00", "4402").toUpperCase();
    static PADLOCKTM_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4403"): SERVICE.replace("4x00", "4403").toUpperCase();
    static PADLOCKCCFG_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4404"): SERVICE.replace("4x00", "4404").toUpperCase();
    static PADLOCKIOCFG_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4405"): SERVICE.replace("4x00", "4405").toUpperCase();
    static PADLOCKACCCFG_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4406"): SERVICE.replace("4x00", "4406").toUpperCase();
    static PADLOCKACCX_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4407") : SERVICE.replace("4x00", "4407").toUpperCase();
    static PADLOCKACCY_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4408"): SERVICE.replace("4x00", "4408").toUpperCase();
    static PADLOCKACCZ_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4409") : SERVICE.replace("4x00", "4409").toUpperCase();
    static PADLOCKCLIENT0_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "440a"): SERVICE.replace("4x00", "440a").toUpperCase();
    static PADLOCKCLIENT1_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "440b") : SERVICE.replace("4x00", "440b").toUpperCase();
    static PADLOCKCLIENT2_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "440c"): SERVICE.replace("4x00", "440c").toUpperCase();
    static PADLOCKCLIENT3_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "440d") : SERVICE.replace("4x00", "440d").toUpperCase();
    static PADLOCKCLIENT4_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "440e"): SERVICE.replace("4x00", "440e").toUpperCase();
    static PADLOCKCLIENT5_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "440f") : SERVICE.replace("4x00", "440f").toUpperCase();
    static PADLOCKCLIENT6_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4410"): SERVICE.replace("4x00", "4410").toUpperCase();
    static PADLOCKCLIENT7_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4411"): SERVICE.replace("4x00", "4411").toUpperCase();
    static PADLOCKCLIENT8_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4412"): SERVICE.replace("4x00", "4412").toUpperCase();
    static PADLOCKCLIENT9_CHARACTERISTIC = Platform.OS === 'android' ? SERVICE.replace("4x00", "4413"): SERVICE.replace("4x00", "4413").toUpperCase();

    static BATTERY_SERVICE = Platform.OS === 'android' ? "180f" :  "180F";
    static BATTERY_LEVEL_CHARACTERISTIC = Platform.OS === 'android' ? "2a19": "2A19";

    static TLM_FRAME = 0x20;
    static UID_FRAME = 0x00;

    static validate(dataService) {
        switch (dataService[0]) {
            case this.UID_FRAME: {
                const dataHex = this.convertArraytoHex(dataService);
                return {
                    namespaceID: dataHex.substr(4, 20),
                    instanceID: dataHex.substr(24, 12)
                }
            }
            case this.TLM_FRAME: {
                return {
                    battery: dataService[2] * 256 + dataService[3]
                }
            }
            default:
                return null;
        }
    }

    static convertArraytoHex(array) {
        var hex = [];
        for (var i = 0; i < array.length; i++) {
            hex.push((array[i] >>> 4).toString(16));
            hex.push((array[i] & 0xF).toString(16));
        }
        return hex.join("");
    }

    static reverseStr(str) {
        if (str != null) {
            var i = str.length, o = '';
            while (i > 0) {
                o += str.substring(i - 2, i);
                i -= 2;
            }
            return o;
        }
    }
    static convertArraytoString(array){
        return String.fromCharCode.apply(null,new Uint16Array(array));
    }
}
