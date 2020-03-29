import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import arrowLeftImg from '../../assets/arrow-left.svg';
import logoImg from '../../assets/logo.svg';

export default function Register() {
  // mudança de estado de cada input
  // useState('') - vazia pois são strings
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  // função responsável por fazer o cadastro do usuário
  // será disparada assim que o formulário der um submit
  async function handleRegister(e) {
    // método e.preventDefault() previni comportamento padrão do formulário
    // que é a página carregando
    e.preventDefault();

      const data = {
        name,
        email,
        whatsapp,
        city,
        uf
      };

      try {
      // chama a api e envia os dados via posta para a rota ongs
      // guardando os dados na variável response
      // processo assincrono pois precis de uma pauasa
      const response = await api.post('ongs', data);

      // retornando uma respostar ao usuário com seu número de ID
      // acessando somente o ID pelo variável response.data.id
      alert(`Seu ID de acesso: ${response.data.id}`);

        history.push('/');

      } catch (err) {
        alert('Erro no cadastro, tente novamente.');
      }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude
          pessoas a encontrarem os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <img src={arrowLeftImg} alt="arrow-left" height={16} />
            Não tenho cadastro
          </Link>
        </section>

        {/* passando a função que será disparada e receberá os dados
        do formulário e enviados para ao banco */}
        <form onSubmit={handleRegister} >
          <input 
            placeholder="Nome da ONG"
            value={name}
            // onChange - ouvindo as mudanças do input 
            // e - é o parâmetro que ela recebe, o evento de mudança 
            // (e.target.value) representa o valor do input e colocando dentro da 
            // variável setName que estamos armazenando no estado 
            // isto é uma arrayfunction, função escrita no formato reduzido
            onChange={e => setName(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input 
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)} 
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }} 
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}