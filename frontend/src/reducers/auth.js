import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/types";

function userLoginReducer(state = {}, action){
    switch (action.type){
        case LOGIN_REQUEST:
            return { loading: true };
        case LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case LOGIN_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

export{
    userLoginReducer
}