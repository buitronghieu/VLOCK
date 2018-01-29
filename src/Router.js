import {
	StackNavigator,
	TabNavigator
} from 'react-navigation';
import React from 'react';
import { Image } from 'react-native';

import SetUp from './screen/Setup';
import Condition from './component/screen/Condition';
import Company from './screen/Company';
import Termsofuse from './screen/Termsofuse';
import SingIn from './screen/SingIn';
import InfomationVehicle from './component/screen/InfomationVehicle';
import FindDevice from './screen/FindDevice';
import NotDevice from './screen/NotDevice';
import Maintenance from './component/screen/Maintenance';
import ConfigBlackBox from './screen/ConfigBlackBox';
import Register from './screen/Register';
import ForgotPassword from './screen/ForgotPassword';
import Profile from './component/screen/Profile';
import Language from './screen/Language';
import Account from './component/screen/Account'

const ConditionStack = StackNavigator({
	Condition_Screen: {
		screen: Condition,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.status.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b',
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			}
		})
	}
})

const SetupStack = StackNavigator({
	Setup_Screen: {
		screen: SetUp,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.setup.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b',
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			}
		})
	}
})

const MaintenanceStack = StackNavigator({
	Maintenance_Screen: {
		screen: Maintenance,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.maintenance.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b',
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			}
		})
	}
})

const AccountStack = StackNavigator({
	Maintenance_Screen: {
		screen: Account,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.account.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b',
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			}
		})
	}
})

const HomeStack = TabNavigator({
	Condition: {
		screen: ConditionStack,
		navigationOptions: ({ screenProps }) => ({
			tabBarLabel: screenProps.status.toUpperCase(),
			tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('./image/condition/black.png')}
					style={{
						width: 20,
						height: 20,
						tintColor: tintColor
					}}
				/>
			),
		})
	},
	Maintenance: {
		screen: MaintenanceStack,
		navigationOptions: ({ screenProps }) => ({
			tabBarLabel: screenProps.maintenance.toUpperCase(),
			tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('./image/dashboard/black.png')}
					style={{
						width: 20,
						height: 20,
						tintColor: tintColor
					}}
				/>
			),
		})
	},
	Setup: {
		screen: SetupStack,
		navigationOptions: ({ screenProps }) => ({
			tabBarLabel: screenProps.setup.toUpperCase(),
			tabBarIcon: ({ tintColor }) => (
				<Image
					source={require('./image/setting/black.png')}
					style={{
						width: 20,
						height: 20,
						tintColor: tintColor
					}}
				/>
			),
		})
	},
},
	{
		tabBarPosition: 'bottom',
		swipeEnabled: true,
		tabBarOptions: {
			style: {
				backgroundColor: '#dddddd'
			},
			activeTintColor: 'red'
		}
	});

export const AppStack = StackNavigator({
	Home: {
		screen: HomeStack,
		navigationOptions: {
			header: null,
			statusBarStyle: 'light-content'
		}
	},
	InfomationVehicle: {
		screen: InfomationVehicle,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.infomationVehicle.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
	Company: {
		screen: Company,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.company.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
	FindDevice: {
		screen: FindDevice,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.finddevice.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
	NotDevice: {
		screen: NotDevice,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.notDevice.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
	SingIn: {
		screen: SingIn,
		navigationOptions: () => ({
			header: null
		})
	},
	ConfigBlackBox: {
		screen: ConfigBlackBox,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.configBlackBox.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
	ForgotPassword: {
		screen: ForgotPassword,
		navigationOptions: ({ screenProps }) => ({
			header: null
		})
	},
	Register: {
		screen: Register,
		navigationOptions: ({ screenProps }) => ({
			header: null
		})
	},
	Profile: {
		screen: Profile,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.profile.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
	Termsofuse: {
		screen: Termsofuse,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.termsofuse.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
	Language: {
		screen: Language,
		navigationOptions: ({ screenProps }) => ({
			title: screenProps.language.toUpperCase(),
			headerStyle: {
				backgroundColor: '#c10b3b'
			},
			headerTitleStyle: {
				fontSize: 18,
				color: '#ffffff',
				alignSelf: 'center'
			},
			statusBarStyle: 'light-content'
		})
	},
});
