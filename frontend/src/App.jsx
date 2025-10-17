import React from 'react';
import './App.css';
import AtividadeList from './components/AtividadeList';
import ListaList from './components/ListaList';
import './styles.css';

const App = () => {
  return (
    <div className="container">
      <header>
        <h1>Atividades & Listas</h1>
      </header>
      <main>
        <AtividadeList />
        <ListaList />
      </main>
    </div>
  );
};

export default App;
