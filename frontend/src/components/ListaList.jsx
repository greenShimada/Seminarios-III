import React, { useState, useEffect } from 'react';
import api from '../api.js';
import AddListaForm from './AddListaForm';

const ListaList = () => {
  const [listas, setListas] = useState([]);

  const fetchListas = async () => {
    try {
      const response = await api.get('/listas');
      setListas(response.data);
    } catch (error) {
      console.error('Erro ao buscar listas', error);
    }
  };

  const addLista = async (lista) => {
    try {
      await api.post('/listas', lista);
      fetchListas();
    } catch (error) {
      console.error('Erro ao adicionar lista', error);
    }
  };

  useEffect(() => {
    fetchListas();
  }, []);

  const handleDrop = async (e, listaId) => {
    e.preventDefault();
    const atividadeIdStr = e.dataTransfer.getData('atividadeId');
    if (!atividadeIdStr) return;
    
    const atividadeId = parseInt(atividadeIdStr, 10);

    try {
      await api.post(`/listas/${listaId}/atividades`, {
        atividade_id: atividadeId
      });

      fetchListas(); 
    } catch (error) {
      console.error('Erro ao adicionar atividade à lista', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  return (
    <div className="lista-container">
      <h2>Listas</h2>
      <ul>
        {listas.map((lista) => (
          <li
            key={lista.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, lista.id)}
            style={{
              padding: '12px',
              border: '2px dashed #666',
              marginBottom: '10px',
              borderRadius: '6px',
              minHeight: '60px',
              backgroundColor: '#fafafa'
            }}
          >
            <div>
              <strong>ID:</strong> {lista.id} — <strong>Nome:</strong> {lista.nome}
            </div>
            {lista.atividades && lista.atividades.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <strong>Atividades da lista:</strong>
                <ul style={{ marginTop: '4px' }}>
                  {lista.atividades.map((ativ) => (
                    <li key={ativ.id} style={{ padding: '4px 0' }}>
                      {ativ.id} — {ativ.pergunta}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div style={{ marginTop: '8px' }}>
              <small>Arraste uma atividade aqui</small>
            </div>
          </li>
        ))}
      </ul>
      <AddListaForm addLista={addLista} />
    </div>
  );
};

export default ListaList;
