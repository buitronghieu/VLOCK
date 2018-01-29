'use strict';

import { AsyncStorage } from 'react-native';

export default class Utils {
	static link1 =  "125.212.226.54:21380/vlock";
	static APP_AUTHEN_SERVER = "http://125.212.226.54:21380/vlock/rest/vityportal/app_authen";
	static USER_ACTION_SERVER = "http://125.212.226.54:21380/vlock/rest/vityportal/user_action";
	static PRODUCT_CODE = "VLOCK";

	static validateEmail(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	static validatePhone(phone) {
		if (phone.charAt(0) == '+') {
			if (phone.substring(0, 3) != '+84') {
				return false;
			} else {
				var num = phone.substring(3, phone.length);
				if (isNaN(num))
					return false;
				if (num.charAt(0) != '0') {
					num = '0' + num;
					console.log(num);
				}
				if (num.length == 10 || num.length == 11) {
					return true;
				} else {
					return false;
				}
			}
		} else {
			if (isNaN(phone))
				return false;
			var num;
			if (phone.charAt(0) != '0')
				num = '0' + phone;
			else
				num = phone;
			if (num.length == 10 || num.length == 11) {
				return true;
			} else {
				return false;
			}
		}
	}

	static setLang(lang) {
		AsyncStorage.setItem("appLang", lang);
	}
	static verifyCode(){
		return Math.floor((Math.random() * 8999) + 1000);
	}
}