import React, { useState } from 'react';

const AddAtividadeForm = ({ addAtividade }) => {
  const [frase, setFrase] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [opcoes, setOpcoes] = useState(['', '', '', '']);
  const [respostaCorreta, setRespostaCorreta] = useState(0);

  const handleChangeOpcao = (index, value) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index] = value;
    setOpcoes(novasOpcoes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (respostaCorreta < 0 || respostaCorreta >= opcoes.length) {
      alert("Índice da resposta correta inválido");
      return;
    }
    if (!frase || !pergunta || opcoes.some(opcao => opcao.trim() === '')) {
      alert("Preencha todos os campos");
      return;
    }

    const atividade = {
      frase,
      pergunta,
      opcoes,
      resposta_correta: respostaCorreta,
    };

    addAtividade(atividade);

    setFrase('');
    setPergunta('');
    setOpcoes(['', '', '', '']);
    setRespostaCorreta(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Frase"
        value={frase}
        onChange={(e) => setFrase(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Pergunta"
        value={pergunta}
        onChange={(e) => setPergunta(e.target.value)}
        required
      />

      {opcoes.map((opcao, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Opção ${i + 1}`}
          value={opcao}
          onChange={(e) => handleChangeOpcao(i, e.target.value)}
          required
        />
      ))}

      <input
        type="number"
        placeholder="Índice da resposta correta (0-3)"
        value={respostaCorreta}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          setRespostaCorreta(isNaN(val) ? 0 : val);
        }}
        min={0}
        max={3}
        required
      />

      <button type="submit">Cadastrar Atividade</button>
    </form>
  );
};

export default AddAtividadeForm;
