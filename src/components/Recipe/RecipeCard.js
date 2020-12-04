import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/recipes/recipesContext';
import './RecipeCard.css';
import binIcon from '../../assets/bin_icon.svg';
import editIcon from '../../assets/edit_icon.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recipe = (props) => {
    const recipeContext = useContext(RecipeContext);
    const { deleteRecipe } = recipeContext;

    const { id, title, ingredients, instructions } = props.recipe;

    // Filter the instructions to display a limited description on the cards
    let excerpt = instructions;
    const ingedientsPreviewLength = 4;
    const excerptLength = 25;

    let ingedientsPreview = ingredients;

    if (ingredients.length >= ingedientsPreviewLength) {
        ingedientsPreview = ingredients.slice(0, ingedientsPreviewLength);
    }

    const instructionsLength = (inst) => {
        return inst.split(' ');
    }

    const instructionsArr = instructionsLength(instructions);

    if (instructionsArr.length > excerptLength) {
        const excerptArr = instructionsArr.slice(0, excerptLength - 1);
        excerpt = excerptArr.join(' ').concat(' ...');
    }

    const deleteRecipeHandler = (rId) => {
        const msg = deleteRecipe(rId);

        if (msg === undefined) {
            toast.error('Recipe Deleted!');
        } else {
            toast.error('Denied! Please change your credentials.');
        }
    }

    return (
        <div className="recipe-card">
            <div className="recipe-head">
                <h3>{title}</h3>
            </div>
            <div className="recipe-ingredients">
                <ul>
                    {ingedientsPreview.map(ig => {
                        let ingredientKey = "ig-" + id.toString().concat(Math.random() * 1000);
                        return <li key={ingredientKey}>{ig}</li>
                    })}
                </ul>
            </div>
            <div className="recipe-instructions">
                <p style={{ whiteSpace: 'pre-line' }}>{excerpt}</p>
            </div>

            <Link to={`/recipe/${id}`} className="btn btn-default card-btn-bottom-left" >View</Link>
            <div className="card-controls active-controls">
                <Link to={`/edit/${id}`} className="btn btn-round edit">
                    <img src={editIcon} alt="edit icon" />
                </Link>
                <span className="btn btn-round delete" onClick={() => deleteRecipeHandler(id)}>
                    <img src={binIcon} alt="delete icon" />
                </span>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default Recipe;