import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        //apply to every request
        //header value in postman
        axios.defaults.headers.common['Authorization']
    } else {
        //Delete Auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;