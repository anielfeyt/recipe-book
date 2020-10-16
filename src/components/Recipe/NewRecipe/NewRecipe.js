import React, { useState } from 'react';
import axios from 'axios';

import './NewRecipe.css';

const NewRecipe = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [curIngredient, setCurIngredient] = useState('');
    const [instructions, setInstructions] = useState('');

    // Post the recipe to the database
    const postRecipeHandler = (e) => {
        e.preventDefault();
        const recipe = {
            title: title,
            ingredients: ingredients,
            instructions: instructions
        }

        axios.post(`https://tome-recipes.firebaseio.com/recipes.json`, recipe)
            .catch(err => {
                console.log('Error', err.message);
            });

    }

    // Add an ingredient to the local state and list
    const ingredientAddHandler = (e) => {
        e.preventDefault();
        setIngredients(ingredients => [...ingredients, curIngredient]);
    }

    // Delete ingredients in the list
    const deleteIgHandler = (index) => {
        const newArr = [...ingredients];
        newArr.splice(index, 1);
        setIngredients(newArr);
    }


    return (
        <form onSubmit={postRecipeHandler} >
            <div className="new-recipe-container">
                <label htmlFor="title"><h3>Recipe Name</h3></label><br />
                <input type="text" name="title" onChange={e => setTitle(e.target.value)} />
                <br />
                <label htmlFor="ingredients"><h3>Ingredients</h3></label><br />
                <div className="group-input">
                    <input type="text" name="ingredients" onChange={e => setCurIngredient(e.target.value)} /><button style={{ whiteSpace: 'nowrap' }} className="btn" onClick={(e) => ingredientAddHandler(e)}>Add Ingredient</button>
                </div>
                <br />
                <div className="ingredient-board">
                    <label><h3>Ingredient List:</h3></label>
                    <ul className="items-ig">

                        {ingredients.length > 0 ?
                            ingredients.map((ig, index) => (
                                <li className="deleteable-ig" key={index} >
                                    {ig}
                                    <button className="btn-delete btn-float-right" onClick={() => deleteIgHandler(index)}><span role="img" aria-label="Delete">❌</span></button>
                                </li>
                            )) : <p>Please add an ingredient to the list.</p>}
                    </ul>
                </div>
                <br />
                <label htmlFor="instructions"><h3>Instructions</h3></label><br />
                <textarea name="instructions" rows="8" onChange={event => setInstructions(event.target.value)} ></textarea>
                <button className="btn btn-large">Add</button>
            </div>
        </form>
    );
}

export default NewRecipe;
