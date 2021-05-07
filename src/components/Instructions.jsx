/* eslint-disable react/no-array-index-key */
import React from 'react';

const Instructions = ({ instructions }) => (
  <div className="instructions">
    <h2>Instructions</h2>
    <div className="steps">
      {instructions
        .filter((line1) => !line1.startsWith('STEP'))
        .map((line2, idx) => (
          <div className="step" key={idx}>
            <div className="number">{idx + 1}</div>
            <div className="text">{line2}</div>
          </div>
        ))}
    </div>
  </div>
);

export default Instructions;
