import React, { useContext, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import RecipesContext from '../../context/recipes/recipesContext';
import Spinner from '../Spinner/Spinner';

const RecipeGrid = () => {

    const recipesContext = useContext(RecipesContext);
    const { recipes, loading, getRecipes } = recipesContext;

    useEffect(() => {
        getRecipes();

        //eslint-disable-next-line
    }, []);

    if (loading) return <Spinner />;
    if (recipes === undefined) return <h1>Please add some recipes.</h1>
    return (
        <div className="recipe-grid">
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );


}

export default RecipeGrid;
