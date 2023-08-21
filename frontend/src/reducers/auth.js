/* eslint-disable import/no-anonymous-default-export */
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
    emailNotValid,
    emailValid,
    RESET_EMAIL_STATE,
    LOGOUT
} from '../actions/types.js';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    isEmailValid: null,
    isEmailSent: null,
    isPassValid: null,
};

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }

        case emailNotValid:
            return{
                ...state,
                isEmailValid: false,
            }
        case emailValid:
            return{
                ...state,
                isEmailValid: true
            }
        case RESET_EMAIL_STATE:
            return{
                ...state,
                isEmailSent: null,
                isEmailValid: null
            }
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case PASSWORD_RESET_FAIL:
            return{
                ...state,
                isEmailSent: false
            }
        case PASSWORD_RESET_SUCCESS:
            return{
                ...state,
                isEmailSent: true,
                isEmailValid: null
            }
        case PASSWORD_RESET_CONFIRM_FAIL:
            return {
                ...state,
                isPassValid: false
            }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return {
                ...state,
                isPassValid: true
            }
        default:
            return state
    }
}