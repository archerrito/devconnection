// import { TEST_DISPATCH } from '../actions/types';

//takes initial state, action
//we'll dispatch actions to this reducer, test with switch
// export default function(state = initialState, action) {
//     //action has to be type or payload data
//     switch(action.type) {
//         case TEST_DISPATCH:
//             return {
//                 //Doesn't change or mutate state
//                 //makes copy
//                 //add to new state using spread operator
//                 ...state,
//                 //fill user with payload which is user data from action
//                 user: action.payload
//             }
//         default:
//             return state;
//     }
// }

import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER } from '../actions/types';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {

    switch(action.type) {
        case SET_CURRENT_USER:
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }
        default:
            return state;
    }
} 