import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import powerImg from '../../assets/power.svg';
import trash2Img from '../../assets/trash2.svg';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  // guardando os dados no estado
  const [incidents, setIncidents] = useState([]);
  // buscando o name da ONG no store

  const history = useHistory();

  const ongId = localStorage .getItem('ongId');
  const ongName = localStorage .getItem('ongName');

  // recebe dois parâmetros
  // o primeira é dizer qual função deseja executar, que é a função pra carregar os casos
  /* o segundo um array - é quando que esta função será executada, ou seja, toda vez
   que as informações deste array mudarem, ele vai executar a primeira função de novo,
   neste caso, vamos deixar vazio, pois queremos que execute uma única vez */
  useEffect(() => {
    // pegar todos os incidentes
    // e passar a ONG que esta logado através do headers 
    // e pegar o valor da ong através do id que esta salvo no localStore
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => { /* .then - para pegar os dados */
      // pegando a resposta gravada no "estado"
      setIncidents(response.data);
    }) 
  }, [ongId]); // dependencia

  // função para deletar um caso pelo id do incident
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, { // acessando a rota pela api para fazer o delete pelo id
        headers: {
          Authorization: ongId, // fazendo a autorização do id que corresponde aquele caso
        }
      });

      // pegar todos os incidents que temos e realizar um filtro,
      // e para cada um dos incidents mantemos apenas os incidents em que o id seja 
      // diferentes do da ong que deletou
      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch (err) {
      alert('erro ao deletar caso, tente novamente.'); // passando um retorno de erro
    }
  }

  function handleLogout() {
    // limpando o localStorage
      localStorage.clear();

      // voltando para página do login
      history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
      <img src={logoImg} alt="Be The Hero"/>
      {/* jogando o name da ONG no span */}
      <span>Bem vinda, {ongName}</span>

      <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
      <button onClick={handleLogout} type="button">
        <img className="imgLogout" src={powerImg} alt="power" />
      </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {/* código javascript  
          map() - diz percorrer cada um deles retornando algo */}
        {incidents.map(incident => ( // para cada incident, retornar esta estrutura
        // Propriedade key - ajuda o react a encontrar qual item é qual na hora que ele for 
        // deletar um item da interface, e ai precisamos colocar qual o valo único que seria o id
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>
        
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
        
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
        
            {/* colocando a função delete.
                Criamos uma arrayFunction para deletar o caso especifico  e passando o parâmetro id. */}
            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <img src={trash2Img} alt="trash2" height={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}