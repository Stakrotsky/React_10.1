import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { tasksReducer, uiReducer, filterReducer } from './reducers/index';

const rootReducer = combineReducers({
	tasks: tasksReducer,
	ui: uiReducer,
	filters: filterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
