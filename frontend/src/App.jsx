import React from 'react';
import './App.css';
import FruitList from './components/Fruits';

const App = () => {
  return (
    <div>
      <header>
        <h1>Fruit Management App</h1>
      </header>
      <main>
        <FruitList />
      </main>
    </div>
  );
};

export default App;