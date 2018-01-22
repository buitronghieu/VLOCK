import Root from '../navigations';
export default (state, action)=>{
    const newState = Root.router.getStateForAction(action, state);
    return newState|| state;
}