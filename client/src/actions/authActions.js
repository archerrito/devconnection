//import { TEST_DISPATCH } from "./types";

//Register User 
// export const registerUser = (userData) => {
//     //return object, must have type
//     return {
//         // type: TEST_DISPATCH,
//         // //user data that gets passedinto action
//         // //dispatched to reducer with data
//         // payload: userData
//     }
// }

import axios from 'axios';
export const GET_ERRORS = 'GET_ERRORS';

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        //gives promise with result
        .then(res => history.push('/login'))
        .catch(err => 
            //making ajax call via redux-thunk
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}