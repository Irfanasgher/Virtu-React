import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers';
import thunk from 'redux-thunk';

export let store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
);