/* eslint-disable react/no-array-index-key */
import React from 'react';

const Ingredients = ({ ingredients }) => (
  <div className="ingredients">
    <h2>Ingredients</h2>
    <ul>
      {ingredients.map((i, idx) => (
        <li key={idx}>
          {i.ingredient}: {i.measure}
        </li>
      ))}
    </ul>
  </div>
);

export default Ingredients;
