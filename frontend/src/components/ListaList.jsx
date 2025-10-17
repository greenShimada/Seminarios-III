import React, { useState, useEffect } from 'react';
import api from '../api.js';
import AddListaForm from './AddListaForm.jsx';

const ListaList = () => {
  const [lista, setLista] = useState([]);

  const fetchListas = async () => {
    try {
      const response = await api.get('/listas');
      setLista(response.data);
    } catch (error) {
      console.error('Erro ao buscar listas', error);
    }
  };

  const addLista = async (lista) => {
    try {
      console.log(lista);
      await api.post('/listas', lista);
      fetchListas();
    } catch (error) {
      console.error('Erro ao adicionar lista', error);
    }
  };

  useEffect(() => {
    fetchListas();
  }, []);

  return (
    <div>
      <h2>Listas</h2>
      <ul>
        {lista.map((lista) => (
          <li>
            {lista.id} - {lista.nome}
          </li>
        ))}
      </ul>
      <AddListaForm addLista={addLista} />
    </div>
  );
};

export default ListaList;
