import React from 'react';
import './App.css';
import AtividadeList from './components/AtividadeList';
import ListaList from './components/ListaList';

const App = () => {
  return (
    <div>
      <header>
        <h1>Atividades</h1>
      </header>
      <main>
        <AtividadeList />
        <ListaList />
      </main>
    </div>
  );
};

export default App;