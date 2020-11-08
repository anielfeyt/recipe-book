import {
    GET_RECIPE,
    GET_RECIPES,
    DELETE_RECIPE,
    UPDATE_RECIPE,
    SET_EDITING,
    SET_LOADING,
    POST_RECIPE
} from '../types'

const reduce = (state, action) => {
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
        case POST_RECIPE:
            return {
                ...state
            }
        case UPDATE_RECIPE:
            return {
                ...state,
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
        case SET_EDITING:
            return {
                ...state,
                editing: true
            }
        default:
            return state;
    }
}

export default reduce;