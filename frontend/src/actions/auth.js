import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
  } from "./types";
  
  import Axios from 'axios';
import Cookie from 'js-cookie';

  const login = (email,password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST, payload: { email, password }});
    try{
        const {data} = await Axios.post("/login", { email, password });
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data))
    } catch (error){
        dispatch({ type:LOGIN_FAIL, payload: error.message });
    }
}
  
  export const logout = () => (dispatch) => {
  
    dispatch({
      type: LOGOUT,
    });
  };

  export { login }