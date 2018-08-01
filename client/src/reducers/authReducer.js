import { TEST_DISPATCH } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

//takes initial state, action
//we'll dispatch actions to this reducer, test with switch
export default function(state = initialState, action) {
    //action has to be type or payload data
    switch(action.type) {
        case TEST_DISPATCH:
            return {
                //Doesn't change or mutate state
                //makes copy
                //add to new state using spread operator
                ...state,
                //fill user with payload which is user data from action
                user: action.payload
            }
        default:
            return state;
    }
} 