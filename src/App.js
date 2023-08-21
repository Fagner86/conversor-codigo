import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [code, setCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para controle do carregamento

  const handleConvert = async () => {
    console.log(code);
    setIsLoading(true); // Inicia o carregamento
    setConvertedCode('Aguardando resposta do servidor...'); // Mostra a mensagem imediatamente

    try {
      const response = await axios.post('https://api-conversor-codigo.onrender.com/converter', { code });
      console.log('Resposta:', response.data);

      if (response.data) {
        setConvertedCode(response.data);
      } else {
        setConvertedCode('Não houve resposta do servidor.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setConvertedCode('Erro na requisição. Verifique o console para mais detalhes.');
    }
    setIsLoading(false); // Finaliza o carregamento
  };

  return (
    <div className="App d-flex align-items-center justify-content-center vh-100 bg-dark text-white">
      <div className="container">
        <h1 className="text-center mb-4">Conversor de Código</h1>
        <div className="mb-3">
          <label htmlFor="codigo" className="form-label">Insira o Código:</label>
          <textarea
            id="codigo"
            className="form-control bg-black text-white"
            rows="10"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mb-3" onClick={handleConvert} disabled={isLoading}>
          {isLoading ? 'Convertendo...' : 'Converter'}
        </button>
        <div>
          <label htmlFor="codigoConvertido" className="form-label">Código Convertido:</label>
          <textarea
            id="codigoConvertido"
            className="form-control bg-black text-white"
            rows="10"
            readOnly
            value={convertedCode}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
