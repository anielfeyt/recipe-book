import React, { useReducer } from 'react';
import RecipesContext from './recipesContext';
import RecipesReducer from './recipesReducer';
import {
    GET_RECIPES,
    GET_RECIPE,
    POST_RECIPE,
    DELETE_RECIPE,
    UPDATE_RECIPE,
    SET_EDITING,
    SET_LOADING
} from '../types';

import firebase from '../../services/firebase';


const RecipesState = props => {
    const initialState = {
        recipes: [],
        recipe: {},
        loading: false,
        editing: false
    }

    const [state, dispatch] = useReducer(RecipesReducer, initialState);

    // Get Recipes
    const getRecipes = () => {
        setLoading();

        const recipesRef = firebase.database().ref('recipes');
        recipesRef.on('value', (snapshot) => {
            let recipes;
            if (snapshot.val() === null) {
                recipes = undefined;
            } else {
                recipes = Object.keys(snapshot.val()).map(resData => {
                    return {
                        id: resData,
                        title: snapshot.val()[resData].title,
                        ingredients: snapshot.val()[resData].ingredients,
                        instructions: snapshot.val()[resData].instructions,
                    }
                })
            }

            dispatch({
                type: GET_RECIPES,
                payload: recipes
            });
        });
    }

    // Get a single Recipe
    const getSingleRecipe = (rId) => {
        setLoading();

        const recipesRef = firebase.database().ref(`recipes/${rId}`);
        recipesRef.once('value', (snapshot) => {

            dispatch({
                type: GET_RECIPE,
                payload: snapshot.val()
            });

        });

    }

    // Update the edited Recipe
    const updateRecipe = (rId, recipe) => {
        setLoading();

        const recipesRef = firebase.database().ref(`recipes/${rId}`);
        recipesRef.update(recipe);

        dispatch({
            type: UPDATE_RECIPE
        });

    }

    // Post a Recipe to the database
    const postRecipe = (title, ingredients, instructions) => {

        firebase.database().ref(`recipes/`).push({
            title: title,
            ingredients: ingredients,
            instructions: instructions
        })
            .catch(error => {
                console.log("Could not post recipe.");
                return error;
            });

        dispatch({
            type: POST_RECIPE
        });

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
            .catch(error => {
                console.log("Could not delete recipe.");
                return error;
            });
    }

    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    // Set Editing
    const setEditing = () => dispatch({ type: SET_EDITING });

    return <RecipesContext.Provider value={{
        recipes: state.recipes,
        recipe: state.recipe,
        loading: state.loading,
        editing: state.editing,
        getRecipes,
        getSingleRecipe,
        postRecipe,
        deleteRecipe,
        updateRecipe,
        setEditing
    }}>
        {props.children}
    </RecipesContext.Provider>

}

export default RecipesState;