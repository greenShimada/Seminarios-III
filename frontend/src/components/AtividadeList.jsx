import React, { useState, useEffect } from 'react';
import api from '../api.js';
import AddAtividadeForm from './AddAtividadeForm.jsx';

const AtividadeList = () => {
  const [atividades, setAtividades] = useState([]);

  const fetchAtividades = async () => {
    try {
      const response = await api.get('/atividades');
      setAtividades(response.data);
    } catch (error) {
      console.error('Erro ao buscar atividades', error);
    }
  };

  const addAtividade = async (atividade) => {
    try {
      console.log(atividade);
      await api.post('/atividades', atividade);
      fetchAtividades();
    } catch (error) {
      console.error('Erro ao adicionar atividade', error);
    }
  };

  useEffect(() => {
    fetchAtividades();
  }, []);

  return (
    <div>
      <h2>Atividades</h2>
      <ul>
        {atividades.map((atividade) => (
          <li key={atividade.id}>
            {atividade.id} - {atividade.pergunta} - Resposta correta: {atividade.opcoes[atividade.resposta_correta]}
          </li>
        ))}
      </ul>
      <AddAtividadeForm addAtividade={addAtividade} />
    </div>
  );
};

export default AtividadeList;
