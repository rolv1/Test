import { createStore, combineReducers } from 'redux';
import favoriteReducer from '../src/reducers/favoriteReducer';
import userReducer from '../src/reducers/userReducer';
const rootReducer = combineReducers({
    user: userReducer,
    lstObj: favoriteReducer
});
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;