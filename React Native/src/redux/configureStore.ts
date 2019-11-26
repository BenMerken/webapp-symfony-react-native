import {createStore, applyMiddleware, compose} from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from "redux-thunk";

const configureStore = (initialState) => {
    const composeEnhancers =
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose; // add support for Redux dev tools

    return createStore(rootReducer, initialState,
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
    );
};

export default configureStore;
