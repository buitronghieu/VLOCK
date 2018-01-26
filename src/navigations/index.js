import { StackNavigator } from 'react-navigation';
import HomeScreenStack from './HomeScreenStack';
import { InfomationVehicle, FindDevice, NotDevice, ConfigMaintenance, ConfigLanguage, TermsOfUser, ConfigBlackBox, ConfigLanguage, Company, Singin, Singup, ForgotPassword, Register, Profile } from '../screen';
export default StackNavigator({
    HomeScreen: {
        screen: HomeScreenStack,
        navigationOptions: {
            header: null,
            statusBarStyle: 'light-content'
        }
    },
    InfomationVehicle:{
        screen: InfomationVehicle,
        navigationOptions:({scrennProps}) =>({
            title: upperStr(scrennProps.infomationVehicle),
            ...configHeader
        })
    },
    FindDevice:{
        screen: FindDevice,
        navigationOptions:({scrennProps}) =>({
            title: upperStr(scrennProps.findDevice),
            ...configHeader
        })
    },
    NotDevice:{
        screen: NotDevice,
        navigationOptions:({scrennProps}) =>({
            title: upperStr(scrennProps.notDevice),
            ...configHeader
        })
    },
    ConfigBlackBox:{
        screen: ConfigBlackBox,
        navigationOptions:({scrennProps}) =>({
            title: upperStr(scrennProps.configBlackBox),
            ...configHeader
        })
    },
    ConfigLanguage:{
        screen: ConfigLanguage,
        navigationOptions:({scrennProps}) =>({
            title: upperStr(scrennProps.configLanguage),
            ...configHeader
        })
    },
    Company:{
        screen: Company,
        navigationOptions:({scrennProps}) =>({
            title: upperStr(scrennProps.company),
            ...configHeader
        })
    },
    TermsOfUser:{
        screen: TermsOfUser,
        navigationOptions:({scrennProps}) =>({
            title: upperStr(scrennProps.termsOfUser),
            ...configHeader
        })
    },
    Singin:{
        screen: Singin,
        navigationOptions:{
            header: null,
            statusBarStyle: 'dark-content'
        }
    },
    ForgotPassword:{
        screen: ForgotPassword,
        navigationOptions:{
            header: null,
            statusBarStyle: 'dark-content'
        }
    },
    Register:{
        screen: Register,
        navigationOptions:{
            header: null,
            statusBarStyle: 'dark-content'
        }
    },
})

export const upperStr = (str) =>{
    return str.toUpperCase();
}
export const configHeader = {
    headerStyle:{
        backgroundColor: '#c10b3b'
    },
    headerTitleStyle:{
        fontSize: 18,
        color: '#ffffff',
        alignSelf: 'center'
    },
    statusBarStyle: 'light-content'
}