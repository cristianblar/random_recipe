import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './containers/Home';
import Recipe from './containers/Recipe';

import Timer from './components/Timer';

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/">👩‍🍳 Random Recipe 👨‍🍳</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route path="/recipe/:recipeId" component={Recipe} />
          <Route path="/timer" component={Timer} />
        </main>
      </div>
    </Router>
  );
}

export default App;
