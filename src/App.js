import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [code, setCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');

  const handleConvert = async () => {
    console.log(code);
    try {
      const response = await axios.post('http://localhost:5000/converter', { code });
      console.log('Response:', response.data); // Verifique se a resposta está correta
      setConvertedCode(response.data.convertedCode);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
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
        <button className="btn btn-primary mb-3" onClick={handleConvert}>Converter</button>
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
