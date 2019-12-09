import {createStore, applyMiddleware} from "redux";
import rootReducer from "./modules";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant())));
};

export default configureStore;
