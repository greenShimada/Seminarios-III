import React, { useState, useEffect } from 'react';
import api from '../api.js';
import AddAtividadeForm from './AddAtividadeForm';

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
    <div className="atividade-container">
      <h2>Atividades</h2>
      <ul>
        {atividades.map((atividade) => (
          <li
            key={atividade.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('atividadeId', atividade.id);
            }}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              marginBottom: '6px',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'grab'
            }}
          >
            {atividade.id} - {atividade.pergunta}
          </li>
        ))}
      </ul>
      <AddAtividadeForm addAtividade={addAtividade} />
    </div>
  );
};

export default AtividadeList;
