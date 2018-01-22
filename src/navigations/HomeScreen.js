import {TabNavigator}from 'react-navigation';
import ConditionStack from './ConditionStack';
import Condition from '../screen/Condition';
import {connect} from 'react-redux';
export default TabNavigator({
    Condition:{
        screen: ConditionStack,
        navigationOptions:{
            tabBarLabel: this.props.lang.status.toUpperCase()
        }
    },
},{
    tabBarPosition: 'bottom',
    tabBarOptions:{
        bottomNavigationOptions:{

        }
    }
})
const mapStateProps = (state)=>{
    lang: state.local.language
}
export default connect(mapStateProps)(ConditionStack);