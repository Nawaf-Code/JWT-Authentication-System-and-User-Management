// @ts-ignore
import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    emailValid, emailNotValid,
    RESET_STATE,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGOUT,
    CREATE_USER
} from './types.js';


export const check_email = (email) => async (dispatch) => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };

    const requestData = { email: email };
    const body = JSON.stringify(requestData);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/check_email`, body, config);
      //console.log(res.data.email_exists);
  
      if (res.data.email_exists) {
        dispatch({ type: emailValid }); // Replace 'emailValid' with the actual action type for valid email
      } else {
        dispatch({ type: emailNotValid }); // Replace 'emailNotValid' with the actual action type for invalid email
      }
    } catch (err) {
      console.error(err);
    }
  };

export const create_user = (first_name ,last_name ,username ,password  ,major ,role ,gender_or_superFor,isLeader ) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const email = role === "SUPERVISOR" ? username+"@kfu.edu.sa" : username+"@student.kfu.edu.sa";
    const user_profile = role.toLowerCase()+'_profile';
    
    const data = {
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "role": role,
        user_profile: {
            "Status": true,
            "Is_Leader": isLeader,
            "Major": major,
            "Gender": gender_or_superFor
        }
    }
    const body = JSON.stringify(data);

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/register/`,body ,config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
}


export const re_set_state = () => dispatch => {
    dispatch({type: RESET_STATE});
}
export const checkAuthenticated = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }; 

        const body = JSON.stringify({token: localStorage.getItem('access')});

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,body ,config);

        try{
            if(res.data.code !== 'token_not_valid'){
                dispatch({type: AUTHENTICATED_SUCCESS})
            }else{
                dispatch({type: AUTHENTICATED_FAIL})
            }
        } catch(err){
            dispatch({type: AUTHENTICATED_FAIL})
        }
    }else{
        dispatch({type: AUTHENTICATED_FAIL}) 
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }; 

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};
export const sign_up = (username, first_name, last_name, password, role) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const email = role === "SUPERVISOR" ? username+"@kfu.edu.sa" : username+"@student.kfu.edu.sa";
    const body = JSON.stringify({email, username, first_name, last_name, password, role });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({uid, token});

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};
export const reset_password = (email) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    };
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    };
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
