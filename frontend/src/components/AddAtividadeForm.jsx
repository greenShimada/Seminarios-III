import React, { useState } from 'react';

const AddAtividadeForm = ({ addAtividade }) => {
  const [frase, setFrase] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [opcoes, setOpcoes] = useState(['', '', '', '']);
  const [respostaCorreta, setRespostaCorreta] = useState(null);

  const handleChangeOpcao = (index, value) => {
    const novasOpcoes = [...opcoes];
    novasOpcoes[index] = value;
    setOpcoes(novasOpcoes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (respostaCorreta === null || respostaCorreta < 0 || respostaCorreta >= opcoes.length) {
      alert("Selecione a resposta correta");
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
    setRespostaCorreta(null);
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
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="radio"
            name="respostaCorreta"
            checked={respostaCorreta === i}
            onChange={() => setRespostaCorreta(i)}
            required
          />
          <input
            type="text"
            placeholder={`Opção ${i + 1}`}
            value={opcao}
            onChange={(e) => handleChangeOpcao(i, e.target.value)}
            required
          />
        </div>
      ))}

      <button type="submit">Cadastrar Atividade</button>
    </form>
  );
};

export default AddAtividadeForm;
