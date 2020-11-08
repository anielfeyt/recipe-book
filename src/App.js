import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipesState from './context/recipes/RecipesState';

import './App.css';

import Navigation from './components/Navigation/Navigation';
import RecipeGrid from './components/Recipe/RecipeGrid';
import NewRecipe from './components/Recipe/NewRecipe/NewRecipe';
import EditRecipe from './components/Recipe/EditRecipe/EditRecipe';
import Recipe from './components/Recipe/Recipe';


function App() {
  return (
    <RecipesState>
      <Router>
        <div className="App">
          <Navigation />
          <div className="content-area">
            <Switch>
              <Route exact path="/" component={RecipeGrid} />
              <Route exact path="/add-new" component={NewRecipe} />
              <Route exact path="/edit/:rId" component={EditRecipe} />
              <Route exact path="/recipe/:rId" component={Recipe} />
            </Switch>
          </div>
        </div>
      </Router>
    </RecipesState>
  );
}

export default App;
