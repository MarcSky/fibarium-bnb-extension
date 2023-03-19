import {
    FETCH_PERM_LIST_SUCCESS,
    SET_ACCEPT_SUCCESS,
    SET_LOGIN_STATUS,
    SET_PASSWORD,
    SET_PERM,
    SET_WEB3_STATUS
} from "./actions";

const defaultState = {
    password: "",
    login_status: false,
    web3status: false,
    accept_success: false,

    perm_list: [{"k": "wallet", "v": true}, {"k": "twitter", "v": "@tom"}, {"k": "BAB", "v": true}],
    perms: {"wallet": false, "twitter": false, "BAB": false},
};

export const fetchDefaultPageReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_PERM_LIST_SUCCESS:
            let _perms = {}
            action.payload.map(function(d){
                return (
                    _perms[d['k']] = true
                )})
            return { ...state, perm_list: action.payload, perms: _perms };
        case SET_PASSWORD:
            return { ...state, password: action.payload };
        case SET_LOGIN_STATUS:
            return { ...state, login_status: action.payload };
        case SET_PERM:
            let state_perms = { ...state.perms }
            state_perms[action.payload[0]] = action.payload[1]
            return { ...state, perms: state_perms };
        case SET_WEB3_STATUS:
            return { ...state, web3status: action.payload };
        case SET_ACCEPT_SUCCESS:
            return { ...state, accept_success: action.payload };
        default:
            return state;
    }
};