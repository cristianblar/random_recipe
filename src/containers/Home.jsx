/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getRandom } from '../utils/api_functions';

function Home() {
  const [state, setState] = useState({ recipe: null, isLoading: true });

  useEffect(() => {
    getRandom()
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
        <title>Random recipe!</title>
      </Helmet>

      <div className="recipes">
        <Link
          to={`/recipe/${state.recipe.id}`}
          className="recipe"
          key={state.recipe.id}
        >
          <span
            className="bg"
            style={{ backgroundImage: `url(${state.recipe.thumbnail})` }}
          />
          <span className="info">
            <h2>{state.recipe.name}</h2>
          </span>
        </Link>
      </div>
    </>
  );
}

export default Home;
