import React, { useState } from 'react';

const AddListaForm = ({ addLista }) => {
  const [nome, setNome] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const lista = { nome };

    addLista(lista); 
    setNome('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da lista"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <button type="submit">Cadastrar Lista</button>
    </form>
  );
};

export default AddListaForm;
