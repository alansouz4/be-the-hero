import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import loginImg from '../../assets/log-in.svg';

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  // função responsável por fazer o cadastro do usuário
  // será disparada assim que o formulário der um submit
  async function handleLogin(e) {
    // método e.preventDefault() previni comportamento padrão do formulário
    // que é a página carregando
    e.preventDefault();

    try {
      // chama a api e envia os dados via posta para a rota sessions
      // guardando os dados na variável response
      // processo assincrono pois precisa de uma pausa
      const response = await api.post('sessions', { id });

      // retornando uma respostar ao usuário com seu número de name
      // acessando somente o name pelo variável response.data.name
      // salvando id e name no localStorage, para te-lôs em toda aplicação
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      
      history.push('/profile');
    }
    // se der algum erro 
    catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
      <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Be The Hero"/>
            
            {/* passando a função que será disparada e receberá os dados
              do formulário e enviados para ao banco */}
            <form onSubmit={handleLogin}>
              <h1>Faça seu logon</h1>

              <input 
                placeholder="Seu ID" 
                value={id}
                onChange={e => setId(e.target.value)}
                />

              <button className="button" type="submit">Entrar</button>

              <Link className="back-link" to="/register">
                <img src={loginImg} alt="log-in" height={16}/>
                Não tenho cadastro
              </Link>
            </form>
        </section>

        <img src={heroesImg} alt="Heroes"/>
      </div>
  );
}