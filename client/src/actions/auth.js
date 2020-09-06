import Axios from "axios";
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, 
    ADMIN_SIGNIN_SUCCESS, ADMIN_SIGNIN_FAIL, ADMIN_SIGNIN_REQUEST } from "../constants/auth";

const signin = (email, password)=> async (dispatch)=> {
        dispatch({type:  USER_SIGNIN_REQUEST, payload:{email,password}})
        try {
            const {data} = await Axios.post('/signin', {email,password})
            dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
            Cookie.set('userInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
        }
  }

const signinAdmin = (email, password)=> async (dispatch)=> {
        dispatch({type:  ADMIN_SIGNIN_REQUEST, payload:{email,password}})
        try {
            const {data} = await Axios.post('/adminSignin', {email,password})
            dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
            Cookie.set('adminInfo', JSON.stringify(data));
        } catch (error) {
            dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.message });
        }
  }

const signup = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST, payload: { name, email, password } });
    try {
      const { data } = await Axios.post("/signup", { name, email, password });
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
      Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
    }
}

export {signin, signup, signinAdmin}