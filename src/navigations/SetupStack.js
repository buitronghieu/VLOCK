import {StackNavigator}from 'react-navigation';
import {Setup} from '../screen';
import {upperStr, configHeader} from './'
export default ConditionStack =  StackNavigator({
    Setup:{
        screen: Setup,
        navigationOptions:({screenProps})=>({
            tabBarLabel: upperStr(screenProps.setup),
            ...configHeader
        })
    }
})


