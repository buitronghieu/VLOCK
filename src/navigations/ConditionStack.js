import {StackNavigator}from 'react-navigation';
import {Condition} from '../screen';
import {upperStr, configHeader} from './'
export default ConditionStack =  StackNavigator({
    Condition:{
        screen: Condition,
        navigationOptions:({screenProps})=>({
            tabBarLabel: upperStr(screenProps.status),
            ...configHeader
        })
    }
})


