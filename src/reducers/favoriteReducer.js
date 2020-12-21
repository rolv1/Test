import { FAVORITE_CHANGE } from '../constants';


const initialState = {
    lstObj: {
        count: 0,
        list: []
    }

};
const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAVORITE_CHANGE:
            return {
                ...state,
                lstObj: action.payload
            };

        default:
            return state;
    }
}
export default favoriteReducer;