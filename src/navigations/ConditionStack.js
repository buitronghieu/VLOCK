import {StackNavigator}from 'react-navigation';
import Condition from '../screen/Condition';
import {connect} from 'react-redux';
const ConditionStack =  StackNavigator({
    Condition:{
        screen: Condition,
        navigationOptions:{

        }
    }
})

const mapStateProps = (state)=>{
    lang: state.local.language
}
export default connect(mapStateProps)(ConditionStack);

