import {TabNavigator}from 'react-navigation';
import ConditionStack from './ConditionStack';
import MaintenanceStack from './MainMaintenanceStack';
import SetupStack from './SetupStack';
import{upperStr, configHeader} from './'
export default TabNavigator({
    ConditionStack:{
        screen: ConditionStack,
        navigationOptions:({screenProps})=>({
            tabBarLabel: upperStr(screenProps.status),
        })
    },
    MaintenanceStack:{
        screen: MaintenanceStack,
        navigationOptions:({screenProps})=>({
            tabBarLabel: upperStr(screenProps.status),
        })
    },
    SetupStack:{
        screen: SetupStack,
        navigationOptions:({screenProps})=>({
            tabBarLabel: upperStr(screenProps.setup),
        })
    },
},{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        bottomNavigationOptions:{
            tabs:{
                
            }
        }
    }
})