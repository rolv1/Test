import { createStore, combineReducers } from 'redux';
import countReducer from '../src/reducers/countReducer';
import favoriteReducer from '../src/reducers/favoriteReducer';
import userReducer from '../src/reducers/userReducer';
const rootReducer = combineReducers({
    count: countReducer,
    user: userReducer,
    lstObj: favoriteReducer
});
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;