import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipes/recipesContext';
import './Recipe.css';
import binIcon from '../../assets/bin_icon.svg';
import editIcon from '../../assets/edit_icon.svg';

const Recipe = (props) => {
    const recipeContext = useContext(RecipeContext);
    const { deleteRecipe } = recipeContext;

    const { id, title, ingredients, instructions } = props.recipe;

    // Filter the instructions to display a limited description on the cards
    let excerpt = instructions;
    const excerptLength = 25;

    const instructionsLength = (inst) => {
        return inst.split(' ');
    }

    const instructionsArr = instructionsLength(instructions);

    if (instructionsArr.length > excerptLength) {
        const excerptArr = instructionsArr.slice(0, excerptLength - 1);
        excerpt = excerptArr.join(' ').concat(' ...');
    }

    const deleteRecipeHandler = (rId) => {
        deleteRecipe(rId);
        // console.log(rId);
    }

    return (

        <div className="recipe-card">
            <div className="recipe-head">
                <h3>{title}</h3>
            </div>
            <div className="recipe-ingredients">
                <ul>
                    {ingredients.map(ig => {
                        let ingredientKey = "ig-" + id.toString().concat(Math.random() * 1000);
                        return <li key={ingredientKey}>{ig}</li>
                    })}
                </ul>
            </div>
            <div className="recipe-instructions">
                <p>{excerpt}</p>
            </div>

            <Link to={`/recipe/${id}`} className="btn btn-default card-btn-bottom-left" >View</Link>
            <div className="card-controls">
                <span className="edit">
                    <img src={editIcon} alt="edit icon" />
                </span>
                <span className="delete" onClick={() => deleteRecipeHandler(id)}>
                    <img src={binIcon} alt="delete icon" />
                </span>
            </div>

        </div>
    );
}

export default Recipe;