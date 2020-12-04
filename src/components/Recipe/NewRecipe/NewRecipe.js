import React, { useState, useContext, Fragment } from 'react';
import RecipesContext from '../../../context/recipes/recipesContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './NewRecipe.css';

const NewRecipe = () => {

    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [curIngredient, setCurIngredient] = useState('');
    const [instructions, setInstructions] = useState('');

    const recipesContext = useContext(RecipesContext);
    const pattern = /\w+/;
    let match = pattern.test(title);

    // Post the recipe to the database
    const postRecipeHandler = (e) => {
        e.preventDefault();

        const msg = recipesContext.postRecipe(title, ingredients, instructions);
        console.log(match);

        if (match === false || ingredients.length === 0 || instructions === '') {
            toast.error('Please enter all fields.');
        } else if (msg !== undefined) {
            toast.error('Denied! Please change your credentials.');
        } else {
            toast.success('Recipe Added!');
            resetFields();
        }
    }

    // Add an ingredient to the local state and list
    const ingredientAddHandler = (e) => {
        e.preventDefault();
        if (curIngredient === '') {
            toast.error("Cannot enter an empty ingredient.");
        } else {
            setIngredients(ingredients => [...ingredients, curIngredient]);
            setCurIngredient('');
        }
    }

    // Delete ingredients in the list
    const deleteIgHandler = (e, index) => {
        e.preventDefault();
        const newArr = [...ingredients];
        newArr.splice(index, 1);
        setIngredients(newArr);
    }

    const resetFields = () => {
        setTitle('');
        setIngredients([]);
        setCurIngredient('');
        setInstructions('');
    }


    return (
        <Fragment>
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

            <form onSubmit={postRecipeHandler} >

                <div className="new-recipe-container">
                    <label htmlFor="title"><h3>Recipe Name</h3></label><br />
                    <input type="text" name="title" onChange={e => setTitle(e.target.value)} value={title} required />
                    <br />
                    <label htmlFor="ingredients"><h3>Ingredients</h3></label><br />
                    <div className="group-input">
                        <input type="text" name="ingredients" onChange={e => setCurIngredient(e.target.value)} value={curIngredient} /><button style={{ whiteSpace: 'nowrap' }} className="btn btn-default" onClick={(e) => ingredientAddHandler(e)}>Add</button>
                    </div>
                    <br />
                    <div className="ingredient-board">
                        <label><h3>Ingredient List:</h3></label>
                        <ul className="items-ig">

                            {ingredients.length > 0 ?
                                ingredients.map((ig, index) => (
                                    <li className="deleteable-ig" key={index} >
                                        {ig}
                                        <button className="btn-delete btn-float-right" onClick={e => deleteIgHandler(e, index)}><span role="img" aria-label="Delete">❌</span></button>
                                    </li>
                                )) : <p>Please add an ingredient to the list.</p>}
                        </ul>
                    </div>
                    <br />
                    <label htmlFor="instructions"><h3>Instructions</h3></label><br />
                    <textarea name="instructions" rows="8" onChange={e => setInstructions(e.target.value)} value={instructions} required></textarea>
                    <button className="btn btn-default">Save</button>
                </div>
            </form>
        </Fragment>
    );
}

export default NewRecipe;
