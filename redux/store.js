import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import data from './redurcers';

const rootReducer = combineReducers({data});

export const Store = createStore(rootReducer, applyMiddleware(thunk));