import {StackNavigator}from 'react-navigation';
import {Maintenance} from '../screen';
import {upperStr, configHeader} from './'
export default ConditionStack =  StackNavigator({
    Maintenance:{
        screen: Maintenance,
        navigationOptions:({screenProps})=>({
            tabBarLabel: upperStr(screenProps.maintenance),
            ...configHeader
        })
    }
})


