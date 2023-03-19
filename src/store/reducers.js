import {combineReducers} from 'redux';
import {fetchDefaultPageReducer} from "./default_page/reducers";

export default combineReducers({
    default_page: fetchDefaultPageReducer,
});