const initialState = {
    isAuthenticated: false,
    user: {}
}

//takes initial state, action
//we'll dispatch actions to this reducer, test with switch
export default function(state = initialState, action) {
    //action has to be type or payload data
    switch(action.type) {
        default:
        return state;
    }
} 