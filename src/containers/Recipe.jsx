/* eslint-disable no-alert */
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
        setState({ ...state, isLoading: false });
      });
  }, []);

  const share = (event) => {
    event.preventDefault();
    if (!navigator.share) {
      const currentUrl = window.location.href;
      const temp = document.createElement('input');
      temp.style.opacity = 0;
      temp.style.position = 'fixed';
      document.body.appendChild(temp);
      temp.value = currentUrl;
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      alert('Link copied to your clipboard!');
    } else {
      navigator
        .share({
          title: `${state.recipe.name}`,
          text: 'Awesome recipe',
          url: document.location.href,
        })
        .then(() => alert('Recipe shared!'))
        .catch((error) => {
          console.error(error);
          alert('Something went wrong... Please, try again');
        });
    }
  };

  if (!state.isLoading && !state.recipe)
    return (
      <div className="message">
        Something went wrong 😞 Please, try again later...
      </div>
    );

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
          <div>
            <button type="button" className="share" onClick={share}>
              Share!
            </button>
          </div>
        </div>

        <Ingredients ingredients={state.recipe.ingredients} />

        <Instructions instructions={state.recipe.instructions} />
      </div>
    </>
  );
}

export default Recipe;
