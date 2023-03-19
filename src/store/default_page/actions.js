import {Buffer} from "buffer";

export const SET_PASSWORD = 'SET_PASSWORD'
export const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS'
export const SET_PERM = 'SET_PERM'
export const SET_WEB3_STATUS = 'SET_WEB3_STATUS'
export const SET_ACCEPT_SUCCESS = 'SET_ACCEPT_SUCCESS'
export const FETCH_PERM_LIST_SUCCESS = 'FETCH_PERM_LIST_SUCCESS'

export const setPassword = (password) => {
    return {
        type: SET_PASSWORD,
        payload: password
    }
}

export const setLoginStatus = (status) => {
    return {
        type: SET_LOGIN_STATUS,
        payload: status
    }
}

export const setWeb3Status = (status) => {
    return {
        type: SET_WEB3_STATUS,
        payload: status
    }
}

export const setAcceptSuccess = (status) => {
    return {
        type: SET_ACCEPT_SUCCESS,
        payload: status
    }
}

export const setPerm = (name, value) => {
    return {
        type: SET_PERM,
        payload: [name, value]
    };
}

export const fetchPermListSuccess = (profile) => {
    let _perm_list = JSON.parse(Buffer.from(profile['profile'], "base64"))

    return {
        type: FETCH_PERM_LIST_SUCCESS,
        payload: _perm_list
    }
}

export const fetchPermList = (url) => {
    return (dispatch) => {
        fetch(url)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.statusText)
                }
                return response
            })
            .then(response => response.json())
            .then(profile => dispatch(fetchPermListSuccess(profile)))
    }
}