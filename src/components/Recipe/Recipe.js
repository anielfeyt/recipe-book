import React, { useContext, useEffect } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
import Spinner from '../Spinner/Spinner';

import './Recipe.css';

const Recipe = ({ match }) => {
    const recipesContext = useContext(RecipesContext);
    const { recipe, getSingleRecipe } = recipesContext;

    useEffect(() => {
        getSingleRecipe(match.params.rId);
        //eslint-disable-next-line
    }, []);

    const { title, ingredients, instructions } = recipe;

    if (ingredients === undefined) return <Spinner />; // Ensures there are values in the state for ingredients before loading.

    return (
        <div className="recipe-sheet">
            <h1>{title}</h1>
            <div className="recipe-ingredients">
                <ul>
                    {ingredients.map(ig => {
                        let ingredientKey = "ig-" + Math.random() * 1000;
                        return <li key={ingredientKey}>{ig}</li>
                    })}
                </ul>
            </div>
            <div className="recipe-instructions">
                <p style={{ whiteSpace: 'pre-line' }}>{instructions}</p>
            </div>
        </div>
    );
}

export default Recipe;

