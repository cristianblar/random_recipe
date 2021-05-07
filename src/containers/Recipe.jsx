/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getRecipe } from '../utils/api_functions';

import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';

function Recipe() {
  const [state, setState] = useState({ recipe: null, isLoading: true });

  const { recipeId } = useParams();

  useEffect(() => {
    getRecipe(recipeId)
      .then((result) => {
        setState({ recipe: result, isLoading: false });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return state.isLoading ? (
    <div className="message">Loading...</div>
  ) : (
    <>
      <Helmet>
        <title>{state.recipe.name}</title>
      </Helmet>

      <div className="Recipe">
        <div
          className="hero"
          style={{ backgroundImage: `url(${state.recipe.thumbnail})` }}
        />

        <div className="title">
          <div className="info">
            <h1>{state.recipe.name}</h1>
            <p>{state.recipe.origin}</p>
          </div>
          <div />
        </div>

        <Ingredients ingredients={state.recipe.ingredients} />

        <Instructions instructions={state.recipe.instructions} />
      </div>
    </>
  );
}

export default Recipe;
