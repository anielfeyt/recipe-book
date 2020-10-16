import React, { useReducer } from 'react';
import RecipesContext from './recipesContext';
import RecipesReducer from './recipesReducer';
import {
    GET_RECIPES,
    GET_RECIPE,
    DELETE_RECIPE,
    SET_LOADING
} from '../types';

import firebase from '../../services/firebase';


const RecipesState = props => {
    const initialState = {
        recipes: [],
        recipe: {},
        loading: false
    }

    const [state, dispatch] = useReducer(RecipesReducer, initialState);

    // Get Recipes
    const getRecipes = () => {
        setLoading();

        const recipesRef = firebase.database().ref('recipes');
        recipesRef.on('value', (snapshot) => {
            const recipes = Object.keys(snapshot.val()).map(resData => {
                return {
                    id: resData,
                    title: snapshot.val()[resData].title,
                    ingredients: snapshot.val()[resData].ingredients,
                    instructions: snapshot.val()[resData].instructions,
                }
            })
            dispatch({
                type: GET_RECIPES,
                payload: recipes
            });
        })
    }

    // Get a single Recipe
    const getSingleRecipe = (rId) => {
        setLoading();

        const recipesRef = firebase.database().ref(`recipes/${rId}`);
        recipesRef.on('value', (snapshot) => {

            dispatch({
                type: GET_RECIPE,
                payload: snapshot.val()
            });
        })


    }

    // Delete a single Recipe
    const deleteRecipe = (rId) => {
        setLoading();

        const recipesRef = firebase.database().ref(`recipes/${rId}`);
        recipesRef.remove(res => {

            dispatch({
                type: DELETE_RECIPE
            });
        })


    }

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING })

    return <RecipesContext.Provider value={{
        recipes: state.recipes,
        recipe: state.recipe,
        loading: state.loading,
        getRecipes,
        getSingleRecipe,
        deleteRecipe
    }}>
        {props.children}
    </RecipesContext.Provider>

}

export default RecipesState;