import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer } from './reducers/auth';
import Cookie from 'js-cookie';

const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userLogin: { userInfo }};
const reducer = combineReducers({
   userLogin: userLoginReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;