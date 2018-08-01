import { GET_ERRORS } from '../actions/types';
const initialState = {};

export default function(state = initialState, action) {

    switch(action.type) {
        case GET_ERRORS:
            //includes errors objec that comes from server
            return action.payload
        default:
            return state;
    }
} 