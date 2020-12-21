import { FAVORITE_CHANGE } from '../constants';
export function changeFavorites(lstObj) {
    return {
        type: FAVORITE_CHANGE,
        payload: lstObj
    }
}

