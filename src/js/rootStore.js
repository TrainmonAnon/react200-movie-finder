import { createStore, applyMiddleware, compose } from 'redux';
import { createPromise } from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {
    items: [],
    item : {
        search:{}
    }
};
const middleware = [createPromise(), thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default rootStore;
