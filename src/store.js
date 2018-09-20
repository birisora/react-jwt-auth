import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
// loadAuthToken tries to retrieve token from localStorage using getItem method
// returns token if exists or null otherwise
// if exists, dispatch setAuthToken action to store in state
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    // since JWT are time limited, we send a req often from client to obtain
    // a fresh token. Replaces current token and use for further req to API
    // action defined in actions/auth.js
    store.dispatch(refreshAuthToken());
}

export default store;
