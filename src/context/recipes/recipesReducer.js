import {
    GET_RECIPE,
    GET_RECIPES,
    DELETE_RECIPE,
    SET_LOADING
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            }
        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload,
                loading: false
            }
        case DELETE_RECIPE:
            return {
                ...state,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}