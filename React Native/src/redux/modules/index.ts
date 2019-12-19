import {combineReducers} from "redux";
import room from './room';
import asset from './asset';
import ticket from './ticket';

export default combineReducers({
    room,
    asset,
    ticket
})
