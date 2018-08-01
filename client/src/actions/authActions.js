import { TEST_DISPATCH } from "./types";

//Register User 
export const registerUser = (userData) => {
    //return object, must have type
    return {
        type: TEST_DISPATCH,
        //user data that gets passedinto action
        //dispatched to reducer with data
        payload: userData
    }
}